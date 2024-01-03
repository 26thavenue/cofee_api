CREATE TABLE IF NOT EXISTS "order" (
	"id" serial NOT NULL,
	"name" text NOT NULL,
	"ordered_at" timestamp,
	"role" text,
	"staff_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"productName" text,
	"price" integer,
	"quantity" integer,
	"order_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staff" (
	"id" serial NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"isAdmin" boolean DEFAULT false
);
