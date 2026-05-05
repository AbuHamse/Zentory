import { RawBodyRequest } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request } from 'express';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';
export declare class StripeController {
    private readonly stripeService;
    private db;
    constructor(stripeService: StripeService, db: NodePgDatabase<typeof schema>);
    handleWebhook(sig: string, req: RawBodyRequest<Request>): Promise<{
        error: string;
        received?: undefined;
    } | {
        received: boolean;
        error?: undefined;
    }>;
}
