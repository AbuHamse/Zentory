import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';
export declare class TransactionService {
    private db;
    constructor(db: NodePgDatabase<typeof schema>);
    createTransaction(data: any): Promise<{
        id: string;
        createdAt: Date;
        operatorId: string;
        lastUpdated: Date;
        activeStorageUtilization: number;
        summary: {
            totalRevenue: number;
            activeInventoryValue: number;
            activeReturnLoss: number;
            overallProfitMargin: number;
        };
        insights: {
            type: "Success" | "Warning" | "Action";
            message: string;
            impactValue?: string;
        }[];
    }[]>;
    getRecentActivity(limit?: number): Promise<{
        id: string;
        createdAt: Date;
        operatorId: string;
        lastUpdated: Date;
        activeStorageUtilization: number;
        summary: {
            totalRevenue: number;
            activeInventoryValue: number;
            activeReturnLoss: number;
            overallProfitMargin: number;
        };
        insights: {
            type: "Success" | "Warning" | "Action";
            message: string;
            impactValue?: string;
        }[];
    }[]>;
    getByOperator(operatorId: string): Promise<{
        id: string;
        createdAt: Date;
        operatorId: string;
        lastUpdated: Date;
        activeStorageUtilization: number;
        summary: {
            totalRevenue: number;
            activeInventoryValue: number;
            activeReturnLoss: number;
            overallProfitMargin: number;
        };
        insights: {
            type: "Success" | "Warning" | "Action";
            message: string;
            impactValue?: string;
        }[];
    }[]>;
}
