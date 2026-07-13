import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HighlightPre } from "@/components/ui/highlight-pre"

export function HomeQuickstart() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4">
      <div className="rounded-lg border bg-card p-6 sm:p-8">
        <div className="flex flex-col justify-center items-center mb-4">
            <p className="text-sm font-medium text-primary">Quickstart</p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Get running in under 2 minutes
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Clone the example project, add your API key, and start querying
            local charity data immediately.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row items-center ">
            <a
                href="https://github.com/JordanSivils/charityquery_sample_app"
                target="_blank"
                rel="noreferrer"
            >
                <Button>
                View example repo
                </Button>
            </a>

            <Link href="/docs/quickstart">
                <Button variant="outline">
                Quickstart guide
                </Button>
            </Link>
            </div>
        </div>
        <div>
        <HighlightPre copy label="Clone the example repo">
{`git clone https://github.com/JordanSivils/charityquery_sample_app.git
cd charityquery_sample_app
npm install
npm run dev`}
        </HighlightPre>
        </div>
        
      </div>
    </section>
  )
}