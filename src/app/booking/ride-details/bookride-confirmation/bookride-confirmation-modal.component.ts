import { Component,  ViewEncapsulation , Inject, OnInit,     ViewChild,     ElementRef  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectAddressService } from '../../shared/select-address.service';

@Component({
    selector: 'app-bookride-confirmation-modal',
    templateUrl: './bookride-confirmation-modal.component.html',
    styleUrls: ['./bookride-confirmation-modal.component.css'],
})
export class BookRideConfirmationModalComponent {
    callDate: String = '';
    tripNbr: String = '';
    servicingCompany: String = '';
    companyPhone: String = '';
    message: String = '';
    zoneId: String = '';

    pickup: String = '';
    destination: String = '';
    passengerName: String = ''

    confirmationCode: String = '';
    fleet: String = '';

    returnTripNbr: String = '';
    returnServicingCompany: String = '';
    returnCompanyPhone: String = '';
    returnMessage: String = '';
    returnZoneId: String = '';
    returnPickup: String = '';
    returnDestination: String = '';
    returnPassengerName: String = '';
    returnPassengerPhone: string ='';
    returnCallDate: String = '';
    returnConfirmationCode: String = '';
    displayFare: String = '';
    isMobile: boolean;
    comment: String = '';

    isReturn: boolean = false;

    constructor(
        public selectAddressService: SelectAddressService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (window.innerWidth <= 800) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

    public ngOnInit(): void {
        if(this.data.returnTripNbr !== undefined){
            this.isReturn = true;
        }else{
            this.isReturn = false;
        }
        this.confirmationCode = String(this.data.tripNbr);
        this.returnConfirmationCode = String(this.data.returnTripNbr);
        
        this.servicingCompany = (this.data.servicingCompany);
        this.returnServicingCompany = (this.data.returnServicingCompany);
        this.companyPhone = (this.data.passengerPhone);
        this.returnCompanyPhone = (this.data.passengerPhone);
        this.message = (this.data.message);
        this.returnMessage = (this.data.returnMessage);
        this.zoneId = String(this.data.zoneId);
        this.returnZoneId = String(this.data.returnZoneId);

        this.pickup = this.data.pickup;
        this.returnPickup = this.data.returnPickup;
        this.destination = this.data.destination;
        this.returnDestination = this.data.returnDestination;
        this.passengerName = this.data.passengerName;
        this.returnPassengerName = this.data.returnPassengerName;
        this.displayFare = this.data.displayFare.displayFare;
        this.comment = this.data.comment;

        // const isoDate = this.data.callDate;
        // const dateObj = new Date(isoDate);
        // const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        // const day = String(dateObj.getDate()).padStart(2, "0"); // Add leading zero using padStart()
        // const year = dateObj.getFullYear();
        // const formattedDate = `${month}/${day}/${year}`;
        // this.callDate = formattedDate;
        this.callDate = this.data.callDate;
        if (this.callDate == '') {
            this.callDate = 'immediate this.pickup.';
        } else {
            this.callDate = ': ' + this.callDate;
        }
        console.log(this.pickup)
        console.log(this.callDate)

        this.fleet = "(call " + this.data.companyPhone + " to update or cancel)";
        
    }

    public cancelRide(): void {
        // this.selectAddressService.cancelRide(Number(this.tripCode));
    }
}
