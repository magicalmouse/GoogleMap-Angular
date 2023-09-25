import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { TripDetailsService } from '../../shared/trip-details.service';

import { SelectAddressService } from '../../shared/select-address.service';

@Component({
  selector: 'app-pickup-dialog',
  templateUrl: './pickup-dialog.component.html',
  styleUrls: ['./pickup-dialog.component.css']
})
export class PickupDialogComponent implements OnInit {
  @Output() selectedDate = new EventEmitter<{ selectDate: any, selectTime: any, panelState: any }>();
  @Output() willCallCheckState = new EventEmitter<boolean>();
  @Output() willCallPhone = new EventEmitter<string>();
  @Output() isReturnTrip = new EventEmitter<boolean>();
  @Output() tripType = new EventEmitter<string>();
  

  panel1: boolean = true;
  panel2: boolean = false;
  panel3: boolean = false;
  panelName: string = 'panel1';
  public isNow: boolean = true;

  public willcall: boolean = false;
  private sharedService: SharedService;

  currentDate: Date;
  timeZoneAbbrev: string = '';
  pickupDate: Date;
  pickupTime: any;
  returnTripState: boolean = false;
  willCallCheck: boolean = false;
  isAirport: boolean = false;
  deliveryItems = [
    'Trip Type*',
    'PASSENGER',
    'DELIVERY'
  ]

  selected: string = this.deliveryItems[1];

  constructor(
    private tripDetailsService: TripDetailsService,
    private selectAddressService: SelectAddressService
  ) {
    console.log(this.pickupDate)
    this.selectAddressService.requestRideBtnEnable.subscribe((value) => {
      this.isAirport = value.isAirport;
    })
  }
  

  ngOnInit(): void {
    this.initPickupDateTime()
  }

  public initPickupDateTime(): void {

    const date = new Date();
    date.setMinutes(date.getMinutes());
    this.pickupTime = {
      hours: date.getHours(),
      minutes: Math.ceil(date.getMinutes() / 5) * 5,
      period: date.getHours() >= 12 ? 'PM' : 'AM',
    };

    if (this.pickupTime.minutes === 60) {
      this.pickupTime.minutes = 0;
    }

    if (this.pickupTime.hours > 12) {
      this.pickupTime.hours = this.pickupTime.hours - 12;
    }
    this.currentDate = date;
    this.pickupDate = date;
    // this.timeZoneAbbrev = 'EST';

    // this.timeZoneAbbrev = this.sharedService.getTimeZoneAbbrev(
    //   this.tripDetailsService.zoneId
    // );
    this.tripDetailsService.pickupDate = this.pickupDate;
    this.tripDetailsService.pickupTime = this.pickupTime;
  }
  public displayReturn() {
    this.returnTripState = !this.returnTripState;
    this.isReturnTrip.emit(this.returnTripState);
  }

  public onchangeWillcall() {
    this.willCallCheck = !this.willCallCheck;
    this.willCallCheckState.emit(this.willCallCheck);
  }

  onChangeWillCallPhone(event: any) {
    this.willCallPhone.emit(event.target.value);
  }

  onTripType(event: string) {
    if (event == 'PASSENGER') {
      this.tripType.emit('P');
    } else if (event == 'DELIVERY') {
      this.tripType.emit('D');
    } else {
      this.tripType.emit('T');
    }
  }

  onTabBtn(val: number) {
    switch (val) {
      case 1:
        this.panel1 = true;
        this.panel2 = false;
        this.panel3 = false;
        this.panelName = 'panel1';
        break;
      case 2:
        this.panel1 = false;
        this.panel2 = true;
        this.panel3 = false;
        this.panelName = 'panel2';
        const variables = {
          selectDate: new Date(),
          selectTime: {},
          panelState: 'isNow'
        }
        this.onSelectedDate(variables)
        break;
      case 3:
        this.panel1 = false;
        this.panel2 = false;
        this.panel3 = true;
        this.panelName = 'panel3';
        this.willcall = true;
        break;
    }
  }

  onSelectedDate(variables: { selectDate: Date, selectTime: any, panelState: any }) {
    this.selectedDate.emit(variables);
  }
  

}
