"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').primaryKey().notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).unique().notNull(),
    fullName: (0, pg_core_1.varchar)('full_name', { length: 255 }),
    role: (0, pg_core_1.varchar)('role', { length: 50 }).default('ADMIN'),
    companyName: (0, pg_core_1.varchar)('company_name', { length: 255 }),
    stripeCustomerId: (0, pg_core_1.varchar)('stripe_customer_id', { length: 255 }),
    subscriptionStatus: (0, pg_core_1.varchar)('subscription_status', { length: 50 }).default('none'),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
//# sourceMappingURL=users.schema.js.map