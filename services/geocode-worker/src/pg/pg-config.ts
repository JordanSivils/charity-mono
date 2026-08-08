import { Pool } from "pg";
import "dotenv/config"

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DIRECT_DATABASE_URL is not set");
}

const client = new Pool({
    connectionString: connectionString,
    connectionTimeoutMillis: 20000,
    max: 5
});

export default client;
