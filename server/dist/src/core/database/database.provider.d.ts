import { Pool } from 'pg';
export declare const DRIZZLE = "DRIZZLE";
export declare const databaseProvider: {
    provide: string;
    useFactory: () => import("drizzle-orm/node-postgres").NodePgDatabase<any> & {
        $client: Pool;
    };
};
