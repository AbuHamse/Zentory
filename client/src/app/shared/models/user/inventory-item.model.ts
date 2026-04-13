export interface InventoryItem {

  id: string;               // e.g., "SKU-99042"

  sku: string;              // Stock Keeping Unit

  name: string;             // Product Title

  description?: string;     // Short details

  category: 'ELECTRONICS' | 'APPAREL' | 'HARDWARE' | 'FOOD' | 'OTHER';

  

  // QUANTITY DATA

  quantity: {

    onHand: number;         // Physical stock in building

    allocated: number;      // Reserved for pending orders

    available: number;      // onHand - allocated (The "Real" number)

    minThreshold: number;   // Trigger for "Low Stock" alert

  };



  // WAREHOUSE GEOGRAPHY

  location: {

    zone: "NORTH-WING" | "SOUTH-WING" | "EAST-WING" | "WEST-WING"| "RETURN-WING" | "DOCKED-WING" ;

    aisle: string;          // e.g., "A[0-20]"

    rack: string;           // e.g., "04"

    bin: string;            // e.g., "[A-E:[1-5]"

  };



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

  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'DISCONTINUED';

  lastCounted: string;      // ISO Date for cycle counting

  supplier: string;

pickedBy: string[];//string array of users firstname, [5-10 users]

recievedBy:string[];



}