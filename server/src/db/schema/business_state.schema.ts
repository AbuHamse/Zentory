import { pgTable, uuid, timestamp, decimal, jsonb, integer } from 'drizzle-orm/pg-core';

export const zentoryBusinessState = pgTable('zentory_business_state', {
  id: uuid('id').defaultRandom().primaryKey(),
  
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