import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { user, user_permission } from "@/db/schema";
import * as schema from "@/db/schema"
import "dotenv/config"


async function main() { 
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql, { schema });
    const insertedUsers = await db.insert(user).values({first_name: "braxton", last_name: "hardman", email: "on@gmail.com", password: "random"}).returning({userId: user.id})
    const user_id = insertedUsers[0]?.userId; // Extract the userId from the first element

    console.log(user_id);

    if (user_id) {
        await db.insert(user_permission).values({
            user_id: user_id, // Use the extracted integer value directly
            permission_id: 2
        });
    } else {
        console.error("User ID not found. Insertion failed.");
    }


}

main()