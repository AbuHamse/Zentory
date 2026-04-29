import { pgTable, uuid, varchar, integer, timestamp, decimal, text, jsonb } from 'drizzle-orm/pg-core';

export const inventory = pgTable('inventory', {
  id: varchar('id', { length: 50 }).primaryKey(), // e.g., SKU-99042
  sku: varchar('sku', { length: 100 }).unique().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 50 }).notNull(),

  // QUANTITY DATA (Flattened for performance)
  onHand: integer('on_hand').default(0).notNull(),
  allocated: integer('allocated').default(0).notNull(),
  available: integer('available').default(0).notNull(),
  minThreshold: integer('min_threshold').default(5).notNull(),

  // WAREHOUSE GEOGRAPHY (Flattened)
  zone: varchar('zone', { length: 50 }).notNull(),
  aisle: varchar('aisle', { length: 20 }),
  rack: varchar('rack', { length: 20 }),
  bin: varchar('bin', { length: 20 }),

  // PHYSICAL SPECS (Stored as JSONB since these are rarely queried alone)
  dimensions: jsonb('dimensions').$type<{
    length: number; width: number; height: number; unit: 'cm' | 'in';
  }>(),
  weight: jsonb('weight').$type<{
    value: number; unit: 'kg' | 'lb';
  }>(),

  // STATUS & TRACKING
  status: varchar('status', { length: 50 }).default('IN_STOCK'),
  lastCounted: timestamp('last_counted'),
  supplier: varchar('supplier', { length: 255 }),
  
  // Personnel Arrays (JSONB for string arrays)
  pickedBy: jsonb('picked_by').$type<string[]>().default([]),
  receivedBy: jsonb('received_by_users').$type<string[]>().default([]),

  updatedAt: timestamp('updated_at').defaultNow(),
});