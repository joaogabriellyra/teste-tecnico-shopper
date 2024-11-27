ALTER TABLE "rides" DROP CONSTRAINT "rides_driver_id_drivers_id_fk";
--> statement-breakpoint
ALTER TABLE "rides" ALTER COLUMN "distance" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "rides" ALTER COLUMN "value" SET DATA TYPE real;