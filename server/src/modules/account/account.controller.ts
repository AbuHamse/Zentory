import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { SupabaseAuthGuard } from '../../core/guards/supabase-auth.guard';

@Controller('account')
@UseGuards(SupabaseAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('me')
  getMe(@Req() req) {
    // req.user is populated by our SupabaseStrategy validate() method
    return this.accountService.getProfile(req.user.userId);
  }

  @Patch('update')
  updateMe(@Req() req, @Body() updateData: any) {
    return this.accountService.updateProfile(req.user.userId, updateData);
  }
}