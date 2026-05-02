import { pgTable, varchar, timestamp, jsonb, text, doublePrecision } from 'drizzle-orm/pg-core';

export const inventory = pgTable('inventory', {
  id: varchar('id', { length: 50 }).primaryKey(), // SKU-10001
  sku: varchar('sku', { length: 100 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }),
  
  // Nested Objects as JSONB
  quantity: jsonb('quantity').$type<{
    onHand: number;
    allocated: number;
    available: number;
    minThreshold: number;
  }>().notNull(),

  location: jsonb('location').$type<{
    zone: string;
    aisle: string;
    rack: string;
    bin: string;
  }>().notNull(),

  dimensions: jsonb('dimensions').$type<{
    length: number;
    width: number;
    height: number;
    unit: string;
  }>(),

  weight: jsonb('weight').$type<{
    value: number;
    unit: string;
  }>(),

  status: varchar('status', { length: 50 }).notNull(), // IN_STOCK, LOW_STOCK, etc.
  lastCounted: timestamp('last_counted'),
  supplier: varchar('supplier', { length: 255 }),
  
  // Tracking Arrays
  pickedBy: jsonb('picked_by').$type<string[]>().default([]),
  recievedBy: jsonb('recieved_by').$type<string[]>().default([]),
  
  createdAt: timestamp('created_at').defaultNow(),
});