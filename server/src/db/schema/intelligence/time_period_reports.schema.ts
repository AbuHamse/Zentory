import { pgTable, uuid, varchar, integer, decimal, timestamp } from 'drizzle-orm/pg-core';

export const timePeriodReports = pgTable('time_period_reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  period: varchar('period', { length: 10 }).notNull(), // e.g., "2024-07"
  revenue: decimal('revenue', { precision: 12, scale: 2 }).notNull(),
  ordersCount: integer('orders_count').default(0),
  averageOrderValue: decimal('aov', { precision: 10, scale: 2 }),
  expenses: decimal('expenses', { precision: 12, scale: 2 }),
  netProfit: decimal('net_profit', { precision: 12, scale: 2 }),
  forecastedRevenue: decimal('forecasted_revenue', { precision: 12, scale: 2 }),
  varianceFromLastPeriod: decimal('variance', { precision: 5, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow(),
});