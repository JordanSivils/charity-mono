import { Metadata } from "next"
import Link from "next/link"

import { DocsPageWrapper } from "../../components/docs-page-wrapper"
import { DocsTitleSection } from "../../components/docs-title-section"
import { DocsCard } from "../../components/docs-card"
import { HighlightPre } from "@/components/ui/highlight-pre"

export const metadata: Metadata = {
  title: "Subsection & Classification | CharityQuery Docs",
  description:
    "Learn how IRS nonprofit subsection and classification codes work together, how CharityQuery validates them, and how to request subsection_classification in API responses.",
  alternates: {
    canonical: "/docs/subsection-classification",
  },
}

export default function SubsectionClassificationPage() {
  return (
    <DocsPageWrapper>
      <DocsTitleSection
        title="Subsection & Classification"
        paragraph="IRS subsection and classification values work together to describe an organization's tax-exempt category. CharityQuery treats them as a paired filter and returns them as a combined response object."
      />

      <DocsCard
        cardTitle="Why these fields are paired"
        cardDescription="A subsection or classification value alone can be incomplete or misleading."
      >
        <p>
          The <code>subsection</code> value identifies the broader exempt
          organization category, while <code>classification</code> further
          describes the organization type inside that category.
        </p>

        <p className="text-sm text-muted-foreground">
          Because the useful meaning comes from the combination, CharityQuery
          requires both values when filtering and resolves them into one
          readable response field.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Filtering rule"
        cardDescription="subsection and classification must be provided together."
      >
        <HighlightPre copy>
{`GET /charities?subsection=03&classification=2000`}
        </HighlightPre>

        <HighlightPre copy>
{`GET /nearby?origin_zip=28403&subsection=03&classification=2000`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          Providing only one of these values returns a{" "}
          <code>validation_error</code>.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Response field"
        cardDescription="The API returns these values as subsection_classification."
      >
        <p>
          Instead of returning <code>subsection</code> and{" "}
          <code>classification</code> as separate response fields, request{" "}
          <code>subsection_classification</code>.
        </p>

        <HighlightPre>
{`"subsection_classification": {
  "subsection": "03",
  "classification": "2000",
  "description": "Educational Organization"
}`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          If either value is unavailable or the pair cannot be resolved, this
          field may return <code>null</code>.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Using fields"
        cardDescription="Request the combined field with the fields parameter."
      >
        <HighlightPre copy>
{`GET /charities?fields=ein,name,subsection_classification`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          <code>subsection_classification</code> is selectable as a response
          field, but it is not used for sorting.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Sorting"
        cardDescription="Sorting uses the underlying fields."
      >
        <p>
          You can sort by <code>subsection</code> or{" "}
          <code>classification</code> individually. The combined response field{" "}
          <code>subsection_classification</code> is not a sort field.
        </p>

        <HighlightPre copy>
{`GET /charities?sortBy=subsection&sortDir=asc`}
        </HighlightPre>

        <HighlightPre copy>
{`GET /charities?sortBy=classification&sortDir=desc`}
        </HighlightPre>
      </DocsCard>

      <DocsCard
        cardTitle="Validation error example"
        cardDescription="This response is returned when only one paired value is provided."
      >
        <HighlightPre>
{`{
  "code": "validation_error",
  "message": "Request validation failed.",
  "reqId": "4aab7166-4b5b-49d9-a25f-f7db49768a2d",
  "details": [
    {
      "path": "subsection",
      "message": "subsection and classification must be provided together",
      "zodCode": "custom"
    },
    {
      "path": "classification",
      "message": "subsection and classification must be provided together",
      "zodCode": "custom"
    }
  ]
}`}
        </HighlightPre>
      </DocsCard>

      <DocsCard
        cardTitle="Metadata route"
        cardDescription="Use metadata to find valid subsection and classification pairs."
      >
        <HighlightPre copy>
{`GET /metadata/subsection-classification`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          This route is recommended when building dropdowns, comboboxes, or
          filters that need valid paired combinations.
        </p>

        <Link href="/docs/metadata" className="text-primary underline">
          Read Metadata & Codes →
        </Link>
      </DocsCard>
    </DocsPageWrapper>
  )
}