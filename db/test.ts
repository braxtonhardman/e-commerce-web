import "dotenv/config"
import { getAllProducts, createProduct } from "@/src/app/actions/item"

// id: integer().primaryKey().generatedAlwaysAsIdentity(), // 
// name: varchar(), 
// description: varchar(), 
// price: numeric(),
// qoh: numeric()

async function main() { 
    await getAllProducts()
}

main()