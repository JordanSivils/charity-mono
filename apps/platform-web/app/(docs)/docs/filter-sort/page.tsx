import { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DocsPageWrapper } from "../../components/docs-page-wrapper"
import { DocsTitleSection } from "../../components/docs-title-section"
import { DocsCard } from "../../components/docs-card"
import { HighlightPre } from "@/components/ui/highlight-pre"

import {
  directMatchFilters,
  metadataValidatedFilters,
  numericRangeFilters,
  paginationFilters,
  sortingConfig,
  uniqueMetadataValidationFilters,
} from "./filter-sort-opts"

export const metadata: Metadata = {
  title: "Filtering and Sorting Nonprofit API Results | CharityQuery Docs",
  description:
    "Learn how to filter, paginate, and sort IRS nonprofit data using CharityQuery query parameters, metadata-validated filters, financial ranges, and field selection.",
  alternates: {
    canonical: "/docs/filter-sort",
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

export default function FilterSortPage() {
  return (
    <DocsPageWrapper>
      <DocsTitleSection
        title="Filtering and Sorting"
        paragraph="Use the /charities endpoint to search IRS nonprofit records with query parameters for location, classification, financial ranges, pagination, field selection, and sorting."
      />

      <DocsCard
        cardTitle="Route scope"
        cardDescription="This page covers the standard charity list route."
      >
        <p>
          These options apply to <code>GET /charities</code>. For radius-based
          search with <code>origin_zip</code>, <code>lat</code>,{" "}
          <code>lng</code>, <code>radius</code>, and{" "}
          <code>distance_miles</code>, use <code>GET /nearby</code>.
        </p>

        <Link href="/docs/nearby-search">
          <Button variant="link" className="w-fit px-0">
            View Nearby Search →
          </Button>
        </Link>
      </DocsCard>

      <DocsCard
        cardTitle="Basic filtered request"
        cardDescription="Filter nonprofits by state and NTEE code."
      >
        <HighlightPre copy>
{`GET /charities?state=NC&ntee_code=D20&fields=ein,name,state,ntee_code&limit=25`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          Filters are applied before field selection. Sorting does not require
          the sorted field to be included in <code>fields</code>.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Filtering"
        cardDescription="Filters narrow the result set returned by the API."
      >
        <p>
          Filters are passed as query parameters. Some filters accept multiple
          values and are marked as <code>multi</code> in the tables below.
        </p>

        <HighlightPre copy>
{`GET /charities?state=NC&ntee_code=D20,W30&limit=25`}
        </HighlightPre>
      </DocsCard>

      <DocsCard
        cardTitle="Metadata-validated filters"
        cardDescription="These filters are validated against CharityQuery metadata definitions."
      >
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
          <li>
            Values are checked against the same code definitions exposed by the
            metadata endpoints.
          </li>
          <li>
            Many IRS codes contain leading zeros. Treat code values as strings.
          </li>
          <li>
            Invalid values return a <code>400</code> validation error.
          </li>
        </ul>

        <DocsTable rows={metadataValidatedFilters} />
      </DocsCard>

      <DocsCard
        cardTitle="Subsection and classification"
        cardDescription="These two filters must be provided together."
      >
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
          <li>
            <code>subsection</code> and <code>classification</code> must be used
            together.
          </li>
          <li>
            The paired combination gives a more precise IRS classification than
            either value alone.
          </li>
          <li>
            Use <code>/metadata/subsection-classification</code> to get valid
            paired combinations when building UI filters.
          </li>
        </ul>

        <HighlightPre copy>
{`GET /charities?subsection=03&classification=2000`}
        </HighlightPre>

        <DocsTable rows={uniqueMetadataValidationFilters} />

        <Link href="/docs/subsection-classification">
          <Button variant="link" className="w-fit px-0">
            Read Subsection & Classification →
          </Button>
        </Link>
      </DocsCard>

      <DocsCard
        cardTitle="Direct match filters"
        cardDescription="These filters match against stored nonprofit data."
      >
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
          <li>
            Values are treated as strings. Fields such as <code>zip</code> and{" "}
            <code>group</code> may contain leading zeros.
          </li>
          <li>
            Direct match filters are best for known values such as{" "}
            <code>zip</code>, <code>city</code>, <code>state</code>,{" "}
            <code>group</code>, <code>ruling</code>, and{" "}
            <code>tax_period</code>.
          </li>
          <li>
            Text fields like <code>name</code>, <code>ico</code>, and{" "}
            <code>street</code> are less reliable unless you know the stored
            value.
          </li>
        </ul>

        <DocsTable rows={directMatchFilters} />
      </DocsCard>

      <DocsCard
        cardTitle="Financial range filters"
        cardDescription="Search nonprofits by asset, income, and revenue amounts."
      >
        <p>
          Range filters let you set minimum and maximum values. You can use one
          side of a range or combine both.
        </p>

        <HighlightPre copy>
{`GET /charities?state=NC&income_amount_gte=1000&income_amount_lte=10000&limit=25`}
        </HighlightPre>

        <DocsTable rows={numericRangeFilters} />
      </DocsCard>

      <DocsCard
        cardTitle="Pagination"
        cardDescription="Control how many results are returned and move through result pages."
      >
        <HighlightPre copy>
{`GET /charities?state=NC&limit=25&page=2`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          Result limits may vary by endpoint and API tier.
        </p>

        <DocsTable rows={paginationFilters} />
      </DocsCard>

      <DocsCard
        cardTitle="Sorting"
        cardDescription="Use sort parameters to control result order."
      >
        <p>
          The <code>/charities</code> endpoint supports sorting by public
          sortable fields. Use <code>sortBy</code> to choose the field and{" "}
          <code>sortDir</code> to choose ascending or descending order.
        </p>

        <HighlightPre copy>
{`GET /charities?state=NC&sortBy=name&sortDir=asc&limit=25`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          For distance-based sorting, use <code>/nearby</code> and sort by{" "}
          <code>distance_miles</code>.
        </p>

        <DocsTable rows={sortingConfig} />

        <Link href="/docs/fields">
          <Button variant="link" className="w-fit px-0">
            View Field Selection →
          </Button>
        </Link>
      </DocsCard>

      <DocsCard
        cardTitle="Example: find animal-related nonprofits in North Carolina"
        cardDescription="Combine filters, sorting, field selection, and pagination."
      >
        <HighlightPre copy>
{`GET /charities?state=NC&ntee_group=D&fields=ein,name,city,state,ntee_group&sortBy=name&sortDir=asc&limit=25`}
        </HighlightPre>
      </DocsCard>
    </DocsPageWrapper>
  )
}