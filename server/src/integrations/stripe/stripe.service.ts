import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe = require('stripe');

@Injectable()
export class StripeService {
  private stripe: any;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY')!);
  }

  async createCheckoutSession(userId: string, email: string, priceId: string) {
    const frontendUrl = process.env['FRONTEND_URL'] || 'http://localhost:4200';

    return await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      // Updated to match your Angular routes
      success_url: `${frontendUrl}/payment/success`,
      cancel_url: `${frontendUrl}/payment/cancel`,
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