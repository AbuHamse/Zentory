import { pgTable, uuid, varchar, timestamp, text } from 'drizzle-orm/pg-core';

export const payees = pgTable('payees', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).default('VENDOR'), // VENDOR, CONTRACTOR, UTILITY
  accountNumber: varchar('account_number', { length: 100 }),
  contactEmail: varchar('contact_email', { length: 255 }),
  address: text('address'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});