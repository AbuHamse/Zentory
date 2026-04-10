export interface ReportSummary {
  revenue: {
    current: number;
    previous: number;
    growthPercent: number;
    forecastNextMonth: number;
  };
  inventory: {
    turnoverRate: number;
    stockValue: number;
    deadStockCount: number; // For the "Stop stocking this" recommendation
  };
  returns: {
    rate: number;
    lossValue: number;
    topReason: string;
  };
}

export interface ZentoryBusinessState {
  lastUpdated: string;
  summary: {
    totalRevenue: number;
    activeInventoryValue: number;
    activeReturnLoss: number;
    overallProfitMargin: number;
  };
  insights: {
    type: 'Success' | 'Warning' | 'Action';
    message: string;
    impactValue?: string; // e.g., "-$2,400"
  }[];
}