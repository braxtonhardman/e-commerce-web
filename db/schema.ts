import { pgTable, primaryKey, integer, varchar, serial, numeric } from "drizzle-orm/pg-core";

export const user = pgTable('user',{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    first_name: varchar(),
    last_name: varchar(),
    email: varchar(),
    password: varchar() 
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
export const user_permission = pgTable("user_permission", {
        id: serial().primaryKey(),
        user_id: integer("user_id").references(() => user.id), // Explicitly define column name
        permission_id: integer("permission_id").references(() => permission.id), // Explicitly define column name
    },
  );

// 1-M relationship with item table where a item can have many images but an image can belong to one and only one item
export const item_images = pgTable("item_images", {
    id: serial().primaryKey(), 
    item_id: integer("item_id").references(() => item.id),
    image_url: varchar()
});