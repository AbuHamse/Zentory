import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

export const operators = pgTable('operators', {
  id: uuid('id').primaryKey().notNull(), // Matches Supabase Auth UID
  email: varchar('email', { length: 255 }).unique().notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  role: varchar('role', { length: 50 }).default('OPERATOR').notNull(), // ADMIN, MANAGER, OPERATOR
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});