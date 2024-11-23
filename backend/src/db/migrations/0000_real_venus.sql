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
