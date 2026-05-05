import { ConfigService } from '@nestjs/config';
export declare class StripeService {
    private configService;
    private stripe;
    constructor(configService: ConfigService);
    createCheckoutSession(userId: string, email: string, priceId: string): Promise<any>;
    getCustomerSubscription(email: string): Promise<any>;
    constructEvent(payload: Buffer, sig: string): Promise<any>;
}
