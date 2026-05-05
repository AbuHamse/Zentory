"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operators = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.operators = (0, pg_core_1.pgTable)('operators', {
    id: (0, pg_core_1.uuid)('id').primaryKey().notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).unique().notNull(),
    firstName: (0, pg_core_1.varchar)('first_name', { length: 100 }),
    lastName: (0, pg_core_1.varchar)('last_name', { length: 100 }),
    role: (0, pg_core_1.varchar)('role', { length: 50 }).default('OPERATOR').notNull(),
    isActive: (0, pg_core_1.boolean)('is_active').default(true).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
//# sourceMappingURL=operators.schema.js.map