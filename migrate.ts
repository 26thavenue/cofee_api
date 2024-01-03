import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import dotenv from 'dotenv'

dotenv.config()
// Define a connection string or use an environment variable for your Supabase Postgres connection
const connectionString = process.env.SUPABASE_DB_CONN_STRING as string;

// Ensure that the max option is set to 1 for migration purposes
const migrationClient = postgres(connectionString, { max: 1 });
const db = drizzle(migrationClient);

// Run your migrations, specifying the folder where they are located
// The migrationsFolder should point to the directory where your migration files are stored
migrate(db, { migrationsFolder: './drizzle' }).then(() => {
  console.log('Migrations have been applied successfully.');
  // Don't forget to end your migration client connection
  migrationClient.end();
}).catch((error) => {
  console.error('Migration error:', error);
});