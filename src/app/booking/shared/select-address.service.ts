import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { APIService, PolyAreaCheckResponse, CancelRideResponse, ServiceAreaResponse } from 'src/app/API.service';
import { AddressSuggestion } from 'src/app/shared/Address.model';
import { ModalService } from 'src/app/shared/Modal/Modal.service';
import { SharedService } from 'src/app/shared/shared.service';
import { hereEngineKey } from 'credentials';

@Injectable()
export class SelectAddressService {
    public addressSuggestionsActiveSet = new Subject<any>();
    public pickupAddressSelected = new Subject<AddressSuggestion>();
    public dropOffAddressSelected = new Subject<AddressSuggestion>();
    public pickupAddressCleared = new Subject<any>();
    public dropOffAddressCleared = new Subject<any>();
    public requestRideBtnEnable = new Subject<any>();
    public userLocationSet = new Subject();
    public userLocationSetCleared = new Subject();
    public userLocationSelected = new Subject();
    public zoneIdSet = new Subject<any>();
    // ! LA Location
    // public userLocation = {
    //     lat: 34.052026101343586,
    //     lng: -118.25521482970215,
    // };
    // ! St. George Location
    // public userLocation = {
    //     lat: 37.11256170000001,
    //     lng: -113.5909946,
    // };
    // ! LA Location 2
    public userLocation = {
        lat: 34.066271,
        lng: -118.088566,
    };
    // ! Location Chad uses where only 1 result shows for the query string "10"
    // public userLocation = {
    //     lat: 33.736,
    //     lng: -118.28,
    // };
    public showUserLocation = false;
    public pickupAddress: AddressSuggestion | null = null;
    public dropOffAddress: AddressSuggestion | null = null;
    public pickupInServiceArea = false;
    public pickupGeometry: any = null;
    public addressSuggestionsActive = false;

    public showPickupAddressSpinner = false;
    public showDropoffAddressSpinner = false;

    public fare: any = null;
    public isCheck: boolean = false;
    public isAirport: boolean = false;

    constructor(
        private api: APIService,
        private modalService: ModalService,
        private sharedService: SharedService
    ) { }

    setAddressSuggestionsActive(value: boolean) {
        this.addressSuggestionsActive = value;
        this.addressSuggestionsActiveSet.next();
    }

    cancelRide(tripNbr: Number) {
        this.sharedService.setShowSpinner(true, null);

        this.api.CancelRide(tripNbr)
            .then((response: CancelRideResponse) => {

                this.sharedService.setShowSpinner(false, null);

                if (!response.error) {
                    // failed cancel ride request
                    this.modalService.openModal(
                        'Unfortunately, Your Cancel Ride request is failed.',
                        null,
                        false
                    );

                } else {
                    // approved cancel ride request
                    this.modalService.openModal(
                        'Your Cancel Ride request is approved.',
                        null,
                        false
                    );
                }
            })
            .catch((error: any) => {
                this.sharedService.setShowSpinner(false, null);
                // failed cancel ride request with something wrong
                this.modalService.openModal(
                    'Unfortunately, Something went wrong.',
                    null,
                    false
                );
            })
    }

    // 
    checkPolygonAirport(address: AddressSuggestion) {
        this.api
            .PolyAreaCheck(address.lat, address.lng)
            .then((response: PolyAreaCheckResponse) => {

                if (response.isAirport) {
                    // disable RequestRide button
                    this.isAirport = true;
                    this.requestRideBtnEnable.next(response);
                    console.log(this.isAirport)
                } else {
                    // enable RequestRide button
                    this.isAirport = false;
                    this.requestRideBtnEnable.next(response);
                }
            })
            .catch((error: any) => {
                console.log("polygonAirportCheckerrerrerrerr_______________", error)
                // console.log("serviceAreaCheck Error==", error);
                // this.modalService.openModal(
                //     'Something went wrong. Please try again.',
                //     null,
                //     false
                // );
                // this.pickupGeometry = null;
            });
    }

    selectPickupAddress(address: AddressSuggestion) {
        this.isCheck = false;
        this.showPickupAddressSpinner = true;
        this.serviceAreaCheck(address.lat, address.lng)
            .then(() => {
                this.pickupInServiceArea = true;
                this.pickupAddress = address;
                this.pickupAddressSelected.next(address);
                this.showPickupAddressSpinner = false;
                this.isCheck = true;
                 setTimeout(() => { 
                    this.isCheck = false;
                }, 2000)
                // this.getFare();
            })
            .catch(() => {
                this.pickupInServiceArea = false;
                this.pickupAddress = address;
                this.showPickupAddressSpinner = false;
            });
       
    }

    selectDropOffAddress(address: AddressSuggestion) {
        this.showDropoffAddressSpinner = true;
        this.isCheck = false;
        if (this.pickupAddress != null) {
            this.serviceAreaCheck(
                this.pickupAddress.lat,
                this.pickupAddress.lng
            )
                .then(() => {
                    this.pickupInServiceArea = true;
                    this.dropOffAddress = address;
                    this.dropOffAddressSelected.next(address);
                    this.showDropoffAddressSpinner = false;
                })
                .catch(() => {
                    console.log('service area check failed');
                    this.pickupInServiceArea = false;
                    this.showDropoffAddressSpinner = false;
                });
        } else {
            this.dropOffAddress = address;
            this.dropOffAddressSelected.next(address);
            this.showDropoffAddressSpinner = false;
        }
    }

    clearPickupAddress() {
        this.fare = null;
        this.pickupAddress = null;
        this.pickupAddressCleared.next();
    }

    clearDropOffAddress() {
        this.fare = null;
        this.dropOffAddress = null;
        this.dropOffAddressCleared.next();
    }

    setUserLocation(lat: number, lng: number) {
        this.userLocation.lat = lat;
        this.userLocation.lng = lng;
        this.userLocationSet.next();

        // get fleet id from service area checking 
        // const type = 'zv2';
        // const apiKey = hereEngineKey;
        // this.sharedService.setShowSpinner(true, 'Checking service area');

        // this.api.ServiceAreaCheck(type, lat, lng, apiKey)
        //  .then((response) => {
        //     this.sharedService.setShowSpinner(false, null);
        //     console.log("setUserLocation ==== ServiceAreaCheck", response)
        //     if (response.status == "OK") {
        //         this.userLocation.lat = lat;
        //         this.userLocation.lng = lng;
        //         this.userLocationSet.next();    
        //     } else {
        //         this.userLocation.lat = lat;
        //         this.userLocation.lng = lng;
        //         this.userLocationSet.next();    

        //         console.log("serviceareacheck for user location is Unfortunately, we do not service your pickup location")
        //         // this.modalService.openModal(
        //         //     'Unfortunately, we do not service your pickup location.',
        //         //     null,
        //         //     false
        //         // );
        //     }

        // }).catch( (error: any) => {
        //     this.sharedService.setShowSpinner(false, null);
        //     console.log(error);

        //     this.userLocation.lat = lat;
        //     this.userLocation.lng = lng;
        //     this.userLocationSet.next();    

        //     console.log("serviceareacheck for user location is Something went wrong.")


        //     // this.modalService.openModal(
        //     //     'Something went wrong. Please try again.',
        //     //     null,
        //     //     false
        //     // );
        // })   
    }

    setSelecteUserLoaction(lat: number, lng: number) {
        this.userLocation.lat = lat;
        this.userLocation.lng = lng;
        this.userLocationSelected.next();
    }

    clearUserLocation() {
        // this.userLocation.lat = null;
        // this.userLocation.lng = null;
        this.userLocationSetCleared.next();
    }


    serviceAreaCheck(lat: number, lng: number) {

        const type = 'zv2';
        const apiKey = hereEngineKey;

        return new Promise<void>((resolve, reject) => {
            this.sharedService.setShowSpinner(true, 'Checking service area');
            this.api
                .ServiceAreaCheck(type, lat, lng, apiKey)
                .then((response: ServiceAreaResponse) => {
                    if (response.status === 'OK') {
                        this.pickupGeometry = response.geometry;
                        this.zoneIdSet.next(this.pickupGeometry.entity);
                        this.sharedService.setShowSpinner(false, null);
                        resolve();
                    } else {
                        this.modalService.openModal(
                            'Unfortunately, we do not service your pickup location.',
                            null,
                            false
                        );
                        this.pickupGeometry = null;
                        this.sharedService.setShowSpinner(false, null);
                        reject();
                    }
                })
                .catch((error: any) => {
                    console.log("serviceAreaCheck Error==", error);
                    this.modalService.openModal(
                        'Something went wrong. Please try again.',
                        null,
                        false
                    );
                    this.pickupGeometry = null;
                    this.sharedService.setShowSpinner(false, null);
                    reject();
                });
        });
    }

    resetAddresses() {
        this.clearPickupAddress();
        this.clearDropOffAddress();
    }
}
