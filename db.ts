import postgres from 'postgres'
import { drizzle } from "drizzle-orm/postgres-js";

import dotenv from 'dotenv'

dotenv.config()

if(!process.env.SUPABASE_DB_CONN_STRING){
    console.log(process.env.SUPABASE_DB_CONN_STRING);
}
const connectionString = process.env.SUPABASE_DB_CONN_STRING as string

const client = postgres(connectionString)
const db = drizzle(client)

export default db