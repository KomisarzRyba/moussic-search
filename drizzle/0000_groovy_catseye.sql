CREATE TABLE IF NOT EXISTS "composers" (
	"c_id" varchar(256) PRIMARY KEY NOT NULL,
	"last_name" varchar NOT NULL,
	"first_name" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "works" (
	"w_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"c_id" varchar NOT NULL,
	"imslp_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "works" ADD CONSTRAINT "works_c_id_composers_c_id_fk" FOREIGN KEY ("c_id") REFERENCES "composers"("c_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
