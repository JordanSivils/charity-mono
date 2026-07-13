import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HomeCta() {
  return (
    <section className="flex flex-col items-center gap-4 py-8 text-center">
      <h2 className="text-2xl font-semibold tracking-tight">
        Start building with nonprofit data
      </h2>

      <p className="max-w-xl text-muted-foreground">
        Get an API key, make your first request, and start searching U.S.
        nonprofits in minutes.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/sign-up">
          <Button>Get API Key</Button>
        </Link>
        <Link href="/docs/quickstart">
          <Button variant="outline">Read the Quickstart</Button>
        </Link>
      </div>
    </section>
  )
}