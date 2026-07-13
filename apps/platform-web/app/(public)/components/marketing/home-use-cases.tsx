import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const useCases = [
  {
    title: "Local discovery apps",
    description:
      "Surface nearby nonprofits by cause, distance, ZIP code, or geography.",
  },
  {
    title: "Donation platforms",
    description:
      "Help users discover relevant nonprofits before routing them into your donation flow.",
  },
  {
    title: "Research tools",
    description:
      "Analyze nonprofit organizations by classification, location, financial ranges, and metadata.",
  },
]

export function HomeUseCases() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {useCases.map((useCase) => (
        <Card key={useCase.title}>
          <CardHeader>
            <CardTitle>{useCase.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {useCase.description}
          </CardContent>
        </Card>
      ))}
    </section>
  )
}