import { createClient } from "redis";

let client: ReturnType<typeof createClient> | null = null;

export async function getRedisClient() {
  if (client) return client;

  const url = process.env.REDIS_URL;

  if (!url) {
    throw new Error("Missing REDIS_URL");
  }

  client = createClient({ url });

  client.on("error", (err) => {
    console.error("Redis Client Error", err);
  });

  await client.connect();

  return client;
}