"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outboundShipments = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_schema_1 = require("../identity/users.schema");
exports.outboundShipments = (0, pg_core_1.pgTable)('outbound_shipments', {
    id: (0, pg_core_1.varchar)('id', { length: 50 }).primaryKey(),
    trailerId: (0, pg_core_1.varchar)('trailer_id', { length: 100 }).notNull(),
    carrier: (0, pg_core_1.varchar)('carrier', { length: 100 }).notNull(),
    dockDoor: (0, pg_core_1.varchar)('dock_door', { length: 50 }).notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).default('STAGING').notNull(),
    priority: (0, pg_core_1.varchar)('priority', { length: 50 }).default('ROUTINE').notNull(),
    manifest: (0, pg_core_1.jsonb)('manifest').$type().notNull(),
    totalPallets: (0, pg_core_1.integer)('total_pallets').default(0),
    loadedPallets: (0, pg_core_1.integer)('loaded_pallets').default(0),
    scheduledDeparture: (0, pg_core_1.timestamp)('scheduled_departure').notNull(),
    loadingStarted: (0, pg_core_1.timestamp)('loading_started'),
    actualDeparture: (0, pg_core_1.timestamp)('actual_departure'),
    userId: (0, pg_core_1.uuid)('user_id').references(() => users_schema_1.users.id),
    outboundSid: (0, pg_core_1.varchar)('outbound_sid', { length: 100 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=outbound_shipments.schema.js.map