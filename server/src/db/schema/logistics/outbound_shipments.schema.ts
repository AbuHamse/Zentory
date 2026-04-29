import { pgTable, uuid, varchar, timestamp, integer, jsonb, boolean } from 'drizzle-orm/pg-core';
import { users } from '../identity/users.schema';

export const outboundShipments = pgTable('outbound_shipments', {
  id: varchar('id', { length: 50 }).primaryKey(), // e.g., OUT-4402
  trailerId: varchar('trailer_id', { length: 100 }).notNull(),
  carrier: varchar('carrier', { length: 100 }).notNull(),
  dockDoor: varchar('dock_door', { length: 50 }).notNull(),
  
  // Status & Priority
  status: varchar('status', { length: 50 }).default('STAGING').notNull(), 
  priority: varchar('priority', { length: 50 }).default('ROUTINE').notNull(),

  // The Load Manifest (JSONB for multi-order shipments)
  manifest: jsonb('manifest').$type<{
    orderId: string;
    customerName: string;
    totalUnits: number;
    loadedUnits: number;
    isHighValue: boolean;
  }[]>().notNull(),

  // Capacity Tracking
  totalPallets: integer('total_pallets').default(0),
  loadedPallets: integer('loaded_pallets').default(0),
  
  // Time Telemetry
  scheduledDeparture: timestamp('scheduled_departure').notNull(),
  loadingStarted: timestamp('loading_started'),
  actualDeparture: timestamp('actual_departure'),

  // Personnel & Audit
  userId: uuid('user_id').references(() => users.id),
  outboundSid: varchar('outbound_sid', { length: 100 }), // Secondary ID for high-value audit
  
  createdAt: timestamp('created_at').defaultNow(),
});