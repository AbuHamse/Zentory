export interface OutboundShipment {
  id: string; // Internal Load ID (e.g., OUT-4402)

  trailerId: string; // Trailer License or Unit Number

  carrier:
    | 'FEDEX'
    | 'UPS'
    | 'DHL'
    | 'AMAZON'
    | 'PRIVATE_FLEET'
    | 'ROBERT'
    | 'PURALATOR'
    | 'DAY & ROSS';

  dockDoor: string; // Assigned Shipping Bay (e.g., S-01 to S-14)

  // Logistics Flow Status

  status: 'STAGING' | 'LOADING' | 'MANIFEST_CLOSED' | 'DEPARTED';

  priority: 'ROUTINE' | 'HOT_LOAD' | 'CRITICAL_CUTOFF';

  // The Load Manifest

  manifest: {
    orderId: string;

    customerName: string;

    totalUnits: number;

    loadedUnits: number; // Tracked as they cross the dock plate

    isHighValue: boolean; // Flags for extra verification
  }[];

  // Capacity Tracking

  totalPallets: number;

  loadedPallets: number;

  // Time Telemetry

  scheduledDeparture: string; // ISO Date (The goal)

  loadingStarted: string; // ISO Date

  actualDeparture: string; // ISO Date

  // Personnel

  UserId: string; // USR ID of the person physically loading

  Outbound_SID: string; // Secondary ID for high-value audit
}
