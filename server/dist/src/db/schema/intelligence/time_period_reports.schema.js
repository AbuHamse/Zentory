"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timePeriodReports = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.timePeriodReports = (0, pg_core_1.pgTable)('time_period_reports', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    period: (0, pg_core_1.varchar)('period', { length: 10 }).notNull(),
    revenue: (0, pg_core_1.decimal)('revenue', { precision: 12, scale: 2 }).notNull(),
    ordersCount: (0, pg_core_1.integer)('orders_count').default(0),
    averageOrderValue: (0, pg_core_1.decimal)('aov', { precision: 10, scale: 2 }),
    expenses: (0, pg_core_1.decimal)('expenses', { precision: 12, scale: 2 }),
    netProfit: (0, pg_core_1.decimal)('net_profit', { precision: 12, scale: 2 }),
    forecastedRevenue: (0, pg_core_1.decimal)('forecasted_revenue', { precision: 12, scale: 2 }),
    varianceFromLastPeriod: (0, pg_core_1.decimal)('variance', { precision: 5, scale: 2 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=time_period_reports.schema.js.map