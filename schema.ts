import { pgTable, serial, text, primaryKey , integer, timestamp, boolean} from "drizzle-orm/pg-core";
import {  relations } from 'drizzle-orm';

export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  productName: text('productName'),
  price: integer('price'),
  quantity: integer('quantity'),
  order_id: integer('order_id')
});

export const productRelations = relations(product, ({ many }) => ({
 orders: many(productsOnOrder)
}));

export const staff = pgTable("staff", {
  id: serial("id"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  isAdmin: boolean('isAdmin').default(false),
});

export const staffRelations = relations(staff, ({ many }) => ({
 posts: many(order),
}));

export const order = pgTable("order", {
  id: serial("id"),
  order_name:text('name'),
  customer_name: text("name").notNull(),
  ordered_at: timestamp('ordered_at'),
  status:text("role").$type<"pending" | "completed">(),
  staff_id:integer('staff_id').notNull()
})

export const orderRelations = relations(order, ({ one, many }) => ({
 staff: one(staff, { fields: [order.staff_id], references: [staff.id] }),
 productOrder: many(productsOnOrder)
}));

export const productsOnOrder = pgTable('product-order',{
  productId: integer('product_id').notNull().references(()=> product.id),
  orderId: integer('order_id').notNull().references(()=> order.id),
},
(t) => ({
 pk:primaryKey(t.productId,t.orderId)
})
)

export const productsOnOrderRelations = relations(productsOnOrder, ({ one}) => ({
 product: one(product, { fields: [productsOnOrder.productId], references: [product.id] }),
 order: one(order, { fields: [productsOnOrder.orderId], references: [order.id] }),

}));








