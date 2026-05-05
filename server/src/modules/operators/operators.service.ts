import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE } from '../../core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class OperatorsService {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>
  ) {}

  // Get all operators currently active in the warehouse
  async getActiveOperators() {
    return await this.db.query.warehouseUsers.findMany({
      where: eq(schema.warehouseUsers.role, 'operator'),
    });
  }

  // Assign or update the current pick task for an operator
  async updateOperatorTask(operatorId: string, taskId: string) {
    const result = await this.db
      .update(schema.warehouseUsers)
      .set({ 
        // Using the logic from your Zentory schema
        currentTask: taskId,
        lastActiveAt: new Date() 
      })
      .where(eq(schema.warehouseUsers.id, operatorId))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException('Operator not found');
    }
    return result[0];
  }

  // Get specific performance metrics for the BI dashboard
  async getOperatorPerformance(operatorId: string) {
    // This hooks into the Zentory Business Intelligence logic
    return await this.db.query.warehouseUsers.findFirst({
      where: eq(schema.warehouseUsers.id, operatorId),
      // In a real scenario, you'd join with a 'picks' or 'tasks' table
    });
  }
}