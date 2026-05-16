export interface InventoryItem {
  id: string;               // e.g., "SKU-99042"
  sku: string;              // Stock Keeping Unit
  name: string;             // Product Title
  description?: string;     // Short details
  category: 'ELECTRONICS' | 'APPAREL' | 'HARDWARE' | 'FOOD' | 'OTHER' | 'COMPONENTS' | 'KITTED';

  // QUANTITY DATA
  quantity: {
    onHand: number;         // Physical stock in building
    allocated: number;      // Reserved for pending orders
    available: number;      // onHand - allocated (The "Real" number)
    minThreshold: number;   // Trigger for "Low Stock" alert
  };

  // WAREHOUSE GEOGRAPHY
  location: {
    // Added specific zones to match your U-Flow map labels
    zone: "DYNAMIC-LEFT" | "DYNAMIC-RIGHT" | "STATIC-CENTER" | "RECEIVING" | "SHIPPING" | 
          "NORTH-WING" | "SOUTH-WING" | "EAST-WING" | "WEST-WING" | "RETURN-WING" | "DOCKED-WING";
    aisle: string;          // e.g., "A-12"
    rack: string;           // e.g., "04"
    bin: string;            // e.g., "B-01"
  };

  // FINANCIAL DATA
  unitPrice: number;        // For warehouse valuation
  currency: string;         // e.g., "USD"

  // PHYSICAL SPECS (For Logistics/Shipping)
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  weight: {
    value: number;
    unit: 'kg' | 'lb';
  };

  // STATUS & TRACKING
  // ADDED 'ARRIVING' and 'TRANSIT' to fix your component errors
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'DISCONTINUED' | 'ARRIVING' | 'TRANSIT';
  
  lastCounted: string;      // ISO Date for cycle counting
  lastAudit?: string;       // Last time a manager verified the stock
  supplier: string;
  
  // STAFF TRACKING
  pickedBy: string[];       // Array of user names who handled this item
  recievedBy: string[];     // Array of user names who checked this in
}