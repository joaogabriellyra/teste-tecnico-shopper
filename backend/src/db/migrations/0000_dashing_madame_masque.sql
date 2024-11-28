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
	"id" integer PRIMARY KEY DEFAULT floor(random() * 1000000) NOT NULL,
	"customer_id" text NOT NULL,
	"driver_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"origin" text NOT NULL,
	"destination" text NOT NULL,
	"distance" real NOT NULL,
	"duration" text NOT NULL,
	"value" real NOT NULL
);
