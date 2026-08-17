"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export function ContactForm() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // honeypot
  const [company, setCompany] = useState("")

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)

      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          email,
          message,
          company,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        throw new Error("Failed to send message")
      }

      setSuccess(true)
      setEmail("")
      setMessage("")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription>
              Have a question or issue? Send a message and we’ll get back to you.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {success ? (
              <p className="text-green-600">
                Message sent successfully.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Message</FieldLabel>
                    <textarea
                      className="w-full rounded-md border p-2"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </Field>

                  {/* Honeypot (hidden) */}
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </FieldGroup>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <Button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
