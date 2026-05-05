import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PayeeService } from './payee.service';
import { SupabaseAuthGuard } from '../../core/guards/supabase-auth.guard';
import { RolesGuard } from '../../core/guards/roles/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('payee')
@UseGuards(SupabaseAuthGuard, RolesGuard)
export class PayeeController {
  constructor(private readonly payeeService: PayeeService) {}

  @Get()
  @Roles('admin', 'manager')
  async getAll() {
    return await this.payeeService.findAll();
  }

  @Post()
  @Roles('admin')
  async createPayee(@Body() data: any) {
    return await this.payeeService.create(data);
  }

  @Get(':id')
  @Roles('admin', 'manager')
  async getOne(@Param('id') id: string) {
    return await this.payeeService.findOne(id);
  }
}