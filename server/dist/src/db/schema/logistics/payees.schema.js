"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payees = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.payees = (0, pg_core_1.pgTable)('payees', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    type: (0, pg_core_1.varchar)('type', { length: 50 }).default('VENDOR'),
    accountNumber: (0, pg_core_1.varchar)('account_number', { length: 100 }),
    contactEmail: (0, pg_core_1.varchar)('contact_email', { length: 255 }),
    address: (0, pg_core_1.text)('address'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
//# sourceMappingURL=payees.schema.js.map