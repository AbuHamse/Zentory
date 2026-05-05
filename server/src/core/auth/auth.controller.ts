import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { SupabaseAuthGuard } from '../guards/supabase-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('profile')
  @UseGuards(SupabaseAuthGuard)
  getProfile(@Req() req) {
    // Returns the user info extracted by the strategy
    return req.user;
  }
}