ALTER TABLE "user_permission" DROP CONSTRAINT "user_permission_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_permission" DROP CONSTRAINT "user_permission_permission_id_permission_id_fk";
--> statement-breakpoint
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_user_id_permission_id_pk" PRIMARY KEY("user_id","permission_id");--> statement-breakpoint
ALTER TABLE "user_permission" DROP COLUMN "id";