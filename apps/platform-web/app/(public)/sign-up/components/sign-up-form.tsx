"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle2, XCircle } from "lucide-react"
import { SignedIn, SignedOut, useSignUp } from "@clerk/nextjs"
import { isClerkAPIResponseError } from "@clerk/nextjs/errors"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { GoogleSvg } from "@/components/svgs/google-svg"
import { GithubSvg } from "@/components/svgs/github-svg"

const signUpSchema = z
  .object({
    email: z.email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

const verifySchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code"),
})

type SignUpFormValues = z.infer<typeof signUpSchema>
type VerifyFormValues = z.infer<typeof verifySchema>

function FieldStatus({ valid, show }: { valid: boolean; show: boolean }) {
  if (!show) return null

  return valid ? (
    <CheckCircle2 className="h-4 w-4 text-green-600" />
  ) : (
    <XCircle className="h-4 w-4 text-muted-foreground" />
  )
}

export function SignUpForm() {
  const [error, setError] = useState<string | null>(null)
  const [pendingEmail, setPendingEmail] = useState("")
  const [verifying, setVerifying] = useState(false)

  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const verifyForm = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      code: "",
    },
  })

  const email = signUpForm.watch("email")
  const password = signUpForm.watch("password")
  const confirmPassword = signUpForm.watch("confirmPassword")

  const emailLooksValid = z.email().safeParse(email).success
  const passwordLooksValid = password.length >= 8
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword

  const finalizeSession = async (sessionId: string) => {
    if (!isLoaded || !setActive) return

    await setActive({
      session: sessionId,
      navigate: async ({ session }) => {
        if (session?.currentTask) return
        router.push("/dashboard")
      },
    })
  }

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    if (!isLoaded) return

    setError(null)

    try {
      const signUpAttempt = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      })

      if (signUpAttempt.status === "complete" && signUpAttempt.createdSessionId) {
        await finalizeSession(signUpAttempt.createdSessionId)
        return
      }

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      })

      setPendingEmail(data.email)
      setVerifying(true)
    } catch (err: unknown) {
      if (!isClerkAPIResponseError(err)) {
        setError("Something went wrong.")
        return
      }

      const clerkErr = err.errors?.[0]

      switch (clerkErr?.code) {
        case "form_identifier_exists":
          setError("An account with this email already exists.")
          break
        default:
          setError(clerkErr?.longMessage ?? clerkErr?.message ?? "Unable to create account.")
      }
    }
  }

  const onVerify: SubmitHandler<VerifyFormValues> = async (data) => {
    if (!isLoaded) return

    setError(null)

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: data.code,
      })

      if (result.status === "complete" && result.createdSessionId) {
        await finalizeSession(result.createdSessionId)
        return
      }

      setError("Verification could not be completed.")
    } catch (err: unknown) {
      if (!isClerkAPIResponseError(err)) {
        setError("Something went wrong.")
        return
      }

      const clerkErr = err.errors?.[0]
      setError(clerkErr?.longMessage ?? clerkErr?.message ?? "Invalid or expired code.")
    }
  }

  const handleResendCode = async () => {
    if (!isLoaded) return

    setError(null)

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      })
    } catch (err: unknown) {
      if (!isClerkAPIResponseError(err)) {
        setError("Something went wrong.")
        return
      }

      const clerkErr = err.errors?.[0]
      setError(clerkErr?.longMessage ?? clerkErr?.message ?? "Unable to resend code.")
    }
  }

  const handleOAuthSignUp = async (strategy: "oauth_google" | "oauth_github") => {
    if (!isLoaded) return

    setError(null)

    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      })
    } catch (err: unknown) {
      if (!isClerkAPIResponseError(err)) {
        setError("Something went wrong.")
        return
      }

      const clerkErr = err.errors?.[0]
      setError(clerkErr?.longMessage ?? clerkErr?.message ?? "Unable to continue with provider.")
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <SignedIn>
        <div className="flex max-w-md flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold">You’re already signed in</h1>
          <p className="text-muted-foreground">
            Head to your dashboard, read the docs, or return home.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline">Docs</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>{verifying ? "Verify your email" : "Create your account"}</CardTitle>
              <CardDescription>
                {verifying
                  ? `Enter the verification code sent to ${pendingEmail}.`
                  : "Get access to your developer dashboard and API keys."}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-4">
                {error && (
                  <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </div>
                )}

                {!verifying ? (
                  <>
                    <div className="flex flex-col gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        onClick={() => handleOAuthSignUp("oauth_google")}
                        disabled={!isLoaded}
                      >
                        <GoogleSvg />
                        <span>Continue with Google</span>
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        onClick={() => handleOAuthSignUp("oauth_github")}
                        disabled={!isLoaded}
                      >
                        <GithubSvg />
                        <span>Continue with GitHub</span>
                      </Button>
                    </div>

                    <div className="relative py-2 text-center text-sm text-muted-foreground">
                      <span className="bg-background px-2">or continue with email</span>
                    </div>

                    <form onSubmit={signUpForm.handleSubmit(onSubmit)}>
                      <fieldset
                        disabled={signUpForm.formState.isSubmitting}
                        className="flex flex-col gap-4"
                      >
                        <FieldGroup>
                          <Controller
                            control={signUpForm.control}
                            name="email"
                            render={({ field, fieldState }) => (
                              <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="you@example.com"
                                  autoComplete="email"
                                  aria-invalid={fieldState.invalid}
                                />

                                <FieldDescription className="flex items-center gap-2">
                                  Enter a valid email address
                                  <FieldStatus show={email.length > 0} valid={emailLooksValid} />
                                </FieldDescription>

                                {signUpForm.formState.isSubmitted && fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />

                          <Controller
                            control={signUpForm.control}
                            name="password"
                            render={({ field, fieldState }) => (
                              <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="Password"
                                  autoComplete="new-password"
                                  aria-invalid={fieldState.invalid}
                                />

                                <FieldDescription className="flex items-center gap-2">
                                  At least 8 characters
                                  <FieldStatus
                                    show={password.length > 0}
                                    valid={passwordLooksValid}
                                  />
                                </FieldDescription>

                                {signUpForm.formState.isSubmitted && fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />

                          <Controller
                            control={signUpForm.control}
                            name="confirmPassword"
                            render={({ field, fieldState }) => (
                              <Field>
                                <FieldLabel>Confirm password</FieldLabel>
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="Confirm password"
                                  autoComplete="new-password"
                                  aria-invalid={fieldState.invalid}
                                />

                                <FieldDescription className="flex items-center gap-2">
                                  Passwords must match
                                  <FieldStatus
                                    show={confirmPassword.length > 0}
                                    valid={passwordsMatch}
                                  />
                                </FieldDescription>

                                {signUpForm.formState.isSubmitted && fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </FieldGroup>

                        <div id="clerk-captcha" />

                        <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <Link className="text-sm text-primary underline" href="/sign-in">
                            I already have an account
                          </Link>

                          <Button
                            type="submit"
                            variant="outline"
                            disabled={signUpForm.formState.isSubmitting || !isLoaded}
                          >
                            {signUpForm.formState.isSubmitting
                              ? "Creating account..."
                              : "Sign up"}
                          </Button>
                        </div>
                      </fieldset>
                    </form>
                  </>
                ) : (
                  <form onSubmit={verifyForm.handleSubmit(onVerify)}>
                    <fieldset
                      disabled={verifyForm.formState.isSubmitting}
                      className="flex flex-col gap-4"
                    >
                      <FieldGroup>
                        <Controller
                          control={verifyForm.control}
                          name="code"
                          render={({ field, fieldState }) => (
                            <Field>
                              <FieldLabel>Verification code</FieldLabel>
                              <Input
                                {...field}
                                placeholder="123456"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                aria-invalid={fieldState.invalid}
                              />

                              <FieldDescription>
                                Enter the 6-digit code sent to your email.
                              </FieldDescription>

                              {verifyForm.formState.isSubmitted && fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </FieldGroup>

                      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Button type="button" variant="link" onClick={handleResendCode}>
                          Resend code
                        </Button>

                        <Button
                          type="submit"
                          variant="outline"
                          disabled={verifyForm.formState.isSubmitting || !isLoaded}
                        >
                          {verifyForm.formState.isSubmitting ? "Verifying..." : "Verify email"}
                        </Button>
                      </div>
                    </fieldset>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </SignedOut>
    </div>
  )
}