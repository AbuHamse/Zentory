import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema/operators.schema';
export declare class OperatorsService {
    private db;
    constructor(db: NodePgDatabase<typeof schema>);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any[]>;
}
