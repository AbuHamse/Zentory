import { pgTable, uuid, varchar, timestamp, text, jsonb } from 'drizzle-orm/pg-core';

export const customers = pgTable('customers', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  company: varchar('company', { length: 255 }),
  mainBranch: varchar('main_branch', { length: 255 }).notNull(),
  joinDate: timestamp('join_date').notNull(),
  avatarUrl: text('avatar_url'),
  
  // Address Object (Flattened or JSONB? Let's use JSONB for easy model mapping)
  address: jsonb('address').$type<{
    city: string;
    provinceState: string;
    postalCode: string;
    country: string;
  }>().notNull(),

  createdAt: timestamp('created_at').defaultNow(),
});