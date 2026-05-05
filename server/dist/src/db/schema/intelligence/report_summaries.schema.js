"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportSummaries = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.reportSummaries = (0, pg_core_1.pgTable)('report_summaries', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    revenue: (0, pg_core_1.jsonb)('revenue').$type().notNull(),
    inventory: (0, pg_core_1.jsonb)('inventory').$type().notNull(),
    returns: (0, pg_core_1.jsonb)('returns').$type().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
//# sourceMappingURL=report_summaries.schema.js.map