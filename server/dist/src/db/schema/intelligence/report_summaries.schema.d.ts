export declare const reportSummaries: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "report_summaries";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "report_summaries";
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
        revenue: import("drizzle-orm/pg-core").PgColumn<{
            name: "revenue";
            tableName: "report_summaries";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                current: number;
                previous: number;
                growthPercent: number;
                forecastNextMonth: number;
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
                current: number;
                previous: number;
                growthPercent: number;
                forecastNextMonth: number;
            };
        }>;
        inventory: import("drizzle-orm/pg-core").PgColumn<{
            name: "inventory";
            tableName: "report_summaries";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                turnoverRate: number;
                stockValue: number;
                deadStockCount: number;
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
                turnoverRate: number;
                stockValue: number;
                deadStockCount: number;
            };
        }>;
        returns: import("drizzle-orm/pg-core").PgColumn<{
            name: "returns";
            tableName: "report_summaries";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                rate: number;
                lossValue: number;
                topReason: string;
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
                rate: number;
                lossValue: number;
                topReason: string;
            };
        }>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "report_summaries";
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
    };
    dialect: "pg";
}>;
