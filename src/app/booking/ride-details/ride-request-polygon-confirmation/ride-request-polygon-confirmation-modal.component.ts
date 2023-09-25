import { Component,  ViewEncapsulation , Inject, OnInit,     ViewChild,     ElementRef  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-ride-request-polygon-confirmation-modal',
    templateUrl: './ride-request-polygon-confirmation-modal.component.html',
    styleUrls: ['./ride-request-polygon-confirmation-modal.component.css'],
})
export class RideRequestPolygonConfirmationModalComponent {
    pickupName: String = '';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    public ngOnInit(): void {
        this.pickupName = this.data.pickupName
    }
}
