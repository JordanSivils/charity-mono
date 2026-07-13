import { Metadata } from "next"
import { HomeHero } from "./components/marketing/home-hero-section"
import { HomeProblemSection } from "./components/marketing/home-problem-section"
import { HomeFeatureGrid } from "./components/marketing/home-feature-grid"
import { HomeUseCases } from "./components/marketing/home-use-cases"
import { HomeCta } from "./components/marketing/home-cta"
import { HomeJsonResponse } from "./json/home-response-json"
import { HomeQuickstart } from "./components/marketing/home-quickstart"
import { HomePricingTeaser } from "./components/marketing/home-pricing"

export const metadata: Metadata = {
  title: "Charity API for IRS Nonprofit Data and Nearby Search",
  description:
    "CharityQuery is a developer-first charity API for IRS nonprofit data, charity search, local charity data, and nearby nonprofit search by ZIP code or latitude/longitude.",
  keywords: [
    "charity API",
    "nonprofit API",
    "IRS nonprofit data API",
    "charity search API",
    "local charity data",
    "nearby charity search",
    "nearby nonprofit search",
    "501c3 API",
    "NTEE code API",
  ],
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <main className="flex flex-col gap-12">
      <HomeHero />
      <HomeQuickstart />
      <HomeProblemSection />
      <HomeFeatureGrid />
      <HomeJsonResponse />
      <HomeUseCases />
      <HomePricingTeaser />
      <HomeCta />
    </main>
  )
}
