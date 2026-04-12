export interface LogisticsAlert {
  id: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  category: 'INVENTORY' | 'ORDER' | 'SAFETY' | 'EQUIPMENT';
  message: string;
  timestamp: string;
  isResolved: boolean;
  relatedId?: string; // SKU or Order ID
}