"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactions = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const operators_schema_1 = require("../identity/operators.schema");
const payees_schema_1 = require("../logistics/payees.schema");
exports.transactions = (0, pg_core_1.pgTable)('transactions', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    amount: (0, pg_core_1.decimal)('amount', { precision: 12, scale: 2 }).notNull(),
    currency: (0, pg_core_1.varchar)('currency', { length: 10 }).default('USD'),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('PENDING'),
    type: (0, pg_core_1.varchar)('type', { length: 50 }).notNull(),
    operatorId: (0, pg_core_1.uuid)('operator_id').references(() => operators_schema_1.operators.id),
    payeeId: (0, pg_core_1.uuid)('payee_id').references(() => payees_schema_1.payees.id),
    description: (0, pg_core_1.text)('description'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
//# sourceMappingURL=transactions.schema.js.map