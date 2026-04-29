import { Logger } from '@nestjs/common';
export declare class LoggerService extends Logger {
    logAction(action: string, metadata?: any): void;
    logError(message: string, stack?: string): void;
}
