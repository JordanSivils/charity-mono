import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/lib/actions/billing/create-checkout-session";
import { cn } from "@/lib/utils";

type PricingTier = {
  id: string;
  name: string;
  dailyLimit: number;
  resultLimit: number;
  nearbyRadiusMaxMiles: number;
  nearbyResultLimit: number;
  stripePriceId: string | null;
};

type PricingCardProps = {
  tier: PricingTier;
  isLoggedIn: boolean;
  currentTierId?: string | null;
};

const priceByTier: Record<string, string> = {
  FREE: "$0",
  STARTER: "$19",
  PRO: "$49",
  BUSINESS: "$99",
};

const descriptionByTier: Record<string, string> = {
  FREE: "For testing and small personal projects.",
  STARTER: "For small apps and early production usage.",
  PRO: "For growing products with heavier nearby search needs.",
  BUSINESS: "For serious API usage and higher-volume applications.",
};

export function PricingCard({
  tier,
  isLoggedIn,
  currentTierId,
}: PricingCardProps) {
  const isFree = tier.name === "FREE";
  const isCurrentPlan = currentTierId === tier.id;
  const price = priceByTier[tier.name] ?? "Custom";
  const description = descriptionByTier[tier.name] ?? "Custom API access.";

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border bg-card p-5 shadow-sm",
        isCurrentPlan && "border-primary/60 bg-primary/5 ring-1 ring-primary/20"
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">{tier.name}</h2>

          {isCurrentPlan ? (
            <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
              Current plan
            </span>
          ) : tier.name === "GROWTH" ? (
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              Popular
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-sm text-muted-foreground">{description}</p>

        <div className="mt-5">
          <span className="text-3xl font-semibold">{price}</span>
          {!isFree && (
            <span className="text-sm text-muted-foreground"> / month</span>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t pt-5 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Daily requests</span>
          <span>{tier.dailyLimit.toLocaleString()}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Search results</span>
          <span>{tier.resultLimit.toLocaleString()}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Nearby radius</span>
          <span>{tier.nearbyRadiusMaxMiles} mi</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Nearby results</span>
          <span>{tier.nearbyResultLimit.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-6">
        {isCurrentPlan ? (
          <Button className="w-full" type="button" disabled>
            Current plan
          </Button>
        ) : isFree ? (
          <Link href={isLoggedIn ? "/dashboard" : "/sign-up"}>
            <Button variant="outline" className="w-full">
              {isLoggedIn ? "Go to dashboard" : "Start free"}
            </Button>
          </Link>
        ) : isLoggedIn ? (
          <form action={createCheckoutSession.bind(null, tier.id)}>
            <Button className="w-full" type="submit">
              Upgrade to {tier.name}
            </Button>
          </form>
        ) : (
          <Link href="/sign-up">
            <Button className="w-full">Get started</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
