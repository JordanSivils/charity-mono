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
  nearbyDirectMatchFilters,
  nearbyLocationFilters,
  nearbyMetadataValidatedFilters,
  nearbyNumericRangeFilters,
  nearbyOnlyFields,
  nearbyPaginationFilters,
  nearbySortingConfig,
  nearbyUniqueMetadataValidationFilters,
} from "./nearby-opts"

export const metadata: Metadata = {
  title: "Nearby Charity Search API | CharityQuery Docs",
  description:
    "Use CharityQuery's Nearby Search API to find IRS-recognized nonprofits near a ZIP code or latitude/longitude, with radius filters and distance results.",
  alternates: {
    canonical: "/docs/nearby-search",
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

export default function NearbySearchPage() {
  return (
    <DocsPageWrapper>
      <DocsTitleSection
        title="Nearby Nonprofit Search"
        paragraph="Use the /nearby endpoint to find nonprofits within a radius of a ZIP code or latitude/longitude pair. Nearby search returns distance in miles and supports filtering, sorting, pagination, and field selection."
      />

      <DocsCard
        cardTitle="Endpoint"
        cardDescription="Use nearby search when location and distance are central to the request."
      >
        <HighlightPre copy>{`GET /nearby`}</HighlightPre>

        <p>
          The <code>/nearby</code> endpoint is the geospatial search route for
          CharityQuery. It works like the standard <code>/charities</code> route,
          but requires a search origin and can return{" "}
          <code>distance_miles</code>.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <Link href="/docs/quickstart">
            <Button variant="link" className="w-fit px-0">
              View Quickstart →
            </Button>
          </Link>

          <Link href="/docs/filter-sort">
            <Button variant="link" className="w-fit px-0">
              View Filtering & Sorting →
            </Button>
          </Link>
        </div>
      </DocsCard>

      <DocsCard
        cardTitle="Basic nearby request"
        cardDescription="Find nonprofits within 25 miles of ZIP code 28403."
      >
        <HighlightPre copy>
{`GET /nearby?origin_zip=28403&radius=25&fields=ein,name,city,state,ntee_group,distance_miles&limit=5`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          Nearby results are sorted by <code>distance_miles</code> ascending by
          default, with nonprofit name used as a secondary sort for stable
          ordering.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Search origin"
        cardDescription="Every nearby request needs either coordinates or an origin ZIP code."
      >
        <p>
          Provide either <code>lat</code> and <code>lng</code> together, or
          provide <code>origin_zip</code>. If both are provided,{" "}
          <code>lat</code> and <code>lng</code> are used as the search origin.
        </p>

        <div className="space-y-3">
          <HighlightPre copy label="Search from ZIP code">
{`GET /nearby?origin_zip=28403&radius=25`}
          </HighlightPre>

          <HighlightPre copy label="Search from latitude and longitude">
{`GET /nearby?lat=34.2257&lng=-77.9447&radius=25`}
          </HighlightPre>
        </div>

        <DocsTable rows={nearbyLocationFilters} />
      </DocsCard>

      <DocsCard
        cardTitle="Distance results"
        cardDescription="Nearby search can return calculated distance from the search origin."
      >
        <p>
          The <code>distance_miles</code> field is only available on{" "}
          <code>/nearby</code>. It is calculated from the search origin and can
          be requested with the <code>fields</code> parameter.
        </p>

        <HighlightPre copy>
{`GET /nearby?origin_zip=28403&radius=25&fields=ein,name,city,state,distance_miles&limit=5`}
        </HighlightPre>

        <DocsTable rows={nearbyOnlyFields} />
      </DocsCard>

      <DocsCard
        cardTitle="Filtering nearby results"
        cardDescription="Narrow nearby nonprofits by cause, IRS classification, financial ranges, and other fields."
      >
        <p>
          Filters are passed as query parameters. Some filters accept
          comma-separated or repeated values depending on your query parser and
          schema configuration.
        </p>

        <HighlightPre copy>
{`GET /nearby?origin_zip=28403&radius=25&ntee_code=D20,W30&limit=25`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          Filters that support multiple values are marked as <code>multi</code>{" "}
          in the tables below.
        </p>
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

        <DocsTable rows={nearbyMetadataValidatedFilters} />
      </DocsCard>

      <DocsCard
        cardTitle="Subsection and classification"
        cardDescription="These two filters must be provided together."
      >
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
          <li>
            <code>subsection</code> and <code>classification</code> must be used
            together on <code>/nearby</code>.
          </li>
          <li>
            The paired combination provides a more precise IRS classification
            than either value alone.
          </li>
          <li>
            Use <code>/metadata/subsection-classification</code> to get valid
            paired combinations when building UI filters.
          </li>
        </ul>

        <HighlightPre copy>
{`GET /nearby?origin_zip=28403&subsection=03&classification=2000`}
        </HighlightPre>

        <DocsTable rows={nearbyUniqueMetadataValidationFilters} />

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
            Values are treated as strings. Fields such as <code>group</code> may
            contain leading zeros.
          </li>
          <li>
            Direct match filters are best for known values such as state, IRS
            group, ruling date, activity, or tax period.
          </li>
          <li>
            Nearby search uses <code>origin_zip</code>, <code>lat</code>,{" "}
            <code>lng</code>, and <code>radius</code> for the search origin.
          </li>
        </ul>

        <DocsTable rows={nearbyDirectMatchFilters} />
      </DocsCard>

      <DocsCard
        cardTitle="Financial range filters"
        cardDescription="Search nearby nonprofits by asset, income, and revenue amounts."
      >
        <p>
          Range filters let you set minimum and maximum values. You can use one
          side of a range or combine both.
        </p>

        <HighlightPre copy>
{`GET /nearby?origin_zip=28403&radius=25&income_amount_gte=1000&income_amount_lte=10000&limit=25`}
        </HighlightPre>

        <DocsTable rows={nearbyNumericRangeFilters} />
      </DocsCard>

      <DocsCard
        cardTitle="Pagination"
        cardDescription="Control how many nearby results are returned and move through result pages."
      >
        <HighlightPre copy>
{`GET /nearby?origin_zip=28403&radius=25&limit=25&page=2`}
        </HighlightPre>

        <DocsTable rows={nearbyPaginationFilters} />
      </DocsCard>

      <DocsCard
        cardTitle="Sorting"
        cardDescription="Control the order of nearby results."
      >
        <p>
          By default, <code>/nearby</code> sorts by{" "}
          <code>distance_miles</code> ascending. You can also sort by supported
          public fields. Sorting does not require the field to be included in{" "}
          <code>fields</code>.
        </p>

        <HighlightPre copy>
{`GET /nearby?origin_zip=28403&radius=25&sortBy=distance_miles&sortDir=asc&limit=25`}
        </HighlightPre>

        <DocsTable rows={nearbySortingConfig} />

        <Link href="/docs/fields">
          <Button variant="link" className="w-fit px-0">
            View supported response fields →
          </Button>
        </Link>
      </DocsCard>

      <DocsCard
        cardTitle="Example: find animal-related nonprofits nearby"
        cardDescription="Combine radius search, metadata filters, field selection, and sorting."
      >
        <HighlightPre copy>
{`GET /nearby?origin_zip=28403&radius=50&ntee_group=D&fields=ein,name,city,state,ntee_group,distance_miles&sortBy=distance_miles&sortDir=asc&limit=10`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          This request finds nearby animal-related nonprofits, returns a compact
          response, and orders results by distance.
        </p>
      </DocsCard>
    </DocsPageWrapper>
  )
}
