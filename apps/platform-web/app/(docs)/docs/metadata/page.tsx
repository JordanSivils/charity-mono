import { Metadata } from "next"
import Link from "next/link"

import { DocsPageWrapper } from "../../components/docs-page-wrapper"
import { DocsTitleSection } from "../../components/docs-title-section"
import { DocsCard } from "../../components/docs-card"
import { HighlightPre } from "@/components/ui/highlight-pre"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { metadataKey, metaExists } from "./meta-key"

export const metadata: Metadata = {
  title: "Metadata & IRS Codes | CharityQuery Docs",
  description:
    "Explore CharityQuery metadata endpoints for IRS nonprofit codes, NTEE codes, subsection classifications, filter values, and enriched API response fields.",
  alternates: {
    canonical: "/docs/metadata",
  },
}

function DocsTable<T extends Record<string, unknown>>({ rows }: { rows: T[] }) {
  if (!rows.length) return null

  const keys = Object.keys(rows[0])

  return (
    <div className="w-full overflow-auto">
      <Table className="text-sm">
        <TableHeader>
          <TableRow>
            {keys.map((key) => (
              <TableHead key={key}>{key}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((item, index) => (
            <TableRow key={index}>
              {keys.map((key) => (
                <TableCell key={key}>
                  {String(item[key as keyof typeof item])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default function MetadataPage() {
  return (
    <DocsPageWrapper>
      <DocsTitleSection
        title="Metadata & Codes"
        paragraph="Metadata routes expose the IRS and CharityQuery code definitions used throughout the API. Use them to understand coded fields, build dropdowns, validate filter values, and interpret enriched response objects."
      />

      <DocsCard
        cardTitle="How metadata is used"
        cardDescription="Metadata routes help developers build reliable filters and readable interfaces."
      >
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Populate selects, dropdowns, comboboxes, and filter menus.</li>
          <li>Look up valid values before sending metadata-validated filters.</li>
          <li>Understand enriched fields such as <code>ntee_code</code>, <code>deductibility</code>, and <code>geocode_status</code>.</li>
          <li>Cache metadata in your own application when values are used frequently.</li>
        </ul>

        <p className="text-sm text-muted-foreground">
          Metadata requests do not count against your daily request limit.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Metadata key"
        cardDescription="A broad reference for coded fields used throughout CharityQuery."
      >
        <HighlightPre copy>{`GET /metadata/charity-key`}</HighlightPre>

        <p className="text-sm text-muted-foreground">
          This route is primarily a reference. It does not validate requests, but
          it helps explain the coded fields available in the API.
        </p>

        <DocsTable rows={metadataKey} />
      </DocsCard>

      <DocsCard
        cardTitle="Fields with metadata routes"
        cardDescription="These fields have dedicated metadata endpoints."
      >
        <p className="text-sm text-muted-foreground">
          These routes are especially useful when building UI filters. They let
          your application show readable labels while sending valid API values.
        </p>

        <p className="text-sm text-muted-foreground">
          <Link
            href="/docs/subsection-classification"
            className="font-medium text-primary underline"
          >
            Subsection and classification
          </Link>{" "}
          are a special case and should be handled as a paired value.
        </p>

        <DocsTable rows={metaExists} />
      </DocsCard>

      <DocsCard
        cardTitle="Recommended usage"
        cardDescription="Use metadata as a reference layer for your application."
      >
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Fetch metadata during development to understand available codes.</li>
          <li>Use metadata endpoints to power user-facing filters.</li>
          <li>Store returned JSON locally when your application uses it often.</li>
          <li>Refresh periodically if you want updated definitions.</li>
          <li>Use metadata definitions to explain enriched API responses.</li>
        </ul>
      </DocsCard>

      <DocsCard
        cardTitle="Next steps"
        cardDescription="Learn how metadata connects to filters and response fields."
      >
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/docs/filter-sort" className="text-primary underline">
            Filtering & Sorting →
          </Link>
          <Link href="/docs/response-types" className="text-primary underline">
            Response Format →
          </Link>
          <Link href="/docs/subsection-classification" className="text-primary underline">
            Subsection & Classification →
          </Link>
        </div>
      </DocsCard>
    </DocsPageWrapper>
  )
}