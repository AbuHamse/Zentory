import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { OperatorsService } from './operators.service';
import { SupabaseAuthGuard } from '../../core/guards/supabase-auth.guard';
import { RolesGuard } from '../../core/guards/roles/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('operators')
@UseGuards(SupabaseAuthGuard, RolesGuard)
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Get('active')
  @Roles('admin', 'manager') // Only higher roles can see the whole floor
  async getActive() {
    return await this.operatorsService.getActiveOperators();
  }

  @Patch(':id/task')
  @Roles('admin', 'manager', 'operator')
  async assignTask(
    @Param('id') id: string, 
    @Body('taskId') taskId: string
  ) {
    return await this.operatorsService.updateOperatorTask(id, taskId);
  }

  @Get(':id/performance')
  @Roles('admin', 'manager')
  async getStats(@Param('id') id: string) {
    return await this.operatorsService.getOperatorPerformance(id);
  }
}