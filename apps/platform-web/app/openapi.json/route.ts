export async function GET() {
  const res = await fetch("https://api.charityquery.com/docs/openapi.json", {
    cache: "no-store",
  });

  if (!res.ok) {
    return new Response("Failed to load OpenAPI spec", { status: 500 });
  }

  const json = await res.text();

  return new Response(json, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}