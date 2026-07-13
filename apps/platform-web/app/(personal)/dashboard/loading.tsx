import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="h-6 w-48 animate-pulse rounded-md bg-muted" />
        <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
      </div>

      <Card>
        <CardHeader>
          <div className="h-6 w-40 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-64 animate-pulse rounded-md bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="h-6 w-40 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-10 w-36 animate-pulse rounded-md bg-muted" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="h-6 w-40 animate-pulse rounded-md bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="h-10 w-36 animate-pulse rounded-md bg-muted" />
        </CardContent>
      </Card>
    </div>
  )
}