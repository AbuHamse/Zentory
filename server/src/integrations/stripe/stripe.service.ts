import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe = require('stripe');

@Injectable()
export class StripeService {
 private stripe: any;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY')!, {
      apiVersion: '2025-01-27' as any,
    });
  }

  async createCheckoutSession(userId: string, email: string, priceId: string) {
    return await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/dashboard?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard?canceled=true`,
      metadata: { userId }, 
    });
  }

  async getCustomerSubscription(email: string) {
    const customers = await this.stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) return null;

    const subscriptions = await this.stripe.subscriptions.list({
      customer: customers.data[0].id,
      status: 'active',
    });

    return subscriptions.data[0] || null;
  }

  async constructEvent(payload: Buffer, sig: string) {
    const secret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET')!;
    return this.stripe.webhooks.constructEvent(payload, sig, secret);
  }
}