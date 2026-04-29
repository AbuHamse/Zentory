import { pgTable, uuid, varchar, timestamp, integer, decimal, text } from 'drizzle-orm/pg-core';
import { operators } from './operators.schema';
import { payees } from './payees.schema';

export const transactions = pgTable('transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).default('USD'),
  status: varchar('status', { length: 20 }).default('PENDING'), // PENDING, COMPLETED, FAILED
  type: varchar('type', { length: 50 }).notNull(), // INBOUND, OUTBOUND, ADJUSTMENT
  
  // Relationships
  operatorId: uuid('operator_id').references(() => operators.id),
  payeeId: uuid('payee_id').references(() => payees.id),
  
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});