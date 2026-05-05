"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complaintReports = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.complaintReports = (0, pg_core_1.pgTable)('complaint_reports', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    category: (0, pg_core_1.varchar)('category', { length: 50 }).notNull(),
    count: (0, pg_core_1.integer)('count').default(0).notNull(),
    sentimentScore: (0, pg_core_1.integer)('sentiment_score').notNull(),
    recentFeedback: (0, pg_core_1.text)('recent_feedback'),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
//# sourceMappingURL=complaints.schema.js.map