export interface Shipment {
  id: string;
  company: string; 
  type: 'INBOUND' | 'OUTBOUND';
  carrier: string;
  tracking: string;
  status: 'Pending' | 'In-Transit' | 'Delivered' | 'Delayed';
  itemsExpected: number;
  itemsReceived?: number; 
  origin_destination: string;
  eta: string;
  received: boolean;
  damages?: {
    hasDamage: boolean;
    damagedItems?: number;
    notes?: string;
  };
}