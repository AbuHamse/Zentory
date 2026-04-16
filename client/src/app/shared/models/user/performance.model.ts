export interface PerformanceMetric {
  userId: string;
  userName: string;
  role: 'PICKER' | 'PACKER' | 'SHIPPER';
  totalUnits: number;
  averageUph: number;
  accuracyRate: number; // e.g., 99.5
  
  // The 6 Columns (2-hour intervals)
  intervals: {
    slot: 1 | 2 | 3 | 4 | 5 | 6; // Slot 1 = 0-2hrs, Slot 2 = 2-4hrs, etc.
    units: number;
    status: 'OPTIMAL' | 'BELOW_EXPECTATION' | 'LABOR_SHARE' | 'DOWNTIME';
    refuteContext?: string; // The "Excuse" or explanation
  }[];
}

export interface RefuteClaim {
  id: string;
  userId: string;
  timestamp: string;
  intervalSlot: number;
  category: 'LABOR_SHARE' | 'EQUIPMENT_ISSUE' | 'SAFETY_STOP' | 'MEETING';
  explanation: string;
  status: 'PENDING' | 'APPROVED' | 'DENIED';
}