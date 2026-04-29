import { pgTable, uuid, varchar, integer, decimal, timestamp } from 'drizzle-orm/pg-core';

export const userFeedbackReports = pgTable('user_feedback_reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  category: varchar('category', { length: 50 }).notNull(), // Logistics, Product, etc.
  totalComplaints: integer('total_complaints').default(0),
  resolvedCount: integer('resolved_count').default(0),
  averageResolutionTimeHrs: decimal('avg_resolution_time', { precision: 10, scale: 2 }),
  topComplaintReason: varchar('top_complaint_reason', { length: 255 }),
  sentimentTrend: varchar('sentiment_trend', { length: 20 }).default('Stable'), // Improving, Declining

  reportDate: timestamp('report_date').defaultNow(),
});