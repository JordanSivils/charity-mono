import { BookText, BookType, CircleSlash2, Compass, Filter, Flag, Gavel, ListChecks, ListFilter, Notebook, Rocket, User } from "lucide-react";

export const docsSidebarItems = [
    {
        title: "Getting Started",
        url: "/docs",
        icon: Flag
    },
    {
        title: "Quickstart",
        url: "/docs/quickstart",
        icon: Rocket
    },
    {
        title: "Auth & Limits",
        url: "/docs/authentication-limits",
        icon: User
    },
    {
        title: "Nearby API",
        url: "/docs/nearby-search",
        icon: Compass
    },
    {
        title: "Filtering & Sorting",
        url: "/docs/filter-sort",
        icon: Filter
    },
    {
        title: "Field Selection",
        url: "/docs/fields",
        icon: ListChecks
    },
    {
        title: "Response Format",
        url: "/docs/response-types",
        icon: BookType
    },
    {
        title: "Metadata & IRS Codes",
        url: "/docs/metadata",
        icon: ListFilter
    },
    {
        title: "Error Handling",
        url: "/docs/errors",
        icon: CircleSlash2
    },
    {
        title: "Subsection & Classification",
        url: "/docs/subsection-classification",
        icon: Gavel
    },
    {
        title: "OpenAPI Reference",
        url: "/docs/api-reference",
        icon: Notebook
    },
]