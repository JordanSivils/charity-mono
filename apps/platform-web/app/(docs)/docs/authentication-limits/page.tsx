import { Metadata } from "next";
import { DocsTitleSection } from "../../components/docs-title-section";
import { DocsCard } from "../../components/docs-card";
import { HighlightPre } from "@/components/ui/highlight-pre";

export const metadata: Metadata = {
  title: "Authentication for Charity API",
  description:
    "Learn how to authenticate requests to the CharityQuery API using your API key, including headers, limits, examples, and best practices.",
  alternates: {
    canonical: "/docs/authentication-limits",
  },
};

export default function AuthLimitsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DocsTitleSection
        title="Authentication, Limits & Usage"
        paragraph="
            CharityQuery uses API key authentication for all API requests. Your
            dashboard is used to generate and manage keys, while the API itself
            is authenticated exclusively through the 'x-api-key' header
            header."
      />

      <DocsCard
        cardTitle="API Key Security"
        cardDescription="API keys should only be used in secure server environments."
      >
        <p>
          API keys provide access to your CharityQuery account and should never
          be exposed in client-side code such as browsers, mobile apps, or
          public repositories.
        </p>

        <p>Always make API requests from a secure backend environment:</p>

        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Server-side functions, such as Next.js Server Actions</li>
          <li>Backend APIs, such as Express, Django, or Gin</li>
          <li>Server-to-server integrations</li>
        </ul>

        <p>
          If an API key is exposed publicly, it can be used by anyone and may
          result in unauthorized usage or exceeded rate limits.
        </p>

        <p className="text-sm text-muted-foreground">
          If you believe a key has been exposed, revoke it immediately from your
          dashboard and generate a new one.
        </p>

        <HighlightPre>
{`// ❌ Do NOT do this client-side
fetch("https://api.charityquery.com/charities", {
  headers: {
    "x-api-key": "YOUR_API_KEY"
  }
})

// ✅ Do this instead server-side
export async function getCharities() {
  return fetch("https://api.charityquery.com/charities", {
    headers: {
      "x-api-key": process.env.CHARITY_API_KEY
    }
  })
}`}
        </HighlightPre>
      </DocsCard>

      <DocsCard
        cardTitle="Authentication"
        cardDescription="Use your API key in the request header."
      >
        <p>Every API request must include a valid API key:</p>

        <HighlightPre copy>{`x-api-key: YOUR_API_KEY`}</HighlightPre>

        <p>
          Clerk is used only to sign in to the website and access the developer
          dashboard. Clerk tokens are not used to authenticate API requests.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Development and Live Keys"
        cardDescription="CharityQuery supports separate keys for testing and production, but usage counts toward the same account limit."
      >
        <p>
          CharityQuery provides separate development and live API keys so you can
          test safely before moving into production.
        </p>

        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>
            <code>dev</code> keys are intended for local development, testing,
            and staging environments.
          </li>
          <li>
            <code>live</code> keys are intended for production applications.
          </li>
        </ul>

        <p>
          Both key types count toward the same daily usage limit for your
          account. Creating separate keys does not create separate request
          allowances.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Daily Limits"
        cardDescription="Daily request limits are determined by your current tier."
      >
        <p>
          Each successful request counts toward your daily request usage. Your
          current limit depends on your developer tier.
        </p>

        <p>
          If you exceed your daily allowance, the API will return a{" "}
          <code>429 Too Many Requests</code> response until your limit resets.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Rate Limit Headers"
        cardDescription="Every response includes headers that show your current daily usage."
      >
        <HighlightPre copy>
{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 742
X-RateLimit-Reset: 1767225600`}
        </HighlightPre>

        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>
            <code>X-RateLimit-Limit</code> — your total daily request allowance
          </li>
          <li>
            <code>X-RateLimit-Remaining</code> — requests remaining before reset
          </li>
          <li>
            <code>X-RateLimit-Reset</code> — Unix timestamp for when the limit
            resets
          </li>
        </ul>
      </DocsCard>

      <DocsCard
        cardTitle="Dashboard Usage"
        cardDescription="You can monitor usage and key activity from your dashboard."
      >
        <p>
          In addition to response headers, your dashboard provides visibility
          into API key usage and request activity. This makes it easy to monitor
          development and production keys while keeping usage tied to the same
          account limit.
        </p>
      </DocsCard>

      <DocsCard
        cardTitle="Example Request"
        cardDescription="Example request using API key authentication."
      >
        <HighlightPre copy>
{`curl "https://api.charityquery.com/nearby?origin_zip=28387&radius=25&limit=2" \\
-H "x-api-key: YOUR_API_KEY"`}
        </HighlightPre>
      </DocsCard>
    </div>
  );
}