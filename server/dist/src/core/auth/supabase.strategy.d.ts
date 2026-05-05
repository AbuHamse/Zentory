import { ConfigService } from '@nestjs/config';
declare const SupabaseStrategy_base: new (...args: any) => any;
export declare class SupabaseStrategy extends SupabaseStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        userId: any;
        email: any;
        role: any;
    }>;
}
export {};
