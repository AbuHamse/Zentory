import { pgTable, uuid, timestamp, jsonb, integer, varchar } from 'drizzle-orm/pg-core';

export const zentoryBusinessState = pgTable('zentory_business_state', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Added operatorId to fix the 'getByOperator' error
  operatorId: varchar('operator_id', { length: 255 }), 

  // Added createdAt to fix the 'desc(schema.zentoryBusinessState.createdAt)' errors
  createdAt: timestamp('created_at').defaultNow().notNull(),
  
  lastUpdated: timestamp('last_updated').defaultNow().notNull(),
  activeStorageUtilization: integer('active_storage_utilization').notNull(), // Percentage 0-100

  // High-level Financial Summary
  summary: jsonb('summary').$type<{
    totalRevenue: number;
    activeInventoryValue: number;
    activeReturnLoss: number;
    overallProfitMargin: number;
  }>().notNull(),

  // AI/Logic-driven Insights
  insights: jsonb('insights').$type<{
    type: 'Success' | 'Warning' | 'Action';
    message: string;
    impactValue?: string;
  }[]>().default([]),
});