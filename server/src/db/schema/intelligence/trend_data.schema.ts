import { pgTable, uuid, varchar, decimal, timestamp } from 'drizzle-orm/pg-core';

export const trendData = pgTable('trend_data', {
  id: uuid('id').defaultRandom().primaryKey(),
  label: varchar('label', { length: 20 }).notNull(), // e.g., "Jan"
  value: decimal('value', { precision: 12, scale: 2 }).notNull(),
  comparisonValue: decimal('comparison_value', { precision: 12, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow(),
});