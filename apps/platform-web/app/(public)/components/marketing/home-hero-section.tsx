import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HomeHero() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center gap-5 py-12 text-center">
      <p className="rounded-full border bg-muted px-4 py-1 text-sm text-muted-foreground">
        Developer API for IRS nonprofit data
      </p>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Find and filter U.S. nonprofits with a simple API
      </h1>

      <p className="max-w-2xl text-lg text-muted-foreground">
        CharityQuery helps developers search IRS nonprofit data by location,
        classification, financial attributes, and nearby radius. Build discovery
        tools, research platforms, and location-aware nonprofit apps faster.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/sign-up">
          <Button size="lg">Get API Key</Button>
        </Link>
        <Link href="/docs/quickstart">
          <Button size="lg" variant="outline">
            View Quickstart
          </Button>
        </Link>
      </div>
    </section>
  )
}