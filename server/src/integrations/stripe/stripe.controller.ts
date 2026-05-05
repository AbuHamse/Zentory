import { Controller, Post, Headers, Req, RawBodyRequest } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') sig: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    const event = await this.stripeService.constructEvent(req.rawBody, sig);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const userId = session.metadata.userId;
      // TODO: Update your Drizzle 'warehouse_users' status to 'premium' or 'active'
      console.log(`Payment success for User: ${userId}`);
    }

    return { received: true };
  }
}