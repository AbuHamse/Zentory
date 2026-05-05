"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customers = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.customers = (0, pg_core_1.pgTable)('customers', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).unique().notNull(),
    phone: (0, pg_core_1.varchar)('phone', { length: 50 }).notNull(),
    company: (0, pg_core_1.varchar)('company', { length: 255 }),
    mainBranch: (0, pg_core_1.varchar)('main_branch', { length: 255 }).notNull(),
    joinDate: (0, pg_core_1.timestamp)('join_date').notNull(),
    avatarUrl: (0, pg_core_1.text)('avatar_url'),
    address: (0, pg_core_1.jsonb)('address').$type().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=customers.schema.js.map