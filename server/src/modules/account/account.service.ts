import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE } from '../../core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AccountService {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>
  ) {}

  async getProfile(userId: string) {
    const user = await this.db.query.warehouseUsers.findFirst({
      where: eq(schema.warehouseUsers.id, userId),
    });

    if (!user) {
      throw new NotFoundException('User profile not found in Zentory');
    }

    return user;
  }

  async updateProfile(userId: string, data: any) {
    return await this.db
      .update(schema.warehouseUsers)
      .set(data)
      .where(eq(schema.warehouseUsers.id, userId))
      .returning();
  }
}