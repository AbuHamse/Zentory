import { pgTable, varchar, integer, timestamp, jsonb, text } from 'drizzle-orm/pg-core';

export const returns = pgTable('returns', {
  id: varchar('id', { length: 50 }).primaryKey(), // RTN-5501
  originalOrderId: varchar('original_order_id', { length: 50 }).notNull(),
  customer: varchar('customer', { length: 255 }).notNull(),
  item: varchar('item', { length: 255 }).notNull(),
  qty: integer('qty').notNull(),
  reason: text('reason').notNull(),
  status: varchar('status', { length: 50 }).notNull(), // Pending Inspection, Restocked, etc.
  disposition: varchar('disposition', { length: 50 }), // Write-off, Return to Stock
  dateReceived: timestamp('date_received').notNull(),
  images: jsonb('images').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow(),
});