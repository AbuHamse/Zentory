import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE } from '../../core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PayeeService {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>
  ) {}

  async findAll() {
    return await this.db.query.customers.findMany(); // Using customers table for payees/vendors
  }

  async findOne(id: string) {
    const payee = await this.db.query.customers.findFirst({
      where: eq(schema.customers.id, id),
    });
    if (!payee) throw new NotFoundException('Payee not found');
    return payee;
  }

  async create(data: any) {
    return await this.db.insert(schema.customers).values(data).returning();
  }
}