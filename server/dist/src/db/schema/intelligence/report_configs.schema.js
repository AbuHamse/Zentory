"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportConfigs = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.reportConfigs = (0, pg_core_1.pgTable)('report_configs', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    dataSource: (0, pg_core_1.varchar)('data_source', { length: 50 }).notNull(),
    timeFrame: (0, pg_core_1.varchar)('time_frame', { length: 20 }).notNull(),
    visualType: (0, pg_core_1.varchar)('visual_type', { length: 20 }).notNull(),
    metrics: (0, pg_core_1.jsonb)('metrics').$type().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=report_configs.schema.js.map