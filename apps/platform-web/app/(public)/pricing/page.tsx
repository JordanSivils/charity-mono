import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { getTiers } from "@/lib/actions/tier/get-tiers";
import { getOrCreateUser } from "@/lib/actions/user/create-user";
import { PricingCard } from "./components/pricing-card";

export const metadata: Metadata = {
  title: "Charity API Pricing",
  description:
    "Compare CharityQuery plans for IRS nonprofit data, charity search, nearby charity search, filtering, field selection, and API request limits.",
  alternates: {
    canonical: "/pricing",
  },
};

export default async function PricingPage() {
  const { userId } = await auth();
  const tiers = await getTiers();
  const currentUser = userId ? await getOrCreateUser() : null;
  const currentTierId = currentUser?.data.tier?.id ?? null;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <section className="text-center">
        <p className="text-sm font-medium text-primary">Pricing</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Simple plans for building with charity data
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Start free, then upgrade when your project needs more requests,
          larger nearby searches, or higher result limits.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            isLoggedIn={Boolean(userId)}
            currentTierId={currentTierId}
          />
        ))}
      </section>

      <section className="rounded-lg border bg-card p-5 text-sm text-muted-foreground">
        <p>
          All plans include API key access, searchable IRS charity data, field
          selection, filtering, sorting, and nearby search. You can upgrade or
          manage billing from your dashboard at any time.
        </p>
      </section>
    </main>
  );
}
