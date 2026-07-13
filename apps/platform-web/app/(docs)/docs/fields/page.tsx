import { Metadata } from "next"
import Link from "next/link"

import { DocsPageWrapper } from "../../components/docs-page-wrapper"
import { DocsTitleSection } from "../../components/docs-title-section"
import { DocsCard } from "../../components/docs-card"
import { HighlightPre } from "@/components/ui/highlight-pre"

import { fieldOpts } from "./field-opts"

export const metadata: Metadata = {
  title: "Field Selection | Charity API Docs",
  description:
    "Learn how to use the fields parameter in CharityQuery to select specific nonprofit API response fields, reduce payload size, and control response structure.",
  alternates: {
    canonical: "/docs/fields",
  },
}

export default function FieldsPage() {
  return (
    <DocsPageWrapper>
      <DocsTitleSection
        title="Field Selection"
        paragraph="Use the fields query parameter to request only the nonprofit data your application needs. Field selection keeps responses smaller, faster, and easier to work with."
      />

      <DocsCard
        cardTitle="How fields works"
        cardDescription="Pass a comma-separated list of field names in the fields query parameter."
      >
        <HighlightPre copy>
{`GET /charities?fields=ein,name,ntee_group,asset_amount,ruling`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          Field selection is similar to choosing columns in a database query.
          Filters and sorting are still applied at the route level, even if the
          filtered or sorted field is not included in <code>fields</code>.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Supported routes"
        cardDescription="The fields parameter is available on the main nonprofit routes."
      >
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li>
            <code>/charities</code>
          </li>
          <li>
            <code>/charities/{"{ein}"}</code>
          </li>
          <li>
            <code>/nearby</code>
          </li>
        </ul>

        <p className="text-sm text-muted-foreground">
          Most fields are shared across routes. The <code>/nearby</code>{" "}
          endpoint adds one extra field: <code>distance_miles</code>.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Basic example"
        cardDescription="Request only a few fields from the standard /charities endpoint."
      >
        <HighlightPre copy>
{`GET /charities?state=NC&fields=ein,name,city,state,ntee_group&limit=2`}
        </HighlightPre>

        <HighlightPre>
{`{
  "page": 1,
  "limit": 2,
  "total": 143,
  "totalPages": 72,
  "next": 2,
  "prev": null,
  "charities": [
    {
      "ein": "030513435",
      "name": "Example Community Organization",
      "city": "Raleigh",
      "state": "NC",
      "ntee_group": {
        "code": "W",
        "description": "Public, Society Benefit"
      }
    }
  ]
}`}
        </HighlightPre>
      </DocsCard>

      <DocsCard
        cardTitle="Nearby-only distance field"
        cardDescription="Use distance_miles when searching from a ZIP code or latitude/longitude pair."
      >
        <HighlightPre copy>
{`GET /nearby?origin_zip=28403&radius=25&fields=ein,name,city,state,distance_miles&limit=2`}
        </HighlightPre>

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
      "distance_miles": 3.44
    }
  ]
}`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          <code>distance_miles</code> is only available on <code>/nearby</code>.
          It is not available on <code>/charities</code> because the standard
          route does not use a search origin.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Filtering + fields"
        cardDescription="Use filters to narrow the dataset, then fields to control the response shape."
      >
        <HighlightPre copy>
{`GET /charities?city=Raleigh&state=NC&income_amount_gte=1000&income_amount_lte=10000&fields=ein,asset_amount,income_amount,revenue_amount&limit=2`}
        </HighlightPre>

        <HighlightPre>
{`{
  "page": 1,
  "limit": 2,
  "total": 10,
  "totalPages": 5,
  "next": 2,
  "prev": null,
  "charities": [
    {
      "ein": "020615760",
      "asset_amount": 278160,
      "income_amount": 195290,
      "revenue_amount": 195290
    },
    {
      "ein": "030547048",
      "asset_amount": 370668,
      "income_amount": 591904,
      "revenue_amount": 591904
    }
  ]
}`}
        </HighlightPre>
      </DocsCard>

      <DocsCard
        cardTitle="Single charity example"
        cardDescription="Use fields on an EIN lookup when you only need a few attributes."
      >
        <HighlightPre copy>
{`GET /charities/020561076?fields=ein,name,deductibility,group,affiliation`}
        </HighlightPre>

        <HighlightPre>
{`{
  "charity": {
    "ein": "020561076",
    "name": "Marine Corps League",
    "deductibility": {
      "code": "1",
      "description": "Contributions are deductible"
    },
    "group": "0955",
    "affiliation": {
      "code": "9",
      "description": "Subordinate"
    }
  }
}`}
        </HighlightPre>
      </DocsCard>

      <DocsCard
        cardTitle="Enriched fields"
        cardDescription="Some selected fields return structured objects instead of raw codes."
      >
        <p>
          Many IRS-coded fields return both the original code and a readable
          description.
        </p>

        <HighlightPre>
{`"ntee_code": {
  "code": "D20",
  "description": "Animal Protection and Welfare"
}`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          Read the response format guide for the full list of enriched fields
          and special response shapes.
        </p>

        <Link href="/docs/response-types" className="text-primary underline">
          Read Response Format →
        </Link>
      </DocsCard>

      <DocsCard
        cardTitle="Selectable fields"
        cardDescription="These fields can be requested on /charities and /charities/{ein}."
      >
        <ul className="grid list-disc gap-2 pl-5 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {fieldOpts.map((opt) => (
            <li key={opt}>
              <code>{opt}</code>
            </li>
          ))}
        </ul>

        <p className="text-sm text-muted-foreground">
          The <code>/nearby</code> endpoint supports these fields and adds{" "}
          <code>distance_miles</code>.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Next steps"
        cardDescription="Learn how fields connect to filtering, sorting, and response objects."
      >
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/docs/filter-sort" className="text-primary underline">
            Filtering & Sorting →
          </Link>
          <Link href="/docs/nearby-search" className="text-primary underline">
            Nearby Search →
          </Link>
          <Link href="/docs/response-types" className="text-primary underline">
            Response Format →
          </Link>
        </div>
      </DocsCard>
    </DocsPageWrapper>
  )
}