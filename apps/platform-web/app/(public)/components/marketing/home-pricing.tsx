import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HomePricingTeaser() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4">
      <div className="rounded-lg border bg-card p-6 sm:flex sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-sm font-medium text-primary">Simple pricing</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Start free. Upgrade when you need more.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            No credit card required to start. Paid plans unlock higher request
            limits, larger nearby radius, and more results per query.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:mt-0 sm:flex-row">
          <Link href="/pricing">
            <Button>View pricing</Button>
          </Link>

          <Link href="/sign-up">
            <Button variant="outline">Start free</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}