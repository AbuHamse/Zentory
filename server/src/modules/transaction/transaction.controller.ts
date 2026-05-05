import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { SupabaseAuthGuard } from '../../core/guards/supabase-auth.guard';
import { RolesGuard } from '../../core/guards/roles/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('transactions')
@UseGuards(SupabaseAuthGuard, RolesGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('audit-log')
  @Roles('admin', 'manager') // Only high-level roles see the full audit trail
  async getAuditLog(@Query('limit') limit: number) {
    return await this.transactionService.getRecentActivity(limit);
  }

  @Post('record')
  @Roles('admin', 'system', 'operator') // System or operators can record moves
  async recordMove(@Body() data: any) {
    return await this.transactionService.createTransaction(data);
  }
}