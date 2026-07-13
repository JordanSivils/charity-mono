"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteUser } from "@/lib/actions/user/delete-user"

export function DeleteAccountDialog() {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const deleteAcct = async () => {
    try {
      setSubmitting(true)
      setError(null)

      const res = await deleteUser()

      if (res?.success) {
        setOpen(false)
        router.push("/")
        router.refresh()
        return
      }

      setError("Unable to delete your account. Please try again.")
    } catch (err) {
      console.error(err)
      setError("Something went wrong while deleting your account.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"}>Delete account</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <AlertDialogTitle>Delete account?</AlertDialogTitle>
          </div>

          <AlertDialogDescription>
            This permanently deletes your CharityQuery account, including your
            saved account data and API keys. Existing applications using these
            keys will stop working. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={submitting}>
            Cancel
          </AlertDialogCancel>

          <Button
            type="button"
            variant="destructive"
            disabled={submitting}
            onClick={deleteAcct}
          >
            {submitting ? "Deleting..." : "Delete account"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}