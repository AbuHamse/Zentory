export declare class AuthService {
    validateSession(token: string): Promise<{
        valid: boolean;
        userId: string;
    }>;
}
