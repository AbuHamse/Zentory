"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warehouseUsers = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.warehouseUsers = (0, pg_core_1.pgTable)('warehouse_users', {
    id: (0, pg_core_1.varchar)('id', { length: 50 }).primaryKey().notNull(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    role: (0, pg_core_1.varchar)('role', { length: 50 }).notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).default('active'),
    currentTask: (0, pg_core_1.varchar)('current_task_id', { length: 50 }),
    stats: (0, pg_core_1.jsonb)('stats').$type().notNull(),
    performanceHistory: (0, pg_core_1.jsonb)('performance_history').$type().default([]),
    lastActiveAt: (0, pg_core_1.timestamp)('last_active_at').defaultNow(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
//# sourceMappingURL=warehouse_users.schema.js.map