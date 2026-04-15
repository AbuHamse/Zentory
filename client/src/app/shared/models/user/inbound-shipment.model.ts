export interface InboundShipment {
  id: string;             // Unique Shipment ID (e.g., INB-8802)
  trailerId: string;      // Physical Trailer plate or ID
  carrier: string;        // Carrier Name (FedEx, DHL, Global)
  dockDoor: string;       // Bay assignment (e.g., DOOR-01 to DOOR-08)
  
  // Logistics Status
  status: 'PENDING' | 'DOCKING' | 'UNLOADING' | 'COMPLETED' | 'REJECTED';
  priority: 'ROUTINE' | 'URGENT' | 'CRITICAL';

  // Tracking Progress
  manifest: {
    sku: string;
    productName: string;
    expectedQty: number;
    receivedQty: number;  // Tracked during the unload process
  }[];

  // Capacity Stats
  totalPallets: number;
  unloadedPallets: number;
  
  // Time Stamps
  eta: string;            // ISO Date
  arrivalTime?: string;   // ISO Date
  unloadStart?: string;
  unloadEnd?: string;

  // Personnel
  receivedBy: string;     // User ID of the operator at the gate
}