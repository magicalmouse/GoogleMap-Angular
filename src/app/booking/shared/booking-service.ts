import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BookingService {
    bookingReset = new Subject<any>();
    bookingDataRefresh = new Subject<any>();

    resetBooking(): void {
        this.bookingReset.next();
    }

    refreshbookingData(): void {
        this.bookingDataRefresh.next();
    }
}
