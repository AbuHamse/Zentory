import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().notNull(), // Links to Supabase Auth (The Admin)
  email: varchar('email', { length: 255 }).unique().notNull(),
  fullName: varchar('full_name', { length: 255 }),
  
  // CORPORATE/ADMIN FIELDS
  role: varchar('role', { length: 50 }).default('ADMIN'), 
  companyName: varchar('company_name', { length: 255 }),
  
  // STRIPE FIELDS (Essential for your billing logic)
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  subscriptionStatus: varchar('subscription_status', { length: 50 }).default('none'), // active, trialing, canceled
  
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});