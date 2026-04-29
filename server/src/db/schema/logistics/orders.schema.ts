import { pgTable, uuid, varchar, timestamp, jsonb, text } from 'drizzle-orm/pg-core';

export const logisticsOrders = pgTable('logistics_orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderNumber: varchar('order_number', { length: 50 }).unique().notNull(), // e.g., ORD-1002
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  
  // Lifecycle Status
  status: varchar('status', { length: 20 }).default('PENDING').notNull(),
  priority: varchar('priority', { length: 20 }).default('NORMAL').notNull(),

  // Picking/Packing List (JSONB for efficient document-style storage)
  items: jsonb('items').$type<{
    sku: string;
    description: string;
    quantity: number;
    location: string;
    isPicked: boolean;
    isPacked: boolean;
  }[]>().notNull(),

  dateCreated: timestamp('date_created').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});