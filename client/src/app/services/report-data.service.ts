import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { ReportSummary, ZentoryBusinessState } from '../shared/models/report-summary.model';
import { ProductReport } from '../shared/models/performance-analytics.model';
import { TimePeriodReport, TrendData } from '../shared/models/trend-analysis.model';
import { ComplaintReport, UserFeedbackReport } from '../shared/models/user-feedback.model';

@Injectable({ providedIn: 'root' })
export class ReportDataService {
  private http = inject(HttpClient);

  // Initializing with null/empty until data is fetched
  private _businessSource = signal<any>(null);
  private _feedbackSource = signal<any>(null);
  private _trendsSource = signal<any>(null);
  private _productSource = signal<any>(null);

  // Public Signals for the UI
  public reportSummary = computed<ReportSummary>(() => this._businessSource()?.ReportSummary?.[0]);
  public businessState = computed<ZentoryBusinessState>(() => this._businessSource()?.ZentoryBusinessState?.[0]);
  public complaintsReports = computed<ComplaintReport[]>(() => this._feedbackSource()?.ComplaintsReports || []);
  public userFeedbackSummary = computed<UserFeedbackReport[]>(() => this._feedbackSource()?.UserFeedbackSummary || []);
  public trendData = computed<TrendData[]>(() => this._trendsSource()?.TrendData || []);
  public timePeriodReports = computed<TimePeriodReport[]>(() => this._trendsSource()?.TimePeriodReport || []);
  public productReports = computed<ProductReport[]>(() => this._productSource()?.ProductReport || []);

  constructor() {
    this.initializeData();
  }

  private async initializeData() {
    // Fetching from /public/data path
    const [business, feedback, trends, products] = await Promise.all([
      firstValueFrom(this.http.get('/data/business-summary.json')),
      firstValueFrom(this.http.get('/data/feedback-logs.json')),
      firstValueFrom(this.http.get('/data/monthly-trends.json')),
      firstValueFrom(this.http.get('/data/product-analytics.json'))
    ]);

    this._businessSource.set(business);
    this._feedbackSource.set(feedback);
    this._trendsSource.set(trends);
    this._productSource.set(products);
  }

  archiveProduct(sku: string) {
    const currentData = { ...this._productSource() };
    if (currentData?.ProductReport) {
      currentData.ProductReport = currentData.ProductReport.filter((p: any) => p.sku !== sku);
      this._productSource.set(currentData);
    }
  }
}