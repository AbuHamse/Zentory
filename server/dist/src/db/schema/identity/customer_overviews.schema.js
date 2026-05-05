"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerOverviews = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const customers_schema_1 = require("./customers.schema");
exports.customerOverviews = (0, pg_core_1.pgTable)('customer_overviews', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    customerId: (0, pg_core_1.uuid)('customer_id').references(() => customers_schema_1.customers.id).notNull(),
    segment: (0, pg_core_1.varchar)('segment', { length: 50 }).notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).default('Active').notNull(),
    metrics: (0, pg_core_1.jsonb)('metrics').$type().notNull(),
    behavior: (0, pg_core_1.jsonb)('behavior').$type().notNull(),
    internalNotes: (0, pg_core_1.jsonb)('internal_notes').$type().default([]),
    recentActivity: (0, pg_core_1.jsonb)('recent_activity').$type().default([]),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
//# sourceMappingURL=customer_overviews.schema.js.map