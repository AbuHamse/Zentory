import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE } from '../../core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';
import { eq } from 'drizzle-orm';
import { StripeService } from '../../integrations/stripe/stripe.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>,
    private stripeService: StripeService 
  ) {}

  async syncUserWithDatabase(user: { 
    id: string; 
    email: string; 
    fullName?: string; 
    companyName?: string; 
    role?: string 
  }) {
    
    // 1. Logic for ADMIN / COMPANY
    if (user.role === 'ADMIN') {
      const existingAdmin = await this.db.query.users.findFirst({
        where: eq(schema.users.id, user.id),
      });

      if (existingAdmin) return existingAdmin;

      // Insert Admin into your PG 'users' table
      const newAdmin = await this.db
        .insert(schema.users)
        .values({
          id: user.id,
          email: user.email,
          fullName: user.fullName || '',
          role: 'ADMIN',
          subscriptionStatus: 'none',
          isActive: true,
        })
        .returning();

      // Using your actual Stripe Price ID from .env
      const priceId = process.env['STRIPE_PRICE_ID'];
      
      if (!priceId) {
        throw new Error('STRIPE_PRICE_ID is missing in server environment');
      }

      const session = await this.stripeService.createCheckoutSession(
        user.id, 
        user.email, 
        priceId
      );

      return {
        ...newAdmin[0],
        checkoutUrl: session.url 
      };
    }

    // 2. Logic for WAREHOUSE EMPLOYEES
    const existingWorker = await this.db.query.warehouseUsers.findFirst({
      where: eq(schema.warehouseUsers.id, user.id),
    });

    if (existingWorker) return existingWorker;

    return await this.db
      .insert(schema.warehouseUsers)
      .values({
        id: user.id,
        name: user.fullName || 'New Employee',
        role: user.role || 'PICKER',
        status: 'active',
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