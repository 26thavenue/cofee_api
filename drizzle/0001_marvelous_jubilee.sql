CREATE TABLE IF NOT EXISTS "product-order" (
	"product_id" integer NOT NULL,
	"order_id" integer NOT NULL,
	CONSTRAINT "product-order_product_id_order_id_pk" PRIMARY KEY("product_id","order_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product-order" ADD CONSTRAINT "product-order_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product-order" ADD CONSTRAINT "product-order_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
