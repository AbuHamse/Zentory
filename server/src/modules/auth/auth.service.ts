import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE } from '../../core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>
  ) {}

  async syncUserWithDatabase(user: { id: string; email: string; fullName?: string; role?: string }) {
    // 1. Logic for ADMIN / COMPANY (The Payer)
    if (user.role === 'ADMIN') {
      const existingAdmin = await this.db.query.users.findFirst({
        where: eq(schema.users.id, user.id),
      });

      if (existingAdmin) return existingAdmin;

      return await this.db
        .insert(schema.users)
        .values({
          id: user.id,
          email: user.email,
          fullName: user.fullName || '',
          role: 'ADMIN',
          subscriptionStatus: 'none', // Default for Stripe check
          isActive: true,
        })
        .returning();
    }

    // 2. Logic for WAREHOUSE EMPLOYEES (The Workers)
    const existingWorker = await this.db.query.warehouseUsers.findFirst({
      where: eq(schema.warehouseUsers.id, user.id),
    });

    if (existingWorker) return existingWorker;

    return await this.db
      .insert(schema.warehouseUsers)
      .values({
        id: user.id, // Using the "USR-XXXX" format or Supabase ID
        name: user.fullName || 'New Employee',
        role: user.role || 'PICKER',
        status: 'active',
        // Stats are required in your schema, so we initialize them here
        stats: {
          unitsPerHour: 0,
          accuracyRate: 100,
          tasksCompletedToday: 0,
          shiftStartTime: new Date().toISOString(),
        },
      })
      .returning();
  }
}