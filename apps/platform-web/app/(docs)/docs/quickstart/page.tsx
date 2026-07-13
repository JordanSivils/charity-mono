import { Metadata } from "next"
import Link from "next/link"

import { DocsPageWrapper } from "../../components/docs-page-wrapper"
import { DocsTitleSection } from "../../components/docs-title-section"
import { DocsCard } from "../../components/docs-card"
import { HighlightPre } from "@/components/ui/highlight-pre"

export const metadata: Metadata = {
  title: "Quickstart | Charity API Docs",
  description:
    "Make your first CharityQuery API request, authenticate with an API key, search nearby nonprofits, select fields, and understand the response format.",
  alternates: {
    canonical: "/docs/quickstart",
  },
}

export default function QuickstartPage() {
  return (
    <DocsPageWrapper>
      <DocsTitleSection
        title="Quickstart"
        paragraph="Make your first CharityQuery request, return nearby nonprofits, and understand the response structure."
      />

      <DocsCard
        cardTitle="1. Base URL"
        cardDescription="All API requests use the CharityQuery API domain."
      >
        <HighlightPre copy label="Base URL">
{`https://api.charityquery.com`}
        </HighlightPre>
      </DocsCard>

      <DocsCard
        cardTitle="2. Authenticate with your API key"
        cardDescription="Send your API key using the x-api-key request header."
      >
        <HighlightPre copy label="Header">
{`x-api-key: YOUR_API_KEY`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          Website login and API access are separate. Sign in to the dashboard to
          manage your account and generate API keys. API requests use the{" "}
          <code>x-api-key</code> header.
        </p>

        <Link href="/docs/authentication-limits" className="text-primary underline">
          Read Auth & Limits →
        </Link>
      </DocsCard>

      <DocsCard
        cardTitle="3. Make your first nearby search"
        cardDescription="Find nonprofits within 25 miles of ZIP code 28403."
      >
        <HighlightPre copy label="Request">
{`curl "https://api.charityquery.com/nearby?origin_zip=28403&radius=25&fields=ein,name,city,state,ntee_group,distance_miles&limit=2" \\
  -H "x-api-key: YOUR_API_KEY"`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          The <code>/nearby</code> endpoint requires either{" "}
          <code>origin_zip</code> or both <code>lat</code> and <code>lng</code>.
          If both are provided, latitude and longitude should be treated as the
          search origin.
        </p>
      </DocsCard>

      <DocsCard cardTitle="4. Example response">
        <HighlightPre>
{`{
  "page": 1,
  "limit": 2,
  "total": 143,
  "totalPages": 72,
  "next": 2,
  "prev": null,
  "origin": {
      "lat": 34.2237,
      "lng": -77.8862,
      "source": "zip"
    },
  "charities": [
    {
      "ein": "020421110",
      "name": "Example Animal Rescue",
      "city": "Wilmington",
      "state": "NC",
      "ntee_group": {
        "code": "D",
        "description": "Animal-Related"
      },
      "distance_miles": 3.44
    },
    {
      "ein": "030389985",
      "name": "Example Community Foundation",
      "city": "Wilmington",
      "state": "NC",
      "ntee_group": {
        "code": "T",
        "description": "Philanthropy, Voluntarism, and Grantmaking Foundations"
      },
      "distance_miles": 3.71
    }
  ]
}`}
        </HighlightPre>
      </DocsCard>

      <DocsCard
        cardTitle="5. Select only the fields you need"
        cardDescription="Use fields as a comma-separated list to reduce response size."
      >
        <HighlightPre>
{`/nearby?origin_zip=28403&fields=ein,name,state,distance_miles`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          <code>distance_miles</code> is only available on <code>/nearby</code>.
          The standard <code>/charities</code> endpoint does not include distance
          because it does not use a search origin.
        </p>

        <Link href="/docs/fields" className="text-primary underline">
          Read Field Selection →
        </Link>
      </DocsCard>

      <DocsCard
        cardTitle="6. Add filters"
        cardDescription="Filter nearby results by IRS classification, NTEE code, state, financial ranges, and more."
      >
        <HighlightPre>
{`/nearby?origin_zip=28403&radius=25&ntee_group=D&deductibility=1`}
        </HighlightPre>

        <HighlightPre>
{`/charities?state=NC&ntee_code=D20&asset_amount_gte=100000`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          Some filters accept one value. Others accept comma-separated lists.
          Check the filtering guide for the full list.
        </p>

        <Link href="/docs/filter-sort" className="text-primary underline">
          Read Filtering & Sorting →
        </Link>
      </DocsCard>

      <DocsCard
        cardTitle="7. Understand enriched fields"
        cardDescription="Many IRS-coded fields return structured objects instead of raw codes."
      >
        <HighlightPre>
{`"ntee_code": {
  "code": "D20",
  "description": "Animal Protection and Welfare"
}`}
        </HighlightPre>

        <HighlightPre>
{`"subsection_classification": {
  "subsection": "03",
  "classification": "2000",
  "description": "Educational Organization"
}`}
        </HighlightPre>

        <Link href="/docs/response-types" className="text-primary underline">
          Read Response Format →
        </Link>
      </DocsCard>

      <DocsCard
        cardTitle="8. Handle errors"
        cardDescription="Errors use a consistent machine-readable format."
      >
        <HighlightPre>
{`{
  "code": "validation_error",
  "message": "Request validation failed.",
  "reqId": "1e526aeb-258b-45ff-b092-3da872536e9f",
  "details": [
    {
      "path": "origin_zip",
      "message": "Provide either origin_zip or both lat and lng"
    }
  ]
}`}
        </HighlightPre>

        <Link href="/docs/errors" className="text-primary underline">
          Read Error Handling →
        </Link>
      </DocsCard>

      <DocsCard
        cardTitle="Next steps"
        cardDescription="Once your first request works, continue with the main guides."
      >
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/docs/nearby-search" className="text-primary underline">
            Nearby Search →
          </Link>
          <Link href="/docs/filter-sort" className="text-primary underline">
            Filtering & Sorting →
          </Link>
          <Link href="/docs/fields" className="text-primary underline">
            Field Selection →
          </Link>
          <Link href="/docs/api-reference" className="text-primary underline">
            OpenAPI Reference →
          </Link>
        </div>
      </DocsCard>
    </DocsPageWrapper>
  )
}