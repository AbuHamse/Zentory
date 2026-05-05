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
    private stripeService: StripeService // Injected your service
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

      // If they already exist, we just return the user data
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

      // Trigger Stripe Checkout using your logic
      // NOTE: Ensure your .env has a STRIPE_PRICE_ID
      const priceId = process.env['STRIPE_PRICE_ID'] || 'price_standard_monthly';
      const session = await this.stripeService.createCheckoutSession(
        user.id, 
        user.email, 
        priceId
      );

      return {
        ...newAdmin[0],
        checkoutUrl: session.url // This is what your Angular component needs
      };
    }

    // 2. Logic for WAREHOUSE EMPLOYEES (Remains unchanged)
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