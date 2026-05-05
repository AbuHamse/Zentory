import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';
export declare class PayeeService {
    private db;
    constructor(db: NodePgDatabase<typeof schema>);
    findAll(): Promise<{
        [x: string]: unknown;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        phone: string;
        company: string;
        mainBranch: string;
        joinDate: Date;
        avatarUrl: string;
        address: {
            city: string;
            provinceState: string;
            postalCode: string;
            country: string;
        };
    }>;
    create(data: any): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        phone: string;
        company: string;
        mainBranch: string;
        joinDate: Date;
        avatarUrl: string;
        address: {
            city: string;
            provinceState: string;
            postalCode: string;
            country: string;
        };
    }[]>;
}
