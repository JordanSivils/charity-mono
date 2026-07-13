import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardUser } from "@/lib/actions/user/user-types"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface DashboardUsageAndTierProps {
  user: DashboardUser
}

export function DashboardUsageAndTier({ user }: DashboardUsageAndTierProps) {
  const used = user.usage.used ?? 0
  const limit = user.usage.limit ?? 0
  const remaining = user.usage.remaining ?? 0

  const percent = limit > 0 ? Math.min((used / limit) * 100, 100) : 0

  const isNearLimit = percent >= 80
  const isMaxed = percent >= 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.tier.name} Plan</CardTitle>
        <CardDescription>Your daily API usage</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        
        {/* Usage Overview */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Usage today</span>
            <span className="font-medium">
              {used.toLocaleString()} / {limit.toLocaleString()}
            </span>
          </div>

          <Progress value={percent} />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.round(percent)}% used</span>
            <span>{remaining.toLocaleString()} remaining</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="flex flex-col gap-2 border-t pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Daily limit</span>
            <span>{limit.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Used today</span>
            <span>{used.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Remaining</span>
            <span>{remaining.toLocaleString()}</span>
          </div>
        </div>

        {/* Soft Upsell (only when relevant) */}
        {(isNearLimit || isMaxed) && (
          <div className="rounded-md border bg-muted/40 p-3 text-sm flex flex-col gap-2">
            <p className="font-medium">
              {isMaxed
                ? "You've reached your daily limit."
                : "You're approaching your daily limit."}
            </p>

            <p className="text-muted-foreground">
              Upgrade your plan to increase your request limits and unlock higher
              nearby search capabilities.
            </p>

            <Link href="/pricing">
              <Button size="sm" className="w-fit">
                View plans
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}