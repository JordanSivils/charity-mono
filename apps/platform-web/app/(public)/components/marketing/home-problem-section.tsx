export function HomeProblemSection() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
      <h2 className="text-2xl font-semibold tracking-tight">
        IRS nonprofit data is powerful, but hard to use
      </h2>

      <p className="text-muted-foreground">
        Raw IRS charity datasets are large, code-heavy, and difficult to query
        without preprocessing, metadata lookups, filtering logic, and location
        enrichment.
      </p>

      <p>
        CharityQuery turns that data into a fast, predictable API with
        developer-friendly filtering, field selection, enriched code responses,
        and nearby nonprofit search.
      </p>
    </section>
  )
}