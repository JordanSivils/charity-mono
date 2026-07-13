"use client"

import { JsonDisplay } from "@/components/ui/json-display"
import { HighlightPre } from "@/components/ui/highlight-pre"

const nearbyResponse = {
  page: 1,
  limit: 3,
  total: 11,
  totalPages: 4,
  next: 2,
  prev: null,
  origin: {
    lat: 34.2237,
    lng: -77.8862,
    source: "zip",
  },
  charities: [
    {
      ein: "010718189",
      name: "Rs And Tc Jervay Foundation Inc",
      city: "Wilmington",
      state: "NC",
      ntee_group: {
        code: "A",
        description: "Arts, Culture and Humanities",
      },
      lat: "34.230768",
      lng: "-77.940127",
      distance_miles: 3.13,
    },
  ],
}

export function HomeJsonResponse() {
  return (
    <div className="flex flex-col gap-4">
      <HighlightPre copy label="Request">
{`fetch("https://api.charityquery.com/nearby?origin_zip=28403&radius=10&fields=ein,name,city,state,ntee_group,distance_miles,lat,lng&limit=3", {
  headers: {
    "x-api-key": "YOUR_API_KEY"
  }
})`}
      </HighlightPre>
        <p className="font-bold text-sm">Response</p>
      <JsonDisplay data={nearbyResponse} />
    </div>
  )
}