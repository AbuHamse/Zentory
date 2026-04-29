import { pgTable, uuid, varchar, integer, decimal, text, timestamp } from 'drizzle-orm/pg-core';

export const complaintReports = pgTable('complaint_reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  category: varchar('category', { length: 50 }).notNull(), // Shipping, Quality, etc.
  count: integer('count').default(0).notNull(),
  sentimentScore: integer('sentiment_score').notNull(), // 1-100
  recentFeedback: text('recent_feedback'),
  
  updatedAt: timestamp('updated_at').defaultNow(),
});