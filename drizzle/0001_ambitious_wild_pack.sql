ALTER TABLE "composers" ALTER COLUMN "c_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "composers" ALTER COLUMN "last_name" SET DATA TYPE varchar(127);--> statement-breakpoint
ALTER TABLE "composers" ALTER COLUMN "first_name" SET DATA TYPE varchar(127);--> statement-breakpoint
ALTER TABLE "works" ALTER COLUMN "title" SET DATA TYPE varchar(255);