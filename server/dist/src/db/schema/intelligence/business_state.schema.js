"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zentoryBusinessState = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.zentoryBusinessState = (0, pg_core_1.pgTable)('zentory_business_state', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    operatorId: (0, pg_core_1.varchar)('operator_id', { length: 255 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    lastUpdated: (0, pg_core_1.timestamp)('last_updated').defaultNow().notNull(),
    activeStorageUtilization: (0, pg_core_1.integer)('active_storage_utilization').notNull(),
    summary: (0, pg_core_1.jsonb)('summary').$type().notNull(),
    insights: (0, pg_core_1.jsonb)('insights').$type().default([]),
});
//# sourceMappingURL=business_state.schema.js.map