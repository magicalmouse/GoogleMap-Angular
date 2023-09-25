import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment-timezone';
import { AppInitData } from './app-init.model';
import { UserData } from './user.model';

@Injectable()
export class SharedService {
    showSpinner = false;
    isLoggenIn = false;
    public appUser: UserData;
    title: any = null;
    userId: string = null;
    tripId: string = null;
    ccsiTimeZone: string = 'America/Los_Angeles';
    bnlTimeZone: string = 'America/New_York';
    ccsiTimeZoneAbbrev: string = 'PST';
    bnlTimeZoneAbbrev: string = 'EST';
    newUrl: string = null;
    custId: string = null;
    feetId: string = null;
    username: string = null;
    name: string = null;
    token: string = null;
    isbubble: boolean = true;
    isNow: boolean = true;

    pickupDate: Date = new Date();
    pickupTime: any = {
        hours: 0,
        minutes: 0,
        period: 'AM',
    };

    getData() {
        return localStorage.getItem("url");
    }

    setData(url: string) {
        localStorage.setItem("url", url);
    }

    mobileDialogConfig = {};

    getName() {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username: string) {
        this.username = username;
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
        this.token = token;
    }

    getToken() {
        this.token = localStorage.getItem('token');
        return this.token;
    }

    setUserId() {
        this.userId = 'guest-' + uuid();
        localStorage.setItem('sessionId', this.userId);
    }

    getUserId() {
        console.log(localStorage.getItem('sessionId'))
        this.userId = localStorage.getItem('sessionId');
        return this.userId;
    }

    setTripId(tripId: string) {
        this.tripId = tripId;
    }

    setShowSpinner(value: boolean, title: string) {
        this.title = title;
        this.showSpinner = value;
    }

    formatTime(date: Date) {
        const dt = new Date(date);
        let d =
            this.getAmPmHour(dt) +
            ':' +
            (dt.getMinutes() < 10 ? '0' : '') +
            dt.getMinutes().toString() +
            this.getAmPm(dt);
        return d;
    }

    getAmPmHour(dt: Date) {
        const hour = dt.getHours();
        if (hour === 0) {
            return '12';
        } else if (hour < 13) {
            return hour.toString();
        } else {
            return (hour - 12).toString();
        }
    }

    getAmPm(dt: Date) {
        if (dt.getHours() < 12) {
            return 'am';
        } else {
            return 'pm';
        }
    }

    getCurrentTimeInUTC(zone: string): string {
        const timeZone = zone === 'ccsi' ? this.ccsiTimeZone : this.bnlTimeZone;
        const utcString = moment.tz(timeZone).utc().format();
        return utcString;
    }

    convertTimeToUTC(zone: string, pickupDate: Date, pickupTime: any): string {
        const timeZone = zone === 'ccsi' ? this.ccsiTimeZone : this.bnlTimeZone;
        const year = pickupDate.getFullYear();
        const month = this.formatTimeValue(pickupDate.getMonth() + 1);
        const date = this.formatTimeValue(pickupDate.getDate());
        const period = pickupTime.period;
        let hours = pickupTime.hours;
        hours = this.formatHoursTo24Format(hours, period);
        const minutes = pickupTime.minutes;

        const dateString = `${year}-${month}-${date} ${this.formatTimeValue(
            hours
        )}:${this.formatTimeValue(minutes)}:00`;
        const utcString = moment.tz(dateString, timeZone).utc().format();
        return utcString;
        // const test = moment
        //     .tz('2021-01-01 13:08:00', 'America/Los_Angeles')
        //     .utc()
        //     .format();
    }

    convertDateToUTC(zone: string, pickupDate: Date): string {
        const timeZone = zone === 'ccsi' ? this.ccsiTimeZone : this.bnlTimeZone;
        const year = pickupDate.getFullYear();
        const month = this.formatTimeValue(pickupDate.getMonth() + 1);
        const date = this.formatTimeValue(pickupDate.getDate());

        const dateString = `${year}-${month}-${date}`;
        const utcString = moment.tz(dateString, timeZone).utc().format();
        return utcString;
    }

    formatTimeValue(n: number): string {
        return n < 10 ? `0${n}` : `${n}`;
    }

    formatHoursTo24Format(hours: number, period: string) {
        if (period === 'PM' && hours < 12) {
            return hours + 12;
        }
        return hours;
    }

    getTimeZoneAbbrev(zone: string): string {
        return zone === 'ccsi'
            ? this.ccsiTimeZoneAbbrev
            : this.bnlTimeZoneAbbrev;
    }

    getModalSize() {
        if (window.innerWidth <= 900) {
            return {
                width: '85vw',
                // height: '85vh',
                maxWidth: 'unset',
                maxHeight: 'unset',
            };
        }
        return {};
    }

    getPickupDate(value: boolean) {
        this.isbubble = !value;
    }
}
