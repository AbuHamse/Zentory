import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // This will eventually call Supabase to verify sessions
  async validateSession(token: string) {
    return { valid: true, userId: 'mock-id' };
  }
}