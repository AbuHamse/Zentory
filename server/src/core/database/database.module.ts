import { Module, Global } from '@nestjs/common';
import { databaseProvider, DRIZZLE } from './database.provider';

@Global()
@Module({
  providers: [databaseProvider],
  // Export the provider object so the Factory is shared across the app
  exports: [databaseProvider], 
})
export class DatabaseModule {}