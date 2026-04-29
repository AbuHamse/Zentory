import { pgTable, uuid, varchar, integer, decimal, text, timestamp } from 'drizzle-orm/pg-core';

export const productReports = pgTable('product_reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  sku: varchar('sku', { length: 100 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }),
  
  // Financial Metrics
  unitsSold: integer('units_sold').default(0),
  revenue: decimal('revenue', { precision: 12, scale: 2 }),
  costOfGoods: decimal('cog', { precision: 12, scale: 2 }),
  grossProfit: decimal('gross_profit', { precision: 12, scale: 2 }),
  marginPercent: decimal('margin_percent', { precision: 5, scale: 2 }),
  
  // Velocity Metrics
  returnRate: decimal('return_rate', { precision: 5, scale: 2 }),
  inventoryTurnoverVelocity: integer('velocity'), // 1-10
  
  recommendation: text('recommendation'), // e.g., "Liquidate Stock"
  createdAt: timestamp('created_at').defaultNow(),
});