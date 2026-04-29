import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  getProfile(userId: string) {
    return { id: userId, status: 'Active', settings: {} };
  }
}