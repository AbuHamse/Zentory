import { pgTable, uuid, varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const reportConfigs = pgTable('report_configs', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  dataSource: varchar('data_source', { length: 50 }).notNull(), // Sales, Inventory, etc.
  timeFrame: varchar('time_frame', { length: 20 }).notNull(),   // 7D, 30D, etc.
  visualType: varchar('visual_type', { length: 20 }).notNull(), // Bar, Line, etc.
  
  metrics: jsonb('metrics').$type<string[]>().notNull(), // e.g., ["Total Sales"]
  
  createdAt: timestamp('created_at').defaultNow(),
});