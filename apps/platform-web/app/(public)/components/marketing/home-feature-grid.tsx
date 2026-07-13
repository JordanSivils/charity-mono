import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Nearby nonprofit search",
    description:
      "Find nonprofits within a radius using ZIP codes or coordinates, with distance included in each result.",
  },
  {
    title: "Powerful filtering",
    description:
      "Filter by state, ZIP, NTEE codes, IRS classifications, deductibility, financial ranges, geocode status, and more.",
  },
  {
    title: "Field selection",
    description:
      "Request only the fields your app needs for smaller responses and cleaner frontend data handling.",
  },
  {
    title: "Enriched IRS codes",
    description:
      "Many coded fields return readable descriptions, so your app does not need separate lookup tables.",
  },
]

export function HomeFeatureGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {features.map((feature) => (
        <Card key={feature.title}>
          <CardHeader>
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {feature.description}
          </CardContent>
        </Card>
      ))}
    </section>
  )
}