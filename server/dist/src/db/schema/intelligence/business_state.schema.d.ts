export declare const zentoryBusinessState: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "zentory_business_state";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "zentory_business_state";
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
        operatorId: import("drizzle-orm/pg-core").PgColumn<{
            name: "operator_id";
            tableName: "zentory_business_state";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "zentory_business_state";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lastUpdated: import("drizzle-orm/pg-core").PgColumn<{
            name: "last_updated";
            tableName: "zentory_business_state";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        activeStorageUtilization: import("drizzle-orm/pg-core").PgColumn<{
            name: "active_storage_utilization";
            tableName: "zentory_business_state";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        summary: import("drizzle-orm/pg-core").PgColumn<{
            name: "summary";
            tableName: "zentory_business_state";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                totalRevenue: number;
                activeInventoryValue: number;
                activeReturnLoss: number;
                overallProfitMargin: number;
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
                totalRevenue: number;
                activeInventoryValue: number;
                activeReturnLoss: number;
                overallProfitMargin: number;
            };
        }>;
        insights: import("drizzle-orm/pg-core").PgColumn<{
            name: "insights";
            tableName: "zentory_business_state";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                type: "Success" | "Warning" | "Action";
                message: string;
                impactValue?: string;
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
                type: "Success" | "Warning" | "Action";
                message: string;
                impactValue?: string;
            }[];
        }>;
    };
    dialect: "pg";
}>;
