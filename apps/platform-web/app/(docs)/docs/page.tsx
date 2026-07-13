import { Metadata } from "next"
import Link from "next/link"
import {
  Compass,
  Filter,
  KeyRound,
  ListChecks,
  BookType,
  CircleSlash2,
  Notebook,
  Database,
} from "lucide-react"

import { DocsPageWrapper } from "../components/docs-page-wrapper"
import { DocsTitleSection } from "../components/docs-title-section"
import { DocsCard } from "../components/docs-card"
import { HighlightPre } from "@/components/ui/highlight-pre"

export const metadata: Metadata = {
  title: "Charity API Documentation",
  description:
    "Learn how to use CharityQuery to search, filter, and retrieve IRS nonprofit data with nearby search, field selection, metadata, authentication, and response examples.",
  alternates: {
    canonical: "/docs",
  },
}

const docsLinks = [
  {
    title: "Quickstart",
    description: "Make your first API request and understand the response.",
    href: "/docs/quickstart",
    icon: Notebook,
  },
  {
    title: "Auth & Limits",
    description: "Use API keys and understand request limits.",
    href: "/docs/authentication-limits",
    icon: KeyRound,
  },
  {
    title: "Nearby Search",
    description: "Find nonprofits near a ZIP code or latitude/longitude pair.",
    href: "/docs/nearby-search",
    icon: Compass,
  },
  {
    title: "Filtering & Sorting",
    description: "Filter by IRS fields, location, financial ranges, and more.",
    href: "/docs/filter-sort",
    icon: Filter,
  },
  {
    title: "Field Selection",
    description: "Request only the response fields your app needs.",
    href: "/docs/fields",
    icon: ListChecks,
  },
  {
    title: "Response Format",
    description: "Understand enriched coded fields and response objects.",
    href: "/docs/response-types",
    icon: BookType,
  },
  {
    title: "Metadata & Codes",
    description: "Reference IRS code definitions used by CharityQuery.",
    href: "/docs/metadata",
    icon: Database,
  },
  {
    title: "Error Handling",
    description: "Review validation, auth, rate limit, and server errors.",
    href: "/docs/errors",
    icon: CircleSlash2,
  },
]

export default function DocsHomePage() {
  return (
    <DocsPageWrapper>
      <DocsTitleSection
        title="Charity API Docs"
        paragraph="CharityQuery is a developer API for searching IRS nonprofit data across the United States. Use it to find nonprofits by location, classification, financial attributes, and IRS metadata, then request only the fields your application needs."
      />

      <DocsCard
        cardTitle="Start with one request"
        cardDescription="Search for nonprofits near a ZIP code and return a compact response."
      >
        <HighlightPre copy label="Request">
{`curl "https://api.charityquery.com/nearby?origin_zip=28403&radius=25&fields=ein,name,city,state,ntee_group,distance_miles&limit=2" \\
  -H "x-api-key: YOUR_API_KEY"`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          The <code>/nearby</code> endpoint finds nonprofits within a radius of
          a ZIP code or latitude/longitude pair. Results are sorted by{" "}
          <code>distance_miles</code> by default.
        </p>

        <Link href="/docs/quickstart" className="text-primary underline">
          Follow the Quickstart →
        </Link>
      </DocsCard>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How CharityQuery works</h2>
        <p className="text-muted-foreground">
          Most requests follow the same pattern: choose an endpoint, filter the
          results, select the fields you want, and paginate through the response.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <DocsCard cardTitle="Filter">
            <p className="text-sm text-muted-foreground">
              Search by location, IRS classification, NTEE code, deductibility,
              financial ranges, geocode status, and more.
            </p>
          </DocsCard>

          <DocsCard cardTitle="Select fields">
            <p className="text-sm text-muted-foreground">
              Use the <code>fields</code> parameter to return only the data your
              app needs, such as <code>ein</code>, <code>name</code>,{" "}
              <code>ntee_code</code>, or <code>distance_miles</code>.
            </p>
          </DocsCard>

          <DocsCard cardTitle="Use enriched responses">
            <p className="text-sm text-muted-foreground">
              Many IRS-coded values return both the original code and a
              human-readable description.
            </p>
          </DocsCard>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Core endpoints</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <DocsCard
            cardTitle="Nearby Search"
            cardDescription="Find nonprofits within a radius of a ZIP code or latitude/longitude pair."
          >
            <HighlightPre>
{`/nearby?origin_zip=28403&radius=25`}
            </HighlightPre>
            <Link href="/docs/nearby-search" className="text-primary underline">
              Read the Nearby Search guide →
            </Link>
          </DocsCard>

          <DocsCard
            cardTitle="Charity Search"
            cardDescription="Search and filter nonprofit records using standard query parameters."
          >
            <HighlightPre>
{`/charities?state=NC&fields=ein,name,ntee_code&limit=25`}
            </HighlightPre>
            <Link href="/docs/filter-sort" className="text-primary underline">
              Read the Filtering & Sorting guide →
            </Link>
          </DocsCard>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Guides</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {docsLinks.map((item) => {
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href}>
                <div className="h-full rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <DocsCard
        cardTitle="OpenAPI Reference"
        cardDescription="Explore endpoints, parameters, and response schemas in the API reference."
      >
        <Link href="/docs/api-reference" className="text-primary underline">
          View API Reference →
        </Link>
      </DocsCard>
    </DocsPageWrapper>
  )
}