import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    getAuditLog(limit: number): Promise<{
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
    recordMove(data: any): Promise<{
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
