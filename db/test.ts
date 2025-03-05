import "dotenv/config"
import { getImage } from "@/src/app/actions/item_images"
import { getProduct, getAllProducts } from "@/src/app/actions/item"

// id: integer().primaryKey().generatedAlwaysAsIdentity(), // 
// name: varchar(), 
// description: varchar(), 
// price: numeric(),
// qoh: numeric()

async function main() { 
   const response = await getAllProducts()
   console.log(response)
}

main()