"use server";
import { drizzle } from 'drizzle-orm/neon-http';
import { item } from '@/db/schema';
import { eq } from 'drizzle-orm';

// All functions for server actions related to the item table 
export async function getProduct(id: number) { 
    try { 
        // Initalize database connection 
        const db = drizzle(process.env.DATABASE_URL!);
        // Get resposne 
        const response = await db.select().from(item).where(eq(item.id, id))
        console.log(response)

        if (response.length > 0) { 
            return response[0]
        } else { 
            throw Error()
        }

    } catch(error) { 
        // Throw error to wherever is calling this function 
        console.error(error)
        throw Error("Error getting product")
    }
} 