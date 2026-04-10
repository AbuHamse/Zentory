export interface ProductReport {
  sku: string;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
  costOfGoods: number;
  grossProfit: number;
  marginPercent: number;
  returnRate: number; // Critical for "Stop stocking this item" recommendation
  inventoryTurnoverVelocity: number; // 1-10 (How fast it leaves the shelf)
  recommendation?: string; // e.g., "Liquidate Stock" or "Increase Order Vol"
}

export interface CustomReportConfig {
  title: string;
  dataSource: 'Sales' | 'Inventory' | 'Returns' | 'Complaints';
  timeFrame: '7D' | '30D' | '90D' | '1Y';
  visualType: 'Bar' | 'Line' | 'Pie' | 'Table';
  metrics: string[]; // e.g., ["Total Sales", "Profit Margin"]
}