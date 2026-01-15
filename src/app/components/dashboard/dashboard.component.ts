// import { Component, OnInit } from '@angular/core';
// import { VehicleEntry, VehicleType } from '../../models/vehicle-entry.model';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css'],
// })
// export class DashboardComponent implements OnInit {
//   displayedColumns: string[] = [
//     'licensePlate',
//     'vehicleType',
//     'timestamp',
//     'tollFee',
//     'status',
//   ];

//   vehicleEntries: VehicleEntry[] = [
//     {
//       licensePlate: 'ABC-123',
//       vehicleType: 'Car',
//       timestamp: new Date().toISOString(),
//       tollFee: 50,
//       status: 'Paid',
//     },
//     {
//       licensePlate: 'XYZ-789',
//       vehicleType: 'Truck',
//       timestamp: new Date().toISOString(),
//       tollFee: 150,
//       status: 'Pending',
//     },
//     {
//       licensePlate: 'MOTO-456',
//       vehicleType: 'Motorcycle',
//       timestamp: new Date().toISOString(),
//       tollFee: 25,
//       status: 'Violation',
//     },
//   ];

//   filteredEntries: VehicleEntry[] = [...this.vehicleEntries];

//   searchText = '';
//   selectedVehicleType: VehicleType | 'All' = 'All';

//   vehicleTypes: (VehicleType | 'All')[] = ['All', 'Car', 'Truck', 'Motorcycle'];

//   ngOnInit(): void {
//     this.applyFilters();
//   }

// applyFilters(): void {
//   console.log('Filtering...', this.searchText, this.selectedVehicleType);

//   this.filteredEntries = this.vehicleEntries.filter((entry) => {
//     const matchesPlate = entry.licensePlate
//       .toLowerCase()
//       .includes(this.searchText.toLowerCase());

//     const matchesType =
//       this.selectedVehicleType === 'All' ||
//       entry.vehicleType === this.selectedVehicleType;

//     return matchesPlate && matchesType;
//   });
// }

// }
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicle.service';
import { VehicleEntry, VehicleType } from '../../models/vehicle-entry.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayedColumns = [
    'licensePlate',
    'vehicleType',
    'timestamp',
    'tollFee',
    'status',
    'actions',
  ];

  vehicleEntries: VehicleEntry[] = [];
  filteredEntries: VehicleEntry[] = [];

  searchText = '';
  selectedVehicleType: VehicleType | 'All' = 'All';
  vehicleTypes: (VehicleType | 'All')[] = ['All', 'Car', 'Truck', 'Motorcycle'];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.fetchEntries().subscribe();

    this.vehicleService.entries$.subscribe((entries) => {
      this.vehicleEntries = entries;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredEntries = this.vehicleEntries.filter((entry) => {
      const matchesPlate = entry.licensePlate
        .toLowerCase()
        .includes(this.searchText.toLowerCase());

      const matchesType =
        this.selectedVehicleType === 'All' ||
        entry.vehicleType === this.selectedVehicleType;

      return matchesPlate && matchesType;
    });
  }

  flagAsViolation(entry: VehicleEntry): void {
    const entryId = entry._id || entry.id?.toString();
    if (!entryId) {
      console.error('Entry ID not found', entry);
      alert('Error: Entry ID not found');
      return;
    }

    console.log('Flagging vehicle with ID:', entryId);
    this.vehicleService.updateStatus(entryId, 'Violation').subscribe({
      next: () => {
        console.log('Vehicle flagged as violation');
      },
      error: (err) => {
        console.error('Failed to flag vehicle:', err);
        const errorMessage = err?.error?.message || err?.message || 'Unknown error';
        alert(`Failed to flag vehicle: ${errorMessage}`);
      },
    });
  }

  markAsPaid(entry: VehicleEntry): void {
    const entryId = entry._id || entry.id?.toString();
    if (!entryId) {
      console.error('Entry ID not found', entry);
      alert('Error: Entry ID not found');
      return;
    }

    console.log('Marking as paid with ID:', entryId);
    this.vehicleService.updateStatus(entryId, 'Paid').subscribe({
      next: () => {
        console.log('Vehicle marked as paid');
      },
      error: (err) => {
        console.error('Failed to mark as paid:', err);
        const errorMessage = err?.error?.message || err?.message || 'Unknown error';
        alert(`Failed to update status: ${errorMessage}`);
      },
    });
  }

  markAsPending(entry: VehicleEntry): void {
    const entryId = entry._id || entry.id?.toString();
    if (!entryId) {
      console.error('Entry ID not found', entry);
      alert('Error: Entry ID not found');
      return;
    }

    console.log('Marking as pending with ID:', entryId);
    this.vehicleService.updateStatus(entryId, 'Pending').subscribe({
      next: () => {
        console.log('Vehicle marked as pending');
      },
      error: (err) => {
        console.error('Failed to mark as pending:', err);
        const errorMessage = err?.error?.message || err?.message || 'Unknown error';
        alert(`Failed to update status: ${errorMessage}`);
      },
    });
  }
}
