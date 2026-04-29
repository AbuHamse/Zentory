import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE } from '../../core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema/operators.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class OperatorsService {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>
  ) {}

  async findAll() {
    return await this.db.select().from(schema.operators);
  }

  async findOne(id: string) {
    return await this.db
      .select()
      .from(schema.operators)
      .where(eq(schema.operators.id, id));
  }
}