import { Component, ViewEncapsulation, Inject, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
    ModalComponent,
    ModalService,
} from 'src/app/shared/Modal/Modal.service';
import { SharedService } from 'src/app/shared/shared.service';
import { TripDetailsService } from '../../shared/trip-details.service';
import { ExampleHeader } from './example-header.component';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-date-time-select',
    templateUrl: './date-time-select.component.html',
    styleUrls: ['./date-time-select.component.css'],
})

export class DateTimeSelectComponent {
    HOURS: number[] = [];
    MINUTES: number[] = [];
    pickupTime: any = {
        hours: 0,
        minutes: 0,
        period: '',
    };
    timeZoneAbbrev: string = '';
    currentDate: Date = new Date();
    maxDate: Date;
    returnTripState: boolean = false; //diplay or hidden return date-time select
    dateDisplayState: boolean = false;
    isAirport: boolean = false;
    @Input('panelData') panelData: string;
    @Input('pickupNewDate') pickupDate: Date;
    @Input('isPickupAirport') isPickupAirport: boolean;
    @Output() selectedDate = new EventEmitter<{ selectDate: any, selectTime: any, panelState: any }>();

    zoneId: string;
    variables: any;

    formatedDate = '';
    exampleHeader = ExampleHeader;

    warningLessThan45 = false;

    data: any = {
        currentDate: new Date(),
    };
    constructor(
        private tripDetailsService: TripDetailsService,
        private sharedService: SharedService,
        private modalService: ModalService,
        private dialogRef: MatDialogRef<ModalComponent>,
        // @Inject(MAT_DIALOG_DATA) public porps: any
    ) {
        // console.log(this.porps.isPickupAirport)
        // this.isAirport = this.porps.isPickupAirport;
        console.log(this.isAirport)
        if (this.panelData == 'panel1') { !this.dateDisplayState }
        else if (this.panelData == 'panel2') { this.dateDisplayState }
        else if (this.panelData == 'panel3') { this.dateDisplayState }
        const date = new Date();
        date.setMinutes(date.getMinutes());
        let currentHour = date.getHours();
        if (Math.ceil(date.getMinutes() / 5) * 5 > 55) {
            currentHour += 1;
        }
        this.variables = {
            selectDate: new Date,
            selectTime: {
                hours: currentHour >= 13 ? currentHour - 12 : currentHour,
                minutes: Math.ceil(date.getMinutes() / 5) * 5,
                period: date.getHours() >= 12 ? 'PM' : 'AM',
            }
        }
    }

    public ngOnInit(): void {
        console.log(this.HOURS)
        for (let i = 1; i < 14; i++) {
            this.HOURS.push(i);
        }

        for (let i = 0; i < 56; i += 5) {
            this.MINUTES.push(i);
        }
        const dateAfter60Days = new Date(this.currentDate.getTime() + 60 * 24 * 60 * 60 * 1000);
        this.maxDate = dateAfter60Days;

        // this.pickupTime = JSON.parse(JSON.stringify(this.pickupTime));
        // this.timeZoneAbbrev = this.data.timeZoneAbbrev;
        this.pickupDate = this.data.pickupDate;
        this.zoneId = this.tripDetailsService.zoneId;
        this.formatDate(new Date(this.data.pickupDate));
    }

    public displayReturn(): void {
        this.returnTripState = !this.returnTripState;
    }

    public changePeriod(): void {
        this.pickupTime.period === 'AM'
            ? (this.pickupTime.period = 'PM')
            : (this.pickupTime.period = 'AM');
    }
    public formatTimeValue(n: number): string {
        return n < 10 ? `0${n}` : `${n}`;
    }

    public setDateTime(): void {
        this.dialogRef.close({
            pickupTime: this.variables.selectTime,
            pickupDate: this.variables.selectDate,
            reset: false
        });
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

    public resetDateTime(): void {
        const date = new Date()
        this.dialogRef.close({
            pickupTime: {
                hours: date.getHours() >= 13 ? date.getHours() - 12 : date.getHours(),
                minutes: Math.ceil(date.getMinutes() / 5) * 5,
                period: date.getHours() >= 12 ? 'PM' : 'AM',
            },
            pickupDate: date,
            reset: true
        });
    }
    onSelectedDate(variables: { selectDate: Date, selectTime: any, panelState: any }) {
        this.variables = variables
    }
}
