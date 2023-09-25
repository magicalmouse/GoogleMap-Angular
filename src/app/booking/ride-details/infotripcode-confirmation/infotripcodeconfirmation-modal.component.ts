import { Component,  ViewEncapsulation , Inject, OnInit,     ViewChild,     ElementRef  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectAddressService } from '../../shared/select-address.service';

@Component({
    selector: 'app-infotripcode-confirmation-modal',
    templateUrl: './infotripcode-confirmation-modal.component.html',
    styleUrls: ['./infotripcode-confirmation-modal.component.css'],
})
export class InfoTripCodeModalComponent {
    constructor(
        public selectAddressService: SelectAddressService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    public ngOnInit(): void {
       
    }

}
