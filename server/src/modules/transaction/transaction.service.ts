import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE } from '../../core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';
import { eq, desc } from 'drizzle-orm';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>
  ) {}

  // Record a new transaction (Pick, Stock Change, or Payment)
  async createTransaction(data: any) {
    return await this.db
      .insert(schema.zentoryBusinessState) // Logging to your BI/State table
      .values({
        ...data,
        createdAt: new Date(),
      })
      .returning();
  }

  // Get recent transactions for the BI Dashboard
  async getRecentActivity(limit = 50) {
    return await this.db.query.zentoryBusinessState.findMany({
      limit,
      orderBy: [desc(schema.zentoryBusinessState.createdAt)],
    });
  }

  // Find transactions by a specific operator
  async getByOperator(operatorId: string) {
    return await this.db.query.zentoryBusinessState.findMany({
      where: eq(schema.zentoryBusinessState.operatorId, operatorId),
      orderBy: [desc(schema.zentoryBusinessState.createdAt)],
    });
  }
}