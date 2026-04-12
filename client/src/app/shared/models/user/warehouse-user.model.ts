export interface WarehouseUser {
  id: string;
  name: string;
  role: 'PICKER' | 'PACKER' | 'SHIPPER_RECEIVER' | 'INVENTORY_MANAGER' | 'ADMIN';
  currentTask?: string; // ID of the current order they are working on
  stats: {
    unitsPerHour: number;
    accuracyRate: number; // Percentage
    tasksCompletedToday: number;
    shiftStartTime: string;
  };
  performanceHistory: Array<{
    date: string;
    uph: number;
    accuracy: number;
  }>;
}