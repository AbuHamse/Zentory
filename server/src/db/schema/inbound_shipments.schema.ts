import { pgTable, uuid, varchar, timestamp, integer, jsonb, text } from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const inboundShipments = pgTable('inbound_shipments', {
  id: varchar('id', { length: 50 }).primaryKey(), // e.g., INB-8802
  trailerId: varchar('trailer_id', { length: 100 }).notNull(),
  carrier: varchar('carrier', { length: 100 }).notNull(),
  dockDoor: varchar('dock_door', { length: 50 }).notNull(),
  
  // Status & Priority
  status: varchar('status', { length: 50 }).default('PENDING').notNull(), 
  priority: varchar('priority', { length: 50 }).default('ROUTINE').notNull(),

  // The Manifest (Stored as JSONB for flexibilty)
  manifest: jsonb('manifest').$type<{
    sku: string;
    productName: string;
    expectedQty: number;
    receivedQty: number;
  }[]>().notNull(),

  // Capacity
  totalPallets: integer('total_pallets').default(0),
  unloadedPallets: integer('unloaded_pallets').default(0),
  
  // Timestamps
  eta: timestamp('eta').notNull(),
  arrivalTime: timestamp('arrival_time'),
  unloadStart: timestamp('unload_start'),
  unloadEnd: timestamp('unload_end'),

  // Personnel
  receivedBy: uuid('received_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});