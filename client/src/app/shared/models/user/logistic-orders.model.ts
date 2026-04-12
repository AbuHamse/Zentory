export interface LogisticsOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  dateCreated: string;
  status: 'PENDING' | 'PICKING' | 'PICKED' | 'PACKING' | 'PACKED' | 'SHIPPED';
  priority: 'LOW' | 'NORMAL' | 'URGENT';
  
  // Items for the Picker/Packer
  items: Array<{
    sku: string;
    description: string;
    quantity: number;
    location: string; // e.g., "Aisle 3 - B12"
    isPicked: boolean;
    isPacked: boolean;
  }>;


}