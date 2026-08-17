'use client'

import { SignedIn, SignedOut, useSignIn } from "@clerk/nextjs"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import Link from "next/link"
import { useState } from "react"
import { isClerkAPIResponseError } from "@clerk/nextjs/errors"
import { useRouter } from "next/navigation"
import { GoogleSvg } from "@/components/svgs/google-svg"
import { GithubSvg } from "@/components/svgs/github-svg"

const signInSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

type SignInForm = z.infer<typeof signInSchema>

export function SignInForm() {
  const [error, setError] = useState<string | null>(null)
  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    if (!isLoaded) return

    setError(null)

    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      })

      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              return
            }

            router.push("/dashboard")
          },
        })
      }
    } catch (err: unknown) {
      if (!isClerkAPIResponseError(err)) {
        setError("Something went wrong.")
        return
      }

      const clerkErr = err.errors?.[0]

      switch (clerkErr?.code) {
        case "form_password_incorrect":
        case "form_password_or_identifier_incorrect":
          setError("Email or password not found or incorrect")
          break
        default:
          setError(clerkErr?.longMessage ?? clerkErr?.message ?? "Unable to sign in")
          break
      }
    }
  }

  const handleOAuthSignIn = async (strategy: "oauth_google" | "oauth_github") => {
    if (!isLoaded) return

    setError(null)

    try {
      await signIn.authenticateWithRedirect({
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
      setError(clerkErr?.longMessage ?? clerkErr?.message ?? "Unable to continue with provider")
    }
  }

  return (
    <div className="m-4 flex h-full items-center justify-center">
      <SignedIn>
        <div className="flex flex-col items-center justify-center gap-4 pt-10">
          <h4 className="text-2xl font-bold">It looks like you are already signed in!</h4>
          <p className="text-xl font-semibold">Where would you like to go?</p>
          <ul className="flex flex-col items-center justify-center gap-4">
            <li>
              <Link href="/">
                <Button className="cursor-pointer text-lg" type="button" variant="link">
                  Home
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/docs">
                <Button className="cursor-pointer text-lg" type="button" variant="link">
                  Documentation
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard">
                <Button className="cursor-pointer text-lg" type="button" variant="link">
                  Dashboard
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="min-w-100">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Welcome back. Sign in to access your dashboard and API keys.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-4">
                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOAuthSignIn("oauth_google")}
                    disabled={!isLoaded || isSubmitting}
                  >
                    <GoogleSvg />Continue with Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOAuthSignIn("oauth_github")}
                    disabled={!isLoaded || isSubmitting}
                  >
                    <GithubSvg />Continue with GitHub
                  </Button>
                </div>

                <div className="relative py-2 text-center text-sm text-muted-foreground">
                  <span className="bg-background px-2">or continue with email</span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <fieldset disabled={isSubmitting} className="flex flex-col gap-4">
                    <FieldGroup>
                      <Controller
                        control={control}
                        name="email"
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>Email</FieldLabel>
                            <Input
                              {...field}
                              type="email"
                              aria-invalid={fieldState.invalid}
                              placeholder="you@example.com"
                              autoComplete="email"
                            />
                            <FieldDescription>
                              Use the email address tied to your account
                            </FieldDescription>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        control={control}
                        name="password"
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>Password</FieldLabel>
                            <Input
                              {...field}
                              type="password"
                              aria-invalid={fieldState.invalid}
                              placeholder="Password"
                              autoComplete="current-password"
                            />
                            <FieldDescription>
                              Your password must be at least 8 characters long
                            </FieldDescription>
                            {fieldState.error?.message && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>

                    <div className="mt-4 flex items-center justify-between">
                      <Link className="text-blue-500 underline" href="/sign-up">
                        I need to create an account
                      </Link>

                      <Button
                        type="submit"
                        disabled={isSubmitting || !isValid || !isLoaded}
                        variant="outline"
                      >
                        {isSubmitting ? "Signing In..." : "Log In"}
                      </Button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </SignedOut>
    </div>
  )
}
