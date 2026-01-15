import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleType, VehicleEntry } from '../../models/vehicle-entry.model';
import { VehicleService } from '../../vehicle.service';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css'],
})
export class NewEntryComponent implements OnInit {
  entryForm!: FormGroup;

  vehicleTypes: VehicleType[] = ['Car', 'Truck', 'Motorcycle'];

  tollMap: Record<VehicleType, number> = {
    Car: 5,
    Truck: 10,
    Motorcycle: 2,
  };

  calculatedToll = 0;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.entryForm = this.fb.group({
      licensePlate: ['', Validators.required],
      vehicleType: ['', Validators.required],
      isGovernment: [false],
      isOfficial: [false],
    });

    // Update toll when vehicle type, isGovernment, or isOfficial changes
    this.entryForm
      .get('vehicleType')
      ?.valueChanges.subscribe(() => this.calculateToll());

    this.entryForm
      .get('isGovernment')
      ?.valueChanges.subscribe(() => this.calculateToll());

    this.entryForm
      .get('isOfficial')
      ?.valueChanges.subscribe(() => this.calculateToll());
  }

  calculateToll(): void {
    const vehicleType = this.entryForm.get('vehicleType')?.value as VehicleType | null;
    const isGovernment = this.entryForm.get('isGovernment')?.value || false;
    const isOfficial = this.entryForm.get('isOfficial')?.value || false;

    if (!vehicleType) {
      this.calculatedToll = 0;
      return;
    }

    // If government or official, toll is 0
    if (isGovernment || isOfficial) {
      this.calculatedToll = 0;
    } else {
      this.calculatedToll = this.tollMap[vehicleType];
    }
  }

  submit(): void {
    if (this.entryForm.invalid) return;

    const formValue = this.entryForm.value;
    const newEntry: any = {
      licensePlate: formValue.licensePlate!,
      vehicleType: formValue.vehicleType!,
      // Include optional fields - backend will default to false if not provided
      ...(formValue.isGovernment && { isGovernment: true }),
      ...(formValue.isOfficial && { isOfficial: true }),
    };

    console.log('POST payload:', newEntry);

    this.vehicleService.addEntry(newEntry as any).subscribe({
      next: (res) => {
        console.log('Created entry:', res);
        this.entryForm.reset();
        this.calculatedToll = 0;
      },
      error: (err) => {
        console.error('POST failed', err);
      },
    });
  }
}
