import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SupabaseAuthGuard } from '../../core/guards/supabase-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sync')
  @UseGuards(SupabaseAuthGuard)
  async syncProfile(@Req() req) {
    // req.user comes from the SupabaseStrategy validate method
    return await this.authService.syncUserWithDatabase(req.user);
  }
}