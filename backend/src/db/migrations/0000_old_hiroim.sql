CREATE TABLE IF NOT EXISTS "drivers" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"vehicle" text NOT NULL,
	"rating" real NOT NULL,
	"comment" text NOT NULL,
	"rate_per_km" real NOT NULL,
	"km_minimum" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rides" (
	"id" text PRIMARY KEY NOT NULL,
	"customer_id" text NOT NULL,
	"driver_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"origin" text NOT NULL,
	"destination" text NOT NULL,
	"distance" numeric(10, 3) NOT NULL,
	"duration" text NOT NULL,
	"value" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rides" ADD CONSTRAINT "rides_driver_id_drivers_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
