import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OperatorsModule } from '../operators/operators.module';

@Module({
  imports: [OperatorsModule], // Needed to link auth users to operator profiles
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}