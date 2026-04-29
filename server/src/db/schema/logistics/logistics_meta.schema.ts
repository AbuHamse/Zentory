import { pgTable, uuid, varchar, decimal, timestamp } from 'drizzle-orm/pg-core';
import { users } from '../identity/users.schema';

export const logisticsMetadata = pgTable('logistics_metadata', {
  id: uuid('id').defaultRandom().primaryKey(),
  assignedPickerId: uuid('assigned_picker_id').references(() => users.id),
  assignedPackerId: uuid('assigned_packer_id').references(() => users.id),
  boxSize: varchar('box_size', { length: 50 }), // e.g., "Box-XL", "Pallet-STD"
  weight: decimal('weight', { precision: 10, scale: 2 }),
  carrier: varchar('carrier', { length: 100 }),
  trackingNumber: varchar('tracking_number', { length: 100 }),
  sealNumber: varchar('seal_number', { length: 100 }), // Crucial for security
  trailerNumber: varchar('trailer_number', { length: 100 }),
  
  createdAt: timestamp('created_at').defaultNow(),
});