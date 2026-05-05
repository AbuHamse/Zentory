export declare const customerOverviews: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "customer_overviews";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "customer_overviews";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        customerId: import("drizzle-orm/pg-core").PgColumn<{
            name: "customer_id";
            tableName: "customer_overviews";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        segment: import("drizzle-orm/pg-core").PgColumn<{
            name: "segment";
            tableName: "customer_overviews";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 50;
        }>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "customer_overviews";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 50;
        }>;
        metrics: import("drizzle-orm/pg-core").PgColumn<{
            name: "metrics";
            tableName: "customer_overviews";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                lifetimeValue: number;
                averageOrderValue: number;
                totalOrders: number;
                totalReturns: number;
                loyaltyScore: number;
            };
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                lifetimeValue: number;
                averageOrderValue: number;
                totalOrders: number;
                totalReturns: number;
                loyaltyScore: number;
            };
        }>;
        behavior: import("drizzle-orm/pg-core").PgColumn<{
            name: "behavior";
            tableName: "customer_overviews";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                purchaseFrequencyDays: number;
                lastOrderDate: string;
                preferredCategory: string;
                atRisk: boolean;
            };
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                purchaseFrequencyDays: number;
                lastOrderDate: string;
                preferredCategory: string;
                atRisk: boolean;
            };
        }>;
        internalNotes: import("drizzle-orm/pg-core").PgColumn<{
            name: "internal_notes";
            tableName: "customer_overviews";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                author: string;
                date: string;
                text: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                author: string;
                date: string;
                text: string;
            }[];
        }>;
        recentActivity: import("drizzle-orm/pg-core").PgColumn<{
            name: "recent_activity";
            tableName: "customer_overviews";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                type: "Order" | "Return" | "Support";
                id: string;
                date: string;
                summary: string;
            }[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
                type: "Order" | "Return" | "Support";
                id: string;
                date: string;
                summary: string;
            }[];
        }>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "customer_overviews";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
