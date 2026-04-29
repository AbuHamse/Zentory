import { pgTable, uuid, timestamp, decimal, jsonb, varchar } from 'drizzle-orm/pg-core';

export const reportSummaries = pgTable('report_summaries', {
  id: uuid('id').defaultRandom().primaryKey(),
  
  // Revenue Stats
  revenue: jsonb('revenue').$type<{
    current: number;
    previous: number;
    growthPercent: number;
    forecastNextMonth: number;
  }>().notNull(),

  // Inventory Health
  inventory: jsonb('inventory').$type<{
    turnoverRate: number;
    stockValue: number;
    deadStockCount: number;
  }>().notNull(),

  // Returns/Loss
  returns: jsonb('returns').$type<{
    rate: number;
    lossValue: number;
    topReason: string;
  }>().notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});