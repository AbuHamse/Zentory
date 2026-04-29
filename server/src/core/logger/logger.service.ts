import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
  logAction(action: string, metadata?: any) {
    this.log(`[ACTION]: ${action} - ${JSON.stringify(metadata)}`);
  }

  logError(message: string, stack?: string) {
    this.error(message, stack);
  }
}