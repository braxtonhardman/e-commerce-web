"use server";
import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { item } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";

type SuccessResponse = {
    message: string;
};
  
type ErrorResponse = {
    error: string;
};

export async function getAllProducts() { 
    // Authentication here
    try { 
        const sql = neon(process.env.DATABASE_URL!);
        const db = drizzle(sql, { schema });
        const response = await db.select().from(item);
        console.log(response)
    } catch(error) { 
        console.error(error)
    }
}

// id: integer().primaryKey().generatedAlwaysAsIdentity(), // 
// name: varchar(), 
// description: varchar(), 
// price: numeric(),
// qoh: numeric()
export async function getProduct(id: number) { 
    try { 
        const sql = neon(process.env.DATABASE_URL!);
        const db = drizzle(sql, { schema });
        const response = await db.select().from(item).where(eq(item.id, id))
        if(response.length > 0) { 
            return {id: response[0].id, name: response[0].name, desc: response[0].description, price: response[0].price}
        }
    } catch(error) { 
        return null
    }
}