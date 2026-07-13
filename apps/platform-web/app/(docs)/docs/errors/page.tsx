import { Metadata } from "next"

import { DocsPageWrapper } from "../../components/docs-page-wrapper"
import { DocsTitleSection } from "../../components/docs-title-section"
import { DocsCard } from "../../components/docs-card"
import { HighlightPre } from "@/components/ui/highlight-pre"

export const metadata: Metadata = {
  title: "Error Handling | CharityQuery Docs",
  description:
    "Learn how CharityQuery API errors work, including validation errors, API key errors, rate limits, request IDs, and consistent response formats.",
  alternates: {
    canonical: "/docs/errors",
  },
}

export default function ErrorsPage() {
  return (
    <DocsPageWrapper>
      <DocsTitleSection
        title="Error Handling"
        paragraph="CharityQuery uses consistent error responses across endpoints. Every error includes a machine-readable code, a human-readable message, and a request ID for tracing."
      />

      <DocsCard
        cardTitle="Error format"
        cardDescription="Most API errors follow this JSON structure."
      >
        <HighlightPre>
{`{
  "code": "validation_error",
  "message": "Request validation failed.",
  "reqId": "bea96a5e-6f99-4c1f-b861-c6b816158dd9"
}`}
        </HighlightPre>

        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><code>code</code> — machine-readable error code</li>
          <li><code>message</code> — human-readable description</li>
          <li><code>reqId</code> — request ID for tracing and debugging</li>
          <li><code>details</code> — optional field-level validation details</li>
        </ul>
      </DocsCard>

      <DocsCard
        cardTitle="Validation error with details"
        cardDescription="Validation errors may include field-level feedback."
      >
        <HighlightPre>
{`{
  "code": "validation_error",
  "message": "Request validation failed.",
  "reqId": "1e526aeb-258b-45ff-b092-3da872536e9f",
  "details": [
    {
      "path": "origin_zip",
      "message": "Provide either origin_zip or both lat and lng",
      "zodCode": "custom"
    }
  ]
}`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          Client applications should treat <code>details</code> as optional.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Common error codes"
        cardDescription="These are the primary public error codes returned by the API."
      >
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium"><code>missing_api_key</code> — 401</p>
            <p className="text-muted-foreground">No API key was provided.</p>
          </div>

          <div>
            <p className="font-medium"><code>invalid_api_key</code> — 401</p>
            <p className="text-muted-foreground">The provided API key is invalid, inactive, or revoked.</p>
          </div>

          <div>
            <p className="font-medium"><code>validation_error</code> — 400</p>
            <p className="text-muted-foreground">Query parameters or request input failed validation.</p>
          </div>

          <div>
            <p className="font-medium"><code>invalid_origin_zip</code> — 400</p>
            <p className="text-muted-foreground">The provided origin ZIP could not be resolved for nearby search.</p>
          </div>

          <div>
            <p className="font-medium"><code>radius_not_allowed</code> — 403</p>
            <p className="text-muted-foreground">Requested nearby radius exceeds the current API tier.</p>
          </div>

          <div>
            <p className="font-medium"><code>limit_not_allowed</code> — 403</p>
            <p className="text-muted-foreground">Requested result limit exceeds the current API tier or endpoint limit.</p>
          </div>

          <div>
            <p className="font-medium"><code>rate_limited</code> — 429</p>
            <p className="text-muted-foreground">Daily request limit was exceeded.</p>
          </div>

          <div>
            <p className="font-medium"><code>not_found</code> — 404</p>
            <p className="text-muted-foreground">Requested resource was not found.</p>
          </div>

          <div>
            <p className="font-medium"><code>internal_error</code> — 500</p>
            <p className="text-muted-foreground">Unexpected server or database error.</p>
          </div>
        </div>
      </DocsCard>

      <DocsCard
        cardTitle="Rate limit error"
        cardDescription="Requests over the daily limit return a 429 response."
      >
        <HighlightPre>
{`{
  "code": "rate_limited",
  "message": "Met daily limit for this tier, time until reset 43122",
  "reqId": "2fdfe58c-4ec7-4876-b71d-a7d4dbb4c597"
}`}
        </HighlightPre>

        <p className="text-sm text-muted-foreground">
          Rate limit information may also be returned in headers such as{" "}
          <code>X-RateLimit-Limit</code>,{" "}
          <code>X-RateLimit-Remaining</code>, and{" "}
          <code>X-RateLimit-Reset</code>.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Using reqId"
        cardDescription="Every error includes a request ID."
      >
        <p>
          Use <code>reqId</code> to correlate client-side errors with server-side
          logs. Include it when debugging or requesting support.
        </p>
      </DocsCard>
    </DocsPageWrapper>
  )
}