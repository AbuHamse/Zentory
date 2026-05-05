"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFeedbackReports = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.userFeedbackReports = (0, pg_core_1.pgTable)('user_feedback_reports', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    category: (0, pg_core_1.varchar)('category', { length: 50 }).notNull(),
    totalComplaints: (0, pg_core_1.integer)('total_complaints').default(0),
    resolvedCount: (0, pg_core_1.integer)('resolved_count').default(0),
    averageResolutionTimeHrs: (0, pg_core_1.decimal)('avg_resolution_time', { precision: 10, scale: 2 }),
    topComplaintReason: (0, pg_core_1.varchar)('top_complaint_reason', { length: 255 }),
    sentimentTrend: (0, pg_core_1.varchar)('sentiment_trend', { length: 20 }).default('Stable'),
    reportDate: (0, pg_core_1.timestamp)('report_date').defaultNow(),
});
//# sourceMappingURL=feedback_reports.schema.js.map