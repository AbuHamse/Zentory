"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trendData = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.trendData = (0, pg_core_1.pgTable)('trend_data', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    label: (0, pg_core_1.varchar)('label', { length: 20 }).notNull(),
    value: (0, pg_core_1.decimal)('value', { precision: 12, scale: 2 }).notNull(),
    comparisonValue: (0, pg_core_1.decimal)('comparison_value', { precision: 12, scale: 2 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=trend_data.schema.js.map