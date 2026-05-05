import { AccountService } from './account.service';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    getMe(req: any): Promise<{
        id: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        currentTask: string;
        stats: {
            unitsPerHour: number;
            accuracyRate: number;
            tasksCompletedToday: number;
            shiftStartTime: string;
        };
        performanceHistory: {
            date: string;
            uph: number;
            accuracy: number;
        }[];
        lastActiveAt: Date;
    }>;
    updateMe(req: any, updateData: any): Promise<{
        id: string;
        name: string;
        role: string;
        status: string;
        currentTask: string;
        stats: {
            unitsPerHour: number;
            accuracyRate: number;
            tasksCompletedToday: number;
            shiftStartTime: string;
        };
        performanceHistory: {
            date: string;
            uph: number;
            accuracy: number;
        }[];
        lastActiveAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
