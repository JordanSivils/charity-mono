import { SignOutButton } from "@clerk/nextjs"
import { getOrCreateUser } from "@/lib/actions/user/create-user"
import { DashboardUser } from "@/lib/actions/user/user-types"
import { DashboardUsageAndTier } from "./components/usage-tier"
import { GenerateKeys } from "./components/generate-keys"
import { DeleteAccountDialog } from "./components/delete-dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ManageBillingButton } from "./components/manage-billing"
import { CheckoutReturnToast } from "./components/checkout-return-toast"

export async function DashboardFetch() {
  const user = await getOrCreateUser()

  const mappedUser: DashboardUser = {
    name: user?.data.name ?? "Unknown",
    username: user?.data.email ?? "Unknown",
    tier: {
      id: user?.data.tier?.id ?? "NA",
      dailyLimit: user?.data.tier?.dailyLimit ?? 0,
      name: user?.data.tier?.name ?? "NA",
      nearbyRadiusMaxMiles: user?.data.tier?.nearbyRadiusMaxMiles ?? 0,
      nearbyResultLimit: user?.data.tier?.nearbyResultLimit ?? 0,
      resultLimit: user?.data.tier?.resultLimit ?? 0,
    },
    apiKeys: user.data.apiKeys,
    usage: {
      used: user.usage?.limit.used ?? 0,
      limit: user.usage?.limit.limit ?? 0,
      remaining: user.usage?.limit.remaining ?? 0,
    },
    billing: user.userBilling
      ? {
          status: user.userBilling.status,
          cancelAtPeriodEnd: user.userBilling.cancelAtPeriodEnd,
          currentPeriodEnd: user.userBilling.currentPeriodEnd,
        }
      : null,
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6">
      <CheckoutReturnToast />

      <section className="flex flex-col gap-4 rounded-lg border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Dashboard</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back, {user?.data.name ?? user.data.email}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your API keys, usage, and CharityQuery plan.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/docs/quickstart">
            <Button variant="outline">Quickstart</Button>
          </Link>

          <Link href="/docs/api-reference">
            <Button variant="outline">API Reference</Button>
          </Link>


          <SignOutButton>
            <Button variant="outline">Sign out</Button>
          </SignOutButton>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-6">
          <DashboardUsageAndTier user={mappedUser} />
          <GenerateKeys user={mappedUser} />
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-lg border bg-card p-5">
            <h2 className="text-lg font-semibold">Current plan</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              You are currently on the{" "}
              <span className="font-medium text-foreground">
                {mappedUser.tier.name}
              </span>{" "}
              plan.
            </p>

            {mappedUser.billing?.cancelAtPeriodEnd && mappedUser.billing.currentPeriodEnd && (
              <div className="mt-3 rounded-md border bg-muted/50 p-3 text-sm">
                <p className="font-medium">Subscription ending</p>
                <p className="text-muted-foreground">
                  Your plan is scheduled to cancel on{" "}
                  {mappedUser.billing.currentPeriodEnd.toLocaleDateString()}.
                </p>
              </div>
            )}

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Daily requests</span>
                <span>{mappedUser.tier.dailyLimit.toLocaleString()}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Nearby radius</span>
                <span>{mappedUser.tier.nearbyRadiusMaxMiles} miles</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Nearby results</span>
                <span>{mappedUser.tier.nearbyResultLimit}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Search results</span>
                <span>{mappedUser.tier.resultLimit}</span>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <Link href="/pricing">
                <Button className="w-full">
                  View plans
                </Button>
              </Link>

              {mappedUser.tier.name !== "FREE" && (
                <ManageBillingButton />
              )}
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Need more radius, results, or daily requests? Upgrade when your
              project is ready.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-5">
            <h2 className="text-lg font-semibold">Helpful links</h2>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/docs/nearby-search" className="text-primary underline">
                Nearby Search docs →
              </Link>
              <Link href="/docs/fields" className="text-primary underline">
                Field Selection docs →
              </Link>
              <Link href="/docs/errors" className="text-primary underline">
                Error Handling docs →
              </Link>
            </div>
          </div>

          <DeleteAccountDialog />
        </aside>
      </section>
    </div>
  )
}
