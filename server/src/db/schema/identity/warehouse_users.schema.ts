import { pgTable, varchar, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const warehouseUsers = pgTable('warehouse_users', {
  // Changed from uuid to varchar to support "USR-XXXX" format
  id: varchar('id', { length: 50 }).primaryKey().notNull(), 
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(), // PICKER, PACKER, etc.
  
  // Changed to varchar to support "ORD-XXXX" format from your JSON
  currentTask: varchar('current_task_id', { length: 50 }), 
  
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