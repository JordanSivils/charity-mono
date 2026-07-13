import type { MetadataRoute } from "next";

const baseUrl = "https://charityquery.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/pricing",
    "/contact",
    "/docs",
    "/docs/api-reference",
    "/docs/authentication-limits",
    "/docs/nearby-search",
    "/docs/filter-sort",
    "/docs/fields",
    "/docs/errors",
    "/docs/quickstart",
    "/docs/metadata",
    "/docs/response-types",
    "/docs/subsection-classification",
    "/privacy",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
