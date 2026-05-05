"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventory = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.inventory = (0, pg_core_1.pgTable)('inventory', {
    id: (0, pg_core_1.varchar)('id', { length: 50 }).primaryKey(),
    sku: (0, pg_core_1.varchar)('sku', { length: 100 }).notNull().unique(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    description: (0, pg_core_1.text)('description'),
    category: (0, pg_core_1.varchar)('category', { length: 100 }),
    quantity: (0, pg_core_1.jsonb)('quantity').$type().notNull(),
    location: (0, pg_core_1.jsonb)('location').$type().notNull(),
    dimensions: (0, pg_core_1.jsonb)('dimensions').$type(),
    weight: (0, pg_core_1.jsonb)('weight').$type(),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).notNull(),
    lastCounted: (0, pg_core_1.timestamp)('last_counted'),
    supplier: (0, pg_core_1.varchar)('supplier', { length: 255 }),
    pickedBy: (0, pg_core_1.jsonb)('picked_by').$type().default([]),
    recievedBy: (0, pg_core_1.jsonb)('recieved_by').$type().default([]),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=inventory.schema.js.map