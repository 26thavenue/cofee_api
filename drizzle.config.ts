import { defineConfig } from 'drizzle-kit'
import  dotenv from "dotenv";
dotenv.config();

export default defineConfig({
 schema: "./schema.ts",
 driver: 'pg',
 out: "./drizzle",
 dbCredentials: {
  connectionString: process.env.SUPABASE_DB_CONN_STRING as string,
},
 verbose: true,
 strict: true,
})
