"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logisticsAlerts = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.logisticsAlerts = (0, pg_core_1.pgTable)('logistics_alerts', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    severity: (0, pg_core_1.varchar)('severity', { length: 20 }).notNull(),
    category: (0, pg_core_1.varchar)('category', { length: 20 }).notNull(),
    message: (0, pg_core_1.text)('message').notNull(),
    isResolved: (0, pg_core_1.boolean)('is_resolved').default(false).notNull(),
    relatedId: (0, pg_core_1.varchar)('related_id', { length: 100 }),
    timestamp: (0, pg_core_1.timestamp)('timestamp').defaultNow().notNull(),
});
//# sourceMappingURL=alerts.schema.js.map