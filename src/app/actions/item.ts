"use server";
import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { item } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { getImage } from "./item_images";

type ProductArray = (ProductType | null)[]; 

 
export async function getAllProducts(): Promise<ProductArray | null> { 
    // Authentication here
    try { 
        const sql = neon(process.env.DATABASE_URL!);
        const db = drizzle(sql, { schema });
        const response = await db.select({id: item.id}).from(item);
        const data = []
        if(response.length > 0) { 
            for(const item of response) { 
                const object = await getProduct(item.id)
                data.push(object)
            }
            return data
        } else { 
            throw Error("Error fetching products")
        }
    } catch(error) { 
        return null
    }
}

// id: integer().primaryKey().generatedAlwaysAsIdentity(), // 
// name: varchar(), 
// description: varchar(), 
// price: numeric(),
// qoh: numeric()

type ProductType = {
    id: number,
    name: string | null,
    desc: string | null,
    price: string | null,
    images: string[] | null
}

export async function getProduct(id: number): Promise<ProductType | null> { 
    try { 
        const sql = neon(process.env.DATABASE_URL!);
        const db = drizzle(sql, { schema });
        const response = await db.select().from(item).where(eq(item.id, id));
        const images = await getImage(id);
        
        if(response.length > 0) { 
            if(images) {
                return {id: response[0].id, name: response[0].name, desc: response[0].description, price: response[0].price, images: images}
            } else { 
                return {id: response[0].id, name: response[0].name, desc: response[0].description, price: response[0].price, images: null}
            }
        } 
        return null
    } catch(error) { 
        return null
    }
}