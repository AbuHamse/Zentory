"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logisticsOrders = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.logisticsOrders = (0, pg_core_1.pgTable)('logistics_orders', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    orderNumber: (0, pg_core_1.varchar)('order_number', { length: 50 }).unique().notNull(),
    customerName: (0, pg_core_1.varchar)('customer_name', { length: 255 }).notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('PENDING').notNull(),
    priority: (0, pg_core_1.varchar)('priority', { length: 20 }).default('NORMAL').notNull(),
    items: (0, pg_core_1.jsonb)('items').$type().notNull(),
    dateCreated: (0, pg_core_1.timestamp)('date_created').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
//# sourceMappingURL=orders.schema.js.map