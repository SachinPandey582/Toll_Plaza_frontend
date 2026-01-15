export type VehicleType = 'Car' | 'Truck' | 'Motorcycle';
export type VehicleStatus = 'Paid' | 'Pending' | 'Violation';

export interface VehicleEntry {
  _id?: string; // MongoDB ID
  id?: number; // Legacy support
  licensePlate: string;
  vehicleType: VehicleType;
  timestamp: string;
  tollFee: number;
  status: VehicleStatus;
  isGovernment?: boolean;
  isOfficial?: boolean;
}
