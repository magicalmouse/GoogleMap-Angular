import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AddressSuggestion } from 'src/app/shared/Address.model';
import {
    APIService,
    GetTripFareResponse,
    Vehicle,
    VehiclesResponse,
} from 'src/app/API.service';
import { Fare } from 'src/app/shared/Fare.model';
import { ModalService } from 'src/app/shared/Modal/Modal.service';
import { SharedService } from 'src/app/shared/shared.service';
import { SelectAddressService } from './select-address.service';
import { isLive } from 'config';

@Injectable()
export class TripDetailsService {
    public fareCalculated = new Subject<any>();
    public gettingFare = new Subject<any>();
    public etaSet = new Subject<any>();
    public tripTimeSet = new Subject<any>();
    public pickupDateTimeChanged = new Subject<any>();
    public zoneIdSetSubscription: Subscription = null;
    public eta: number;
    public tripTime: number;
    public showFareSpinner = false;
    public fare: Fare = null;
    public pickupDate: Date;
    public pickupTime: any;
    public isNow = true;
    public zoneId = 'ccsi';


    constructor(
        private api: APIService,
        private selectAddressService: SelectAddressService,
        private http: HttpClient,
        private sharedService: SharedService,
        private modalService: ModalService
    ) {
        this.zoneIdSetSubscription =
            this.selectAddressService.zoneIdSet.subscribe((zone: string) => {
                this.setZoneId(zone);
            });
    }

    // START third getPrice // ASE
    getPrice(): void {

    }
    // END third getPrice

    // START second getFare
    getFare(): void {
        this.clearFare();
        this.showFareSpinner = true;
        if (
            this.selectAddressService.pickupAddress &&
            this.selectAddressService.dropOffAddress &&
            this.selectAddressService.pickupInServiceArea
        ) {
            this.gettingFare.next();
            let date;
            if (this.isNow) {
                date = this.sharedService.getCurrentTimeInUTC(this.zoneId);
            } else {
                date = this.sharedService.convertTimeToUTC(
                    this.zoneId,
                    this.pickupDate,
                    this.pickupTime
                );
            }

            const pickupAddress = this.selectAddressService.pickupAddress;
            const dropoffAddress = this.selectAddressService.dropOffAddress;

            const departureDate = date;
            // const pkupStreet =
            //     pickupAddress.address.houseNumber +
            //     ' ' +
            //     pickupAddress.address.street;
            const pkupStrNbr = isNaN(parseInt(pickupAddress.address.houseNumber)) ? 0 : parseInt(pickupAddress.address.houseNumber);
            const pkupStrName = pickupAddress.address.street == undefined ? "" : pickupAddress.address.street;
            const pkupApt = ' '; // ! need to set this
            const pkupCity = pickupAddress.address.city;
            var pkupState = pickupAddress.address.state;
            if (pkupState == "California")
                pkupState = "CA";

            const pkupZip = pickupAddress.address.postalCode.split('-')[0];
            var pkupLat = pickupAddress.lat;
            var pkupLon = pickupAddress.lng;

            const strAccountNbr = this.sharedService.custId;

            // rounded number to 5
            // pkupLat = parseFloat(pkupLat.toFixed(5));
            // pkupLon = parseFloat(pkupLon.toFixed(5));


            // const destStreet =
            //     dropoffAddress.address.houseNumber +
            //     ' ' +
            //     dropoffAddress.address.street;
            const destStrNbr = parseInt(dropoffAddress.address.houseNumber);
            const destStrName = dropoffAddress.address.street;
            const destApt = ' '; // ! need to set this
            const destCity = dropoffAddress.address.city;
            var destState = dropoffAddress.address.state;
            if (destState == "California")
                destState = "CA";

            const destZip = dropoffAddress.address.postalCode.split('-')[0];
            var destLat = dropoffAddress.lat;
            var destLon = dropoffAddress.lng;

            // rounded number to 5
            // destLat = parseFloat(destLat.toFixed(5));
            // destLon = parseFloat(destLon.toFixed(5));

            const tripType = 'P'; // ! need to set this depending on if wheelchair trip or regular trip
            const userId = this.sharedService.userId; // ! change this
            const source = '9994'; // ! need to figure out which code to use for this. Talk to Shan && Chad

            // this.sharedService.setShowSpinner(true);
            this.api
                .GetFarePrice(
                    departureDate,
                    pkupStrNbr,
                    pkupStrName,
                    pkupApt,
                    pkupCity,
                    pkupState,
                    pkupZip,
                    pkupLat,
                    pkupLon,
                    destStrNbr,
                    destStrName,
                    destApt,
                    destCity,
                    destState,
                    destZip,
                    destLat,
                    destLon,
                    userId,
                    source,
                    tripType,
                    strAccountNbr,
                    isLive
                )
                .then((response: GetTripFareResponse) => {
                    if (response.error) {
                        this.modalService.openModal(
                            'Something went wrong. Please try again',
                            null,
                            false
                        );
                    } else {
                        this.fare = response.data;
                        if (this.fare.error != null) {

                            this.modalService.openModal(
                                'Something went wrong. Please try again',
                                null,
                                false
                            );
                        }


                        if (this.fare.discountedFare < 1) {
                            this.fare.discountedFare = 0;
                        }
                        this.showFareSpinner = false;
                        this.fareCalculated.next(this.fare);
                        // this.sharedService.setShowSpinner(false);
                        // setInterval(() => {
                        //     this.getFare();
                        // }, 600000);
                    }
                })
                .catch((error: any) => {
                    console.log("fare error", error);
                    this.showFareSpinner = false;
                    // this.sharedService.setShowSpinner(false);
                });
        }
    }
    // END second getFare


    // START first getFare
    // getFare(): void {
    //     this.clearFare();
    //     this.showFareSpinner = true;
    //     if (
    //         this.selectAddressService.pickupAddress &&
    //         this.selectAddressService.dropOffAddress &&
    //         this.selectAddressService.pickupInServiceArea
    //     ) {
    //         this.getAddressDetails(
    //             this.selectAddressService.pickupAddress,
    //             this.selectAddressService.dropOffAddress
    //         )
    //             .then(() => {
    //                 this.gettingFare.next();
    //                 console.log('calling get fare');
    //                 let date;
    //                 if (this.isNow) {
    //                     date = this.sharedService.getCurrentTimeInUTC(
    //                         this.zoneId
    //                     );
    //                 } else {
    //                     date = this.sharedService.convertTimeToUTC(
    //                         this.zoneId,
    //                         this.pickupDate,
    //                         this.pickupTime
    //                     );
    //                 }

    //                 console.log(this.pickupDate);
    //                 console.log(this.pickupTime);
    //                 console.log(date);

    //                 const pickupAddress =
    //                     this.selectAddressService.pickupAddress.details;
    //                 const dropoffAddress =
    //                     this.selectAddressService.dropOffAddress.details;
    //                 const departureDate = date;
    //                 const pkupStreet =
    //                     pickupAddress.strNbr + ' ' + pickupAddress.strName;
    //                 const pkupCity = pickupAddress.city;
    //                 const pkupState = pickupAddress.state;
    //                 const pkupZip = pickupAddress.zip.split('-')[0];
    //                 const pkupLat = pickupAddress.lat;
    //                 const pkupLon = pickupAddress.lng;
    //                 const destStreet =
    //                     dropoffAddress.strNbr + ' ' + dropoffAddress.strName;
    //                 const destCity = dropoffAddress.city;
    //                 const destState = dropoffAddress.state;
    //                 const destZip = dropoffAddress.zip.split('-')[0];
    //                 const destLat = dropoffAddress.lat;
    //                 const destLon = dropoffAddress.lng;
    //                 const userId = this.sharedService.userId; // ! change this
    //                 console.log('calling getFarePrice mutation');
    //                 // this.sharedService.setShowSpinner(true);
    //                 this.api
    //                     .GetFarePrice(
    //                         departureDate,
    //                         pkupStreet,
    //                         pkupCity,
    //                         pkupState,
    //                         pkupZip,
    //                         pkupLat,
    //                         pkupLon,
    //                         destStreet,
    //                         destCity,
    //                         destState,
    //                         destZip,
    //                         destLat,
    //                         destLon,
    //                         userId
    //                     )
    //                     .then((response: GetTripFareResponse) => {
    //                         console.log(response.data);
    //                         this.fare = response.data;
    //                         // ! getting negative values for discounted fare
    //                         // ! need to discuss if this should be handled on the backend
    //                         if (this.fare.discountedFare < 1) {
    //                             this.fare.discountedFare = 0;
    //                         }
    //                         this.fareCalculated.next(this.fare);
    //                         this.showFareSpinner = false;
    //                         // this.sharedService.setShowSpinner(false);
    //                     })
    //                     .catch((error: any) => {
    //                         console.log(error);
    //                         this.showFareSpinner = false;
    //                         // this.sharedService.setShowSpinner(false);
    //                     });
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 this.showFareSpinner = false;
    //             });
    //     }
    // }
    // END first generation getFare
    clearFare() {
        this.fare = null;
    }

    getNearbyVehicles(): Promise<Vehicle[]> {
        const geometry = this.selectAddressService.pickupGeometry;
        let date: string;
        if (this.isNow) {
            date = this.sharedService.getCurrentTimeInUTC(this.zoneId);
        } else {
            date = this.sharedService.convertTimeToUTC(
                this.zoneId,
                this.pickupDate,
                this.pickupTime
            );
        }
        const lat = this.selectAddressService.pickupAddress.lat;
        const lng = this.selectAddressService.pickupAddress.lng;
        const fleetId = geometry.fleet;
        const zoneId = geometry.entity;

        return new Promise((resolve, reject) => {
            this.api
                .GetVehicles(lat, lng, fleetId, zoneId, date)
                .then((response: VehiclesResponse) => {
                    if (response.error) {
                        reject(response);
                    } else {
                        const vehicles: Vehicle[] = response.data.vehicles;
                        resolve(vehicles);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    setEta(eta: number): void {
        // if (eta > 60) {
        //     this.eta = Math.round(eta / 60);
        // } else {
        //     this.eta = eta;
        // }

        // this.eta = Math.round(eta / 60);
        this.eta = eta;
        this.etaSet.next({ eta: this.eta });
    }

    setTripTime(tripTime: number): void {
        this.tripTime = tripTime;
        this.tripTimeSet.next({ eta: this.eta, tripTime });
    }

    setPickupDateTime(pickupDate: Date, pickupTime: any, isNow: boolean): void {
        this.pickupDate = pickupDate;
        this.pickupTime = pickupTime;
        this.isNow = isNow;
        this.getFare();
        this.pickupDateTimeChanged.next(isNow);
    }

    setZoneId(zone: string) {
        this.zoneId = zone;
    }
}
