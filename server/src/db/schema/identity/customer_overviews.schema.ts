import { pgTable, uuid, varchar, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';
import { customers } from './customers.schema';

export const customerOverviews = pgTable('customer_overviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  
  // Segmentation & Status
  segment: varchar('segment', { length: 50 }).notNull(), // VIP, Repeat, etc.
  status: varchar('status', { length: 50 }).default('Active').notNull(),

  // Financial & Engagement Metrics
  metrics: jsonb('metrics').$type<{
    lifetimeValue: number;
    averageOrderValue: number;
    totalOrders: number;
    totalReturns: number;
    loyaltyScore: number;
  }>().notNull(),

  // Behavioral Analytics
  behavior: jsonb('behavior').$type<{
    purchaseFrequencyDays: number;
    lastOrderDate: string;
    preferredCategory: string;
    atRisk: boolean;
  }>().notNull(),

  // Internal CRM Notes
  internalNotes: jsonb('internal_notes').$type<{
    author: string;
    date: string;
    text: string;
  }[]>().default([]),

  // Activity Feed
  recentActivity: jsonb('recent_activity').$type<{
    type: 'Order' | 'Return' | 'Support';
    id: string;
    date: string;
    summary: string;
  }[]>().default([]),

  updatedAt: timestamp('updated_at').defaultNow(),
});