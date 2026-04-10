export interface ComplaintReport {
  id: string;
  category: 'Shipping' | 'Product Quality' | 'Support' | 'Accuracy';
  count: number;
  sentimentScore: number; // 1-100
  recentFeedback: string;
}

export interface UserFeedbackReport {
  category: 'Logistics' | 'Product' | 'Packaging' | 'Service';
  totalComplaints: number;
  resolvedCount: number;
  averageResolutionTimeHrs: number;
  topComplaintReason: string;
  sentimentTrend: 'Improving' | 'Declining' | 'Stable';
}