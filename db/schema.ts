import { pgTable, integer, varchar, serial, numeric } from "drizzle-orm/pg-core";

export const user = pgTable('user',{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    first_name: varchar(),
    last_name: varchar(),
    email: varchar()
});

export const item = pgTable('item', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(), // 
    name: varchar(), 
    description: varchar(), 
    price: numeric(),
    qoh: numeric()
});

// Permission table 
export const permission = pgTable('permission', {
    id: serial().primaryKey(),  // Auto Incremental primary key 
    value: varchar()
});

// Union table to link users to a permission 
export const user_permission = pgTable('user_permission', {
    id: serial().primaryKey(),
    user_id: integer().references(() => user.id), 
    permission_id: integer().references(() => permission.id)
});

// export const cart = pgTable('cart', {
//     id: serial().primaryKey(), 


// });
