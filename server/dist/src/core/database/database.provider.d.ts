import { Pool } from 'pg';
import * as schema from '../../db/schema';
export declare const DRIZZLE = "DRIZZLE";
export declare const databaseProvider: {
    provide: string;
    useFactory: () => import("drizzle-orm/node-postgres").NodePgDatabase<typeof schema> & {
        $client: Pool;
    };
};
