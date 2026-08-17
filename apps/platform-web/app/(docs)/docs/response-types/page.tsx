import { Metadata } from "next"

import { DocsPageWrapper } from "../../components/docs-page-wrapper"
import { DocsTitleSection } from "../../components/docs-title-section"
import { DocsCard } from "../../components/docs-card"
import { HighlightPre } from "@/components/ui/highlight-pre"

import {
  codeObjectFields,
  nearbyOnlyNumberFields,
  nonNullStringFields,
  nullableNumberFields,
  nullableStringFields,
} from "./res-types"

export const metadata: Metadata = {
  title: "API Response Format | CharityQuery Docs",
  description:
    "Learn how CharityQuery structures nonprofit API responses, including enriched IRS code objects, nullable fields, omitted fields, numeric values, and nearby distance results.",
  alternates: {
    canonical: "/docs/response-types",
  },
}

export default function ResponseTypesPage() {
  return (
    <DocsPageWrapper>
      <DocsTitleSection
        title="Response Format"
        paragraph="CharityQuery response fields can return strings, numbers, enriched code objects, special combined objects, null values, or be omitted entirely when they are not requested."
      />

      <DocsCard
        cardTitle="Present, null, or omitted"
        cardDescription="Field selection changes which fields appear in a response."
      >
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>
            <strong>Present:</strong> the field was requested and has a value.
          </li>
          <li>
            <strong>Null:</strong> the field was requested, but no value exists.
          </li>
          <li>
            <strong>Omitted:</strong> the field was not requested with{" "}
            <code>fields</code>.
          </li>
        </ul>
      </DocsCard>

      <DocsCard
        cardTitle="Enriched code objects"
        cardDescription="Many IRS-coded values return both the original code and a human-readable description."
      >
        <ul className="grid list-disc gap-2 pl-5 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {codeObjectFields.map((item) => (
            <li key={item}>
              <code>{item}</code>
            </li>
          ))}
        </ul>

        <HighlightPre>
{`"ntee_code": {
  "code": "D20",
  "description": "Animal Protection and Welfare"
}`}
        </HighlightPre>

        <HighlightPre>
{`"geocode_status": {
  "code": 12,
  "description": "Census geocoder match"
}`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          If an enriched field is requested but no value exists, it returns{" "}
          <code>null</code>.
        </p>

        <HighlightPre>{`"ntee_code": null`}</HighlightPre>
      </DocsCard>

      <DocsCard
        cardTitle="Subsection classification object"
        cardDescription="Subsection and classification are resolved together."
      >
        <p>
          The <code>subsection_classification</code> field combines two IRS
          values into one object with a resolved description.
        </p>

        <HighlightPre>
{`"subsection_classification": {
  "subsection": "03",
  "classification": "2000",
  "description": "Educational Organization"
}`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          If either value is unavailable or the combination cannot be resolved,
          this field may return <code>null</code>.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="String fields"
        cardDescription="String fields return plain text values or null."
      >
        <p className="text-sm font-medium">Non-null string fields</p>

        <ul className="list-disc pl-5 text-sm">
          {nonNullStringFields.map((item) => (
            <li key={item}>
              <code>{item}</code>
            </li>
          ))}
        </ul>

        <p className="text-sm font-medium">Nullable string fields</p>

        <ul className="grid list-disc gap-2 pl-5 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {nullableStringFields.map((item) => (
            <li key={item}>
              <code>{item}</code>
            </li>
          ))}
        </ul>

        <HighlightPre>{`"state": "NC"`}</HighlightPre>
        <HighlightPre>{`"group": "0429"`}</HighlightPre>
        <HighlightPre>{`"group": null`}</HighlightPre>
      </DocsCard>

      <DocsCard
        cardTitle="Numeric fields"
        cardDescription="Numeric fields return numbers when values are available."
      >
        <ul className="grid list-disc gap-2 pl-5 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {nullableNumberFields.map((item) => (
            <li key={item}>
              <code>{item}</code>
            </li>
          ))}
        </ul>

        <HighlightPre>{`"asset_amount": 125000.45`}</HighlightPre>
        <HighlightPre>{`"lat": 34.2257`}</HighlightPre>
        <HighlightPre>{`"asset_amount": null`}</HighlightPre>

        <p className="text-sm text-muted-foreground">
          If your implementation returns Prisma Decimal values without
          conversion, some numeric fields may serialize as strings. For public
          API consistency, normalizing these fields to numbers is recommended.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Nearby-only numeric fields"
        cardDescription="Nearby search adds distance information."
      >
        <ul className="list-disc pl-5 text-sm">
          {nearbyOnlyNumberFields.map((item) => (
            <li key={item}>
              <code>{item}</code>
            </li>
          ))}
        </ul>

        <p>
          The <code>distance_miles</code> field is calculated from the search
          origin and is only available on <code>/nearby</code>.
        </p>

        <HighlightPre>{`"distance_miles": 3.44`}</HighlightPre>
      </DocsCard>

      <DocsCard
        cardTitle="Nearby Search Origin"
        cardDescription="Nearby responses include the resolved search origin used to calculate distance."
      >
        <p>
          The <code>origin</code> field describes the exact location used as the
          starting point for the nearby search. This ensures transparency when
          calculating <code>distance_miles</code>.
        </p>

        <p className="text-sm text-muted-foreground">
          The origin may come from a ZIP code lookup or directly from provided
          coordinates.
        </p>

        <HighlightPre>
{`"origin": {
  "lat": 34.2237,
  "lng": -77.8862,
  "source": "zip"
}`}
        </HighlightPre>

        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>
            <code>lat</code> — resolved latitude used for distance calculation
          </li>
          <li>
            <code>lng</code> — resolved longitude used for distance calculation
          </li>
          <li>
            <code>source</code> — how the origin was determined
            <ul className="list-disc pl-5 mt-1">
              <li><code>&quot;zip&quot;</code> — derived from <code>origin_zip</code></li>
              <li><code>&quot;coordinates&quot;</code> — provided via <code>lat</code> and <code>lng</code></li>
            </ul>
          </li>
        </ul>

        <p className="text-sm text-muted-foreground">
          This field is always included in nearby responses and reflects the final
          coordinates used for distance calculations.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="TypeScript example"
        cardDescription="Frontend applications should account for optional and nullable fields."
      >
        <HighlightPre>
{`type CodedValue = {
  code: string | number
  description: string
}

type SubsectionClassification = {
  subsection: string
  classification: string
  description: string
}

type Charity = {
  ein?: string
  name?: string | null
  ntee_code?: CodedValue | null
  state?: string | null
  asset_amount?: number | null
  lat?: number | null
  lng?: number | null
  geocode_status?: CodedValue | null
  subsection_classification?: SubsectionClassification | null
  distance_miles?: number | null
}`}
        </HighlightPre>
      </DocsCard>
    </DocsPageWrapper>
  )
}
