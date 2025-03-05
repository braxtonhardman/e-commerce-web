"use server";
import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { item_images } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";

export async function getImage(productId: number) { 
    try { 
        const config = neon(process.env.DATABASE_URL!)
        const db = drizzle(config, {schema})
        const response = await db.select().from(item_images).where(eq(item_images.item_id, productId))
        let imageUrls: string[] = [];
        if(response.length > 0) { 
            for (const item of response) { 
                if(item?.image_url) { 
                    imageUrls?.push(item.image_url);
                }
            }
            return imageUrls
        } else { 
            throw Error("Error getting images from server")
        }
    } catch(error) { 
        return null
    }
}