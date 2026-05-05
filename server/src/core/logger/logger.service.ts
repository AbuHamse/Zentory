import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends Logger {
  // Custom method to log warehouse operations for Zentory
  logWarehouseAction(operatorId: string, action: string, details: any) {
    this.log(`[OPERATOR: ${operatorId}] ${action} - ${JSON.stringify(details)}`);
  }
}