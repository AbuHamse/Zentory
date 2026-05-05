import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SupabaseAuthGuard } from '../../core/guards/supabase-auth.guard';
// import { Public } from '../../core/decorators/public.decorator'; // If you have this

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sync')
  // If the Guard is failing, it's because it expects a JWT that isn't fully ready.
  // For Admin Registration, we use the Body payload sent from Angular.
  async syncProfile(@Body() payload: any) {
    // We pass the full payload (email, fullName, companyName) to the service
    return await this.authService.syncUserWithDatabase(payload);
  }
}