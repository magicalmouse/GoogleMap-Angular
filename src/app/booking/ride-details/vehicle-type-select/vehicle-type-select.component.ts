import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/Modal/Modal.service';

@Component({
    selector: 'app-vehicle-type-select',
    templateUrl: './vehicle-type-select.component.html',
    styleUrls: ['./vehicle-type-select.component.css'],
})
export class VehicleTypeSelectComponent implements OnInit {
    selectedVehicleType: any;
    vehicleTypes: any;
    displayFare: any;
    isNow: any;
    constructor(
        private dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public ngOnInit(): void {
        this.selectedVehicleType = this.data.selectedVehicleType;
        this.vehicleTypes = this.data.vehicleTypes;
        this.displayFare = this.data.displayFare;
        this.isNow = this.data.isNow;
    }

    public selectVehicleType(type: any): void {
        this.dialogRef.close(type);
    }

    public close(): void {
        this.dialogRef.close(this.selectedVehicleType);
    }
}
