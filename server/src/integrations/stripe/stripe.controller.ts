import { Controller, Post, Headers, Req, RawBodyRequest, Inject } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request } from 'express';
import { DRIZZLE } from '../../core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';
import { eq } from 'drizzle-orm';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema> // Injecting Drizzle to handle the update
  ) {}

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') sig: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    let event;

    try {
      event = await this.stripeService.constructEvent(req.rawBody!, sig);
    } catch (error) {
      console.error(`Webhook Signature Error: ${error}`);
      return { error: 'Webhook Error' };
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const userId = session.metadata.userId;

      // Update the Admin's subscription status in Drizzle
      await this.db
        .update(schema.users)
        .set({ 
          subscriptionStatus: 'active',
          isActive: true 
        })
        .where(eq(schema.users.id, userId));

      console.log(`✅ System Provisioned: User ${userId} is now ACTIVE.`);
    }

    return { received: true };
  }
}