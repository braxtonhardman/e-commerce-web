"use server";
import { drizzle } from "drizzle-orm/neon-http";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
// All functions for server actions related to the user table 
async function getUser(username: string) { 

    try{ 
        const db = drizzle(process.env.DATABASE_URL!)
        const response = db.select().from(user).where(eq(user.username, username))
    } catch(error) { 
        throw Error("Error getting user")
    }
}

/* 
// Need to figure out how to limit this to only req from website url ( CORS )
async function createUser() { 

}
*/