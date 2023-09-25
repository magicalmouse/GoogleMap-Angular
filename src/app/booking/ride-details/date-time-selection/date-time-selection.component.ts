import { Component, ViewEncapsulation, Inject, OnInit, ViewChild, EventEmitter, ElementRef, Input, Output } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { SharedService } from 'src/app/shared/shared.service';
import { TripDetailsService } from '../../shared/trip-details.service';
import { ExampleHeader } from '../date-time-select/example-header.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectAddressService } from '../../shared/select-address.service';

@Component({
  selector: 'app-date-time-selection',
  templateUrl: './date-time-selection.component.html',
  styleUrls: ['./date-time-selection.component.css']
})
export class DateTimeSelectionComponent implements OnInit {
  HOURS: number[] = [];
  MINUTES: number[] = [];
  timeZoneAbbrev: string = '';
  pickupTime: any;
  currentDate: Date;
  maxDate: Date;
  dateDisplayState: boolean = false;
  pickupDate: Date;
  zoneId: string;
  returnTripState: boolean = false; //diplay or hidden return date-time select
  isAirport: boolean = false;
  @Input('disabled') disabled: boolean;
  @Input('state') panelState: any;
  @Output() selectedDate = new EventEmitter<{ selectDate: any, selectTime: any, panelState: any }>();
  @ViewChild('picker') picker: MatDatepicker<any>;
  formatedDate = '';
  exampleHeader = ExampleHeader;
  result: any;
  isMobile = false;

  warningLessThan45 = false;

  constructor(
    private tripDetailsService: TripDetailsService,
    private sharedService: SharedService,
    private selectAddressService: SelectAddressService,
    // @Inject(MAT_DIALOG_DATA) public porps: any
  ) {
    // this.isAirport = this.porps.isPickupAirport;
    this.isAirport = selectAddressService.isAirport
    if (window.innerWidth <= 800)
      this.isMobile = true
   }
   
  public ngOnInit(): void {
    for (let i = 1; i < 13; i++) {
      this.HOURS.push(i);
    }

    for (let i = 0; i < 56; i += 5) {
      this.MINUTES.push(i);
    }
    this.initPickupDateTime();
    this.zoneId = this.tripDetailsService.zoneId;
    this.formatDate(new Date(this.pickupDate));
    const dateAfter60Days = new Date(this.currentDate.getTime() + 60 * 24 * 60 * 60 * 1000);
    this.maxDate = dateAfter60Days;
  }

  public initPickupDateTime(): void {
    const date = new Date();
    if (this.sharedService.pickupDate > date) {
      this.pickupDate = this.sharedService.pickupDate;
      this.pickupTime = this.sharedService.pickupTime;
    } else {
      date.setMinutes(date.getMinutes());
      let currentHour = date.getHours();
      if (Math.ceil(date.getMinutes() / 5) * 5 > 55) {
          currentHour += 1;
      }
      this.pickupTime = {
        hours: currentHour >= 13 ? currentHour - 12 : currentHour,
        minutes: Math.ceil(date.getMinutes() / 5) * 5,
        period: date.getHours() >= 12 ? 'PM' : 'AM',
      };
      if (this.pickupTime.minutes === 60) {
        this.pickupTime.minutes = 0;
      }
  
      if (this.pickupTime.hours > 12) {
        this.pickupTime.hours = this.pickupTime.hours - 12;
      }
      this.pickupDate = date;
    }
    this.currentDate = date;

    this.timeZoneAbbrev = this.sharedService.getTimeZoneAbbrev(
      this.tripDetailsService.zoneId
    );
    this.tripDetailsService.pickupDate = this.pickupDate;
    this.tripDetailsService.pickupTime = this.pickupTime;
  }

  public changePeriod(): void {
    this.pickupTime.period === 'AM'
      ? (this.pickupTime.period = 'PM')
      : (this.pickupTime.period = 'AM');
    const variables = {
      selectDate: this.pickupDate,
      selectTime: {
        hours: this.pickupTime.hours,
        minutes: this.pickupTime.minutes,
        period: this.pickupTime.period
      },
      panelState: this.panelState
    }
    this.selectedDate.emit(variables);
  }
  public formatTimeValue(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }

  public setDateTime(): void {
    const currentDateUTC = this.sharedService.getCurrentTimeInUTC(
      this.zoneId
    );
    const pickupDateUTC = this.sharedService.convertTimeToUTC(
      this.zoneId,
      new Date(this.pickupDate),
      this.pickupTime
    );

    let currentDate = new Date(currentDateUTC);
    currentDate.setMinutes(currentDate.getMinutes() + 45);
    const pickupDate = new Date(pickupDateUTC);

    if (pickupDate < currentDate) {
      this.warningLessThan45 = true;

    } else {
      this.warningLessThan45 = false;
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const suffix = this.getOrdinalSuffix(day);
    const dayStr = `${day}`;
    this.formatedDate = `${date.toLocaleString('default', { weekday: 'short' })}, ${month} ${dayStr}`;
    return this.formatedDate;
  }

  getOrdinalSuffix(day: number): string {
    const j = day % 10;
    const k = day % 100;
    if (j == 1 && k != 11) {
      return 'st';
    }
    if (j == 2 && k != 12) {
      return 'nd';
    }
    if (j == 3 && k != 13) {
      return 'rd';
    }
    return 'th';
  }

  public getSuffix(dateNum: string): string {
    const num = parseInt(dateNum);
    if (num >= 11 && num <= 13) {
      return 'th';
    }
    switch (num % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  public onDateChanged(sss: any) {
    console.log("==============", sss)
  }

  public modelChanged(date: any) {
    var theDate = new Date(Date.parse(date));
    const localDate = theDate.toLocaleString().split(" ");
  }

  //
  public onDateSelected(event: any) {
    this.pickupDate = event.target.value;
    this.formatedDate = this.formatDate(event.target.value);
    const variables = {
      selectDate: this.pickupDate,
      selectTime: this.pickupTime,
      panelState: this.panelState
    }
    this.selectedDate.emit(variables);
  }

  public onHourChange(event: any) {
    const variables = {
      selectDate: this.pickupDate,
      selectTime: {
        hours: event.value,
        minutes: this.pickupTime.minutes,
        period: this.pickupTime.period
      },
      panelState: this.panelState
    }
    this.selectedDate.emit(variables);
  }

  public onMinChange(event: any) {
    const variables = {
      selectDate: this.pickupDate,
      selectTime: {
        hours: this.pickupTime.hours,
        minutes: event.value,
        period: this.pickupTime.period
      },
      panelState: this.panelState
    }
    this.selectedDate.emit(variables);
  }
}
