import type { Config } from "drizzle-kit";
import  dotenv from "dotenv";
dotenv.config();
 
export default {
  schema: "./src/db/schema/*",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.SUPABASE_DB_CONN_STRING,
  }
} satisfies Config;