import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
export const pproducts = pgTable('users', {
  id: serial('id').primaryKey(),
  productName: text('productName'),
  phone: varchar('phone', { length: 256 }),
});