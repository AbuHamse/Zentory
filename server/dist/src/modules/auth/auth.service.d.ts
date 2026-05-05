import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';
export declare class AuthService {
    private db;
    constructor(db: NodePgDatabase<typeof schema>);
    syncUserWithDatabase(user: {
        id: string;
        email: string;
        fullName?: string;
        role?: string;
    }): Promise<{
        id: string;
        email: string;
        fullName: string;
        role: string;
        companyName: string;
        stripeCustomerId: string;
        subscriptionStatus: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | {
        id: string;
        email: string;
        fullName: string;
        role: string;
        companyName: string;
        stripeCustomerId: string;
        subscriptionStatus: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[] | {
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
    } | {
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
    }[]>;
}
