export interface TrendData {
  label: string; // e.g., "Oct", "Nov", "Dec"
  value: number;
  comparisonValue?: number; // For the month-vs-month overlap
}


export interface TimePeriodReport {
  period: string; // e.g., "2026-03"
  revenue: number;
  ordersCount: number;
  averageOrderValue: number;
  expenses: number;
  netProfit: number;
  forecastedRevenue?: number; // The AI-estimated next month value
  varianceFromLastPeriod: number; // The "What Changed?" delta percentage
}