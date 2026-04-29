import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // Logic for session validation will go here
  validateUser(payload: any) {
    return payload; 
  }
}