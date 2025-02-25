CREATE TABLE "item" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "item_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar,
	"description" varchar,
	"price" numeric,
	"qoh" numeric
);
--> statement-breakpoint
CREATE TABLE "permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" varchar
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar,
	"last_name" varchar,
	"email" varchar
);
--> statement-breakpoint
CREATE TABLE "user_permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"permission_id" integer
);
--> statement-breakpoint
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_permission_id_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE no action ON UPDATE no action;