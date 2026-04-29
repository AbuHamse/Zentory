import { pgTable, uuid, varchar, timestamp, integer, decimal, jsonb } from 'drizzle-orm/pg-core';

export const warehouseUsers = pgTable('warehouse_users', {
  id: uuid('id').primaryKey().notNull(), // Links to Supabase Auth
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(), // PICKER, PACKER, etc.
  currentTaskId: varchar('current_task_id', { length: 50 }), // ID of the order/shipment
  
  // Real-time Stats (Stored as JSONB for rapid dashboard updates)
  stats: jsonb('stats').$type<{
    unitsPerHour: number;
    accuracyRate: number;
    tasksCompletedToday: number;
    shiftStartTime: string;
  }>().notNull(),

  // Performance History (Historical array for charting)
  performanceHistory: jsonb('performance_history').$type<{
    date: string;
    uph: number;
    accuracy: number;
  }[]>().default([]),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});