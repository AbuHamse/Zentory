import { Logger } from '@nestjs/common';
export declare class AppLogger extends Logger {
    logWarehouseAction(operatorId: string, action: string, details: any): void;
}
