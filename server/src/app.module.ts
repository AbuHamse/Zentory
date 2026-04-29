import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Root level components
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Core Infrastructure (Shared across the app)
import { AuthModule as CoreAuthModule } from './core/auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { RedisModule } from './core/redis/redis.module';
import { LoggerModule } from './core/logger/logger.module';

// Integrations (Third-party services)
import { StripeModule } from './integrations/stripe/stripe.module';

// Business Modules (Domain Logic)
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { OperatorsModule } from './modules/operators/operators.module';
import { PayeeModule } from './modules/payee/payee.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    // 1. Load environment variables globally (Crucial for Drizzle/Supabase)
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // 2. Core Infrastructure
    DatabaseModule, // The bridge to Supabase
    CoreAuthModule, // Security internals
    RedisModule,    // Fast caching
    LoggerModule,   // System tracking
    
    // 3. External Integrations
    StripeModule,
    
    // 4. Business Domain Modules
    AuthModule,        // The public Auth API
    AccountModule,     // User profile management
    OperatorsModule,   // Warehouse staff logic
    PayeeModule,       // Vendor/Supplier logic
    TransactionModule, // Financial audit trail
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}