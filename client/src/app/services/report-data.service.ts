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

  // Private signals with strict types for better IDE support and performance
  private _businessSource = signal<{ ReportSummary: ReportSummary[], ZentoryBusinessState: ZentoryBusinessState[] } | null>(null);
  private _feedbackSource = signal<{ ComplaintsReports: ComplaintReport[], UserFeedbackSummary: UserFeedbackReport[] } | null>(null);
  private _trendsSource = signal<{ TrendData: TrendData[], TimePeriodReport: TimePeriodReport[] } | null>(null);
  private _productSource = signal<{ ProductReport: ProductReport[] } | null>(null);

  // Public Signals for the UI
  public reportSummary = computed(() => this._businessSource()?.ReportSummary?.[0]);
  public businessState = computed(() => this._businessSource()?.ZentoryBusinessState?.[0]);
  public complaintsReports = computed(() => this._feedbackSource()?.ComplaintsReports || []);
  public userFeedbackSummary = computed(() => this._feedbackSource()?.UserFeedbackSummary || []);
  public trendData = computed(() => this._trendsSource()?.TrendData || []);
  public timePeriodReports = computed(() => this._trendsSource()?.TimePeriodReport || []);
  public productReports = computed(() => this._productSource()?.ProductReport || []);

  constructor() {
    this.initializeData();
  }

  /**
   * Initial data load from local JSON mock files.
   * Standardizes the fetch sequence for Zentory_OS v0.0.1.
   */
  public async initializeData() {
    try {
      const [business, feedback, trends, products] = await Promise.all([
        firstValueFrom(this.http.get<any>('/data/business-summary.json')),
        firstValueFrom(this.http.get<any>('/data/feedback-logs.json')),
        firstValueFrom(this.http.get<any>('/data/monthly-trends.json')),
        firstValueFrom(this.http.get<any>('/data/product-analytics.json'))
      ]);

      this._businessSource.set(business);
      this._feedbackSource.set(feedback);
      this._trendsSource.set(trends);
      this._productSource.set(products);
      
      console.log('Zentory Intelligence Hub: Data Synchronization Complete.');
    } catch (error) {
      console.error('Zentory System Error: Failed to initialize data streams.', error);
    }
  }

  /**
   * Manual refresh trigger for the UI.
   */
  async refreshData() {
    await this.initializeData();
  }

  /**
   * Removes a product from the local signal state.
   * Note: This only affects the current session until real DB integration.
   */
  archiveProduct(sku: string) {
    const currentData = this._productSource();
    if (currentData?.ProductReport) {
      // Create a fresh reference to ensure signal notification
      this._productSource.set({
        ...currentData,
        ProductReport: currentData.ProductReport.filter(p => p.sku !== sku)
      });
    }
  }
}