// src/app/shared/models/customer.model.ts

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  mainBranch: string;
  joinDate: string;
  avatarUrl?: string;
  address: {
    city: string;
    provinceState: string;
    postalCode: string;
    country: string;
  };
}

export interface CustomerOverview {
  customerId: string;
  segment: 'VIP' | 'Repeat' | 'New' | 'Inactive' | 'At-Risk';
  status: 'Active' | 'Flagged' | 'Archived';
  metrics: {
    lifetimeValue: number;
    averageOrderValue: number;
    totalOrders: number;
    totalReturns: number;
    loyaltyScore: number;
  };
  behavior: {
    purchaseFrequencyDays: number;
    lastOrderDate: string;
    preferredCategory: string;
    atRisk: boolean;
  };
  internalNotes: {
    author: string;
    date: string;
    text: string;
  }[];
  recentActivity: {
    type: 'Order' | 'Return' | 'Support';
    id: string;
    date: string;
    summary: string;
  }[];
}