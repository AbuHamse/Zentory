"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productReports = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.productReports = (0, pg_core_1.pgTable)('product_reports', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    sku: (0, pg_core_1.varchar)('sku', { length: 100 }).notNull(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    category: (0, pg_core_1.varchar)('category', { length: 100 }),
    unitsSold: (0, pg_core_1.integer)('units_sold').default(0),
    revenue: (0, pg_core_1.decimal)('revenue', { precision: 12, scale: 2 }),
    costOfGoods: (0, pg_core_1.decimal)('cog', { precision: 12, scale: 2 }),
    grossProfit: (0, pg_core_1.decimal)('gross_profit', { precision: 12, scale: 2 }),
    marginPercent: (0, pg_core_1.decimal)('margin_percent', { precision: 5, scale: 2 }),
    returnRate: (0, pg_core_1.decimal)('return_rate', { precision: 5, scale: 2 }),
    inventoryTurnoverVelocity: (0, pg_core_1.integer)('velocity'),
    recommendation: (0, pg_core_1.text)('recommendation'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=product_reports.schema.js.map