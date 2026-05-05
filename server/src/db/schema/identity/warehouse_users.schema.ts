import { pgTable, varchar, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const warehouseUsers = pgTable('warehouse_users', {
  id: varchar('id', { length: 50 }).primaryKey().notNull(), // "USR-XXXX"
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(), // PICKER, PACKER, etc.
  
  // Fixing the error: Added status for your 'active' filter
  status: varchar('status', { length: 50 }).default('active'), 

  currentTask: varchar('current_task_id', { length: 50 }), // "ORD-XXXX"
  
  stats: jsonb('stats').$type<{
    unitsPerHour: number;
    accuracyRate: number;
    tasksCompletedToday: number;
    shiftStartTime: string;
  }>().notNull(),

  performanceHistory: jsonb('performance_history').$type<{
    date: string;
    uph: number;
    accuracy: number;
  }[]>().default([]),

  // Fixing the error: Added lastActiveAt
  lastActiveAt: timestamp('last_active_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});