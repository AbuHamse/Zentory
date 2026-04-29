import { pgTable, uuid, varchar, timestamp, boolean, text } from 'drizzle-orm/pg-core';

export const logisticsAlerts = pgTable('logistics_alerts', {
  id: uuid('id').defaultRandom().primaryKey(),
  severity: varchar('severity', { length: 20 }).notNull(), // INFO, WARNING, CRITICAL
  category: varchar('category', { length: 20 }).notNull(), // INVENTORY, ORDER, SAFETY, EQUIPMENT
  message: text('message').notNull(),
  
  // Status
  isResolved: boolean('is_resolved').default(false).notNull(),
  
  // Link to relevant entity (Order ID or SKU)
  relatedId: varchar('related_id', { length: 100 }), 

  timestamp: timestamp('timestamp').defaultNow().notNull(),
});