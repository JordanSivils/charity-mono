"use client"

import { useState } from "react"
import { Copy, KeyRound, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { createKeys } from "@/lib/actions/user/create-keys"
import { DashboardUser } from "@/lib/actions/user/user-types"

interface GenerateKeysProps {
  user: DashboardUser
}

function KeyDisplay({
  label,
  value,
}: {
  label: string
  value: string
}) {
  const [copied, setCopied] = useState(false)

  const copyKey = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex flex-col gap-2 rounded-md border bg-muted/40 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">{label}</p>

        <Button type="button" size="sm" variant="outline" onClick={copyKey}>
          <Copy className="mr-2 h-4 w-4" />
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      <pre className="overflow-x-auto rounded-md bg-background p-3 text-xs">
        {value}
      </pre>
    </div>
  )
}

export function GenerateKeys({ user }: GenerateKeysProps) {
  const [devKey, setDevKey] = useState<string | null>(null)
  const [prodKey, setProdKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const hasExistingKeys = user.apiKeys.length > 0
  const hasNewKeys = devKey && prodKey

  const onClick = async () => {
    try {
      setLoading(true)
      setError(null)

      const keys = await createKeys()

      if (!keys) {
        setError("Unable to generate API keys.")
        return
      }

      setDevKey(keys.usableKeys.devKey)
      setProdKey(keys.usableKeys.prodKey)
    } catch (err: unknown) {
      setDevKey(null)
      setProdKey(null)

      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Unable to generate API keys.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          <CardTitle>
            {hasExistingKeys ? "API Keys" : "Generate API Keys"}
          </CardTitle>
        </div>

        <CardDescription>
          {hasExistingKeys
            ? "Manage your development and production API keys."
            : "Create development and production API keys for your account."}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <div className="rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-sm">
          <div className="flex gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="font-medium">API keys are shown only once.</p>
              <p className="text-muted-foreground">
                Copy your keys and store them somewhere safe. For security, you
                will not be able to view these exact keys again.
              </p>
            </div>
          </div>
        </div>

        {hasExistingKeys && !hasNewKeys && (
          <div className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
            You already have API keys on this account. Regenerating keys will
            deactivate your current keys, and existing applications using them
            will stop working until updated.
          </div>
        )}

        {hasNewKeys && (
          <div className="flex flex-col gap-3">
            <KeyDisplay label="Development key" value={devKey} />
            <KeyDisplay label="Production key" value={prodKey} />
          </div>
        )}

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="button" onClick={onClick} disabled={loading}>
            {loading
              ? "Generating..."
              : hasExistingKeys
                ? "Regenerate keys"
                : "Generate keys"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}