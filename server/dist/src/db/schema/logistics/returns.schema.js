"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returns = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.returns = (0, pg_core_1.pgTable)('returns', {
    id: (0, pg_core_1.varchar)('id', { length: 50 }).primaryKey(),
    originalOrderId: (0, pg_core_1.varchar)('original_order_id', { length: 50 }).notNull(),
    customer: (0, pg_core_1.varchar)('customer', { length: 255 }).notNull(),
    item: (0, pg_core_1.varchar)('item', { length: 255 }).notNull(),
    qty: (0, pg_core_1.integer)('qty').notNull(),
    reason: (0, pg_core_1.text)('reason').notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).notNull(),
    disposition: (0, pg_core_1.varchar)('disposition', { length: 50 }),
    dateReceived: (0, pg_core_1.timestamp)('date_received').notNull(),
    images: (0, pg_core_1.jsonb)('images').$type().default([]),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=returns.schema.js.map