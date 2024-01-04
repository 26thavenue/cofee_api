ALTER TABLE "order" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "role" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "staff_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "staff" ADD PRIMARY KEY ("id");