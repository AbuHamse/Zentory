"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inboundShipments = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_schema_1 = require("../identity/users.schema");
exports.inboundShipments = (0, pg_core_1.pgTable)('inbound_shipments', {
    id: (0, pg_core_1.varchar)('id', { length: 50 }).primaryKey(),
    trailerId: (0, pg_core_1.varchar)('trailer_id', { length: 100 }).notNull(),
    carrier: (0, pg_core_1.varchar)('carrier', { length: 100 }).notNull(),
    dockDoor: (0, pg_core_1.varchar)('dock_door', { length: 50 }).notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).default('PENDING').notNull(),
    priority: (0, pg_core_1.varchar)('priority', { length: 50 }).default('ROUTINE').notNull(),
    manifest: (0, pg_core_1.jsonb)('manifest').$type().notNull(),
    totalPallets: (0, pg_core_1.integer)('total_pallets').default(0),
    unloadedPallets: (0, pg_core_1.integer)('unloaded_pallets').default(0),
    eta: (0, pg_core_1.timestamp)('eta').notNull(),
    arrivalTime: (0, pg_core_1.timestamp)('arrival_time'),
    unloadStart: (0, pg_core_1.timestamp)('unload_start'),
    unloadEnd: (0, pg_core_1.timestamp)('unload_end'),
    receivedBy: (0, pg_core_1.uuid)('received_by').references(() => users_schema_1.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=inbound_shipments.schema.js.map