"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logisticsMetadata = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_schema_1 = require("../identity/users.schema");
exports.logisticsMetadata = (0, pg_core_1.pgTable)('logistics_metadata', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    assignedPickerId: (0, pg_core_1.uuid)('assigned_picker_id').references(() => users_schema_1.users.id),
    assignedPackerId: (0, pg_core_1.uuid)('assigned_packer_id').references(() => users_schema_1.users.id),
    boxSize: (0, pg_core_1.varchar)('box_size', { length: 50 }),
    weight: (0, pg_core_1.decimal)('weight', { precision: 10, scale: 2 }),
    carrier: (0, pg_core_1.varchar)('carrier', { length: 100 }),
    trackingNumber: (0, pg_core_1.varchar)('tracking_number', { length: 100 }),
    sealNumber: (0, pg_core_1.varchar)('seal_number', { length: 100 }),
    trailerNumber: (0, pg_core_1.varchar)('trailer_number', { length: 100 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=logistics_meta.schema.js.map