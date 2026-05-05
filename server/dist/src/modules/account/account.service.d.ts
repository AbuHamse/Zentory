import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';
export declare class AccountService {
    private db;
    constructor(db: NodePgDatabase<typeof schema>);
    getProfile(userId: string): Promise<{
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
    updateProfile(userId: string, data: any): Promise<{
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
