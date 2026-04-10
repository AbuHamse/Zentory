import { Injectable, signal, computed } from '@angular/core';

import { ReportSummary, ZentoryBusinessState } from '../shared/models/report-summary.model';
import { ProductReport, CustomReportConfig } from '../shared/models/performance-analytics.model';
import { TimePeriodReport, TrendData } from '../shared/models/trend-analysis.model';
import { ComplaintReport, UserFeedbackReport } from '../shared/models/user-feedback.model';

import businessSummary from '../../../assets/data/reports/business-summary.json';
import feedbackLogs from '../../../assets/data/reports/feedback-logs.json';
import monthlyTrends from '../../../assets/data/reports/monthly-trends.json';
import productAnalytics from '../../../assets/data/reports/product-analytics.json';

@Injectable({ providedIn: 'root' })
export class ReportDataService {
  private _businessSource = signal<any>(businessSummary);
  private _feedbackSource = signal<any>(feedbackLogs);
  private _trendsSource = signal<any>(monthlyTrends);
  private _productSource = signal<any>(productAnalytics);

  public reportSummary = computed<ReportSummary>(() => this._businessSource()?.ReportSummary?.[0]);
  public businessState = computed<ZentoryBusinessState>(() => this._businessSource()?.ZentoryBusinessState?.[0]);
  public complaintsReports = computed<ComplaintReport[]>(() => this._feedbackSource()?.ComplaintsReports || []);
  public userFeedbackSummary = computed<UserFeedbackReport[]>(() => this._feedbackSource()?.UserFeedbackSummary || []);
  public trendData = computed<TrendData[]>(() => this._trendsSource()?.TrendData || []);
  public timePeriodReports = computed<TimePeriodReport[]>(() => this._trendsSource()?.TimePeriodReport || []);
  public productReports = computed<ProductReport[]>(() => this._productSource()?.ProductReport || []);

  archiveProduct(sku: string) {
    const currentData = { ...this._productSource() };
    currentData.ProductReport = currentData.ProductReport.filter((p: any) => p.sku !== sku);
    this._productSource.set(currentData);
  }
}