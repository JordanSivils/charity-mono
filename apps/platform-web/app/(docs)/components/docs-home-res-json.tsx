"use client"
import { JsonDisplay } from "@/components/ui/json-display"

export function DocsHomeResponse()  {
    return (
        <JsonDisplay
        data={
{
    "page": 1,
    "limit": 2,
    "total": 2,
    "totalPages": 1,
    "next": null,
    "prev": null,
    "charities": [
        {
            "ein": "030518244",
            "name": "Episcopal Day School Inc",
            "state": "NC",
            "ntee_code": {
                "code": "B24",
                "description": "Primary, Elementary Schools"
            }
        },
        {
            "ein": "010781234",
            "name": "Moore Free And Charitable Clinic Inc",
            "state": "NC",
            "ntee_code": {
                "code": "E32",
                "description": "Ambulatory Health Center, Community Clinic"
            }
        }
    ]
}
        }
        />
    )
}