import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private configService;
    private supabase;
    constructor(configService: ConfigService);
    getSupabaseUser(token: string): Promise<import("@supabase/auth-js").User>;
}
