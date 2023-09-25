import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { APIService } from 'src/app/API.service';
import {
    AddressDisplay,
    AddressSuggestion,
} from 'src/app/shared/Address.model';
import { SharedService } from 'src/app/shared/shared.service';
import { SelectAddressService } from '../../shared/select-address.service';
import { Subscription } from 'rxjs';
import { BookingService } from '../../shared/booking-service';
import { hereEngineKey } from 'credentials';
import { ModalService } from 'src/app/shared/Modal/Modal.service';
import { Location } from '@angular/common';

declare var H: any;

@Component({
    selector: 'app-select-addresses',
    templateUrl: './select-addresses.component.html',
    styleUrls: ['./select-addresses.component.css'],
})
export class SelectAddressesComponent {
    @Input('disableDrag') disableDrag: Boolean;
    @Input() isCash: string;
    @Output() pickupAptVal = new EventEmitter<string>();
    @Output() dropOffAptVal = new EventEmitter<string>();
    @Output() pickupClear = new EventEmitter<string>();
    @ViewChild('pickupAddressInput') pickupAddressInput!: ElementRef;
    @ViewChild('dropoffAddressInput') dropoffAddressInput!: ElementRef;
    service: any;
    aptView: boolean = true;
    addressSuggestions: AddressDisplay[] = [];
    currentField: string | undefined;
    showAddressSuggestions = false;
    pickupAddress: AddressDisplay = {
        title: '',
        detail: '',
    };
    dropoffAddress: AddressDisplay = {
        title: '',
        detail: '',
    };
    userLocation = {
        lat: 0,
        lng: 0,
    };
    pickupApt: String = '';
    dropOffApt: String = '';
    showSpinner = false;
    searchRequestSubscription: Subscription = null;
    resetBookingSubscription: Subscription = null;
    subscriptions: Subscription[] = [
        this.searchRequestSubscription,
        this.resetBookingSubscription,
    ];

    isPickup: boolean = false;
    isdropoff: boolean = false;
    isMobile: boolean = false;
    windowWidth: number = window.innerWidth;
    focusedInput: string = null;

    showLoadingCurrentLocation: boolean = false;

    // isFocusPickupInput = false;

    countFocusPickupInput = 0;
    countFocusDropoffInput = 0;

    constructor(
        private bookingService: BookingService,
        public selectAddressService: SelectAddressService,
        private http: HttpClient,
        private sharedService: SharedService,
        private modalService: ModalService,
        private location: Location,
    ) {
        this.userLocation = this.selectAddressService.userLocation;

        this.getUserLocation();

        this.resetBookingSubscription =
            this.bookingService.bookingReset.subscribe(() => {
                this.resetAddresses();
            });
    }

    public ngOnInit(): void {
        const pattern1 = /\/AccountReservationsWeb\/Acct\/(\w+)\/([a-zA-Z=]+)\/([a-zA-Z0-9_-]+)/;
        const pattern2 = /\/AccountReservationsWeb\/Acct\/(\w+)\/([a-zA-Z=]+)/;
        const pattern3 = /\/AccountReservationsWeb\/AccountAccess/;

        const currentUrl = this.location.path();

        const result1 = pattern1.exec(currentUrl);
        const result2 = pattern2.exec(currentUrl);
        if (result2 != null) {
            this.aptView = true;
        } else {
            this.aptView = false;
        }
        if (this.windowWidth <= 800) this.isMobile = true;
        else this.isMobile = false;
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    public onchangePickupApt(event: any) {
        this.pickupAptVal.emit(event.target.value)
    }
    public onchangeDropApt(event: any) {
        this.dropOffAptVal.emit(event.target.value)
    }

    private getUserLocation(): void {
        // ! The web application has to be served over https for this to work
        //  this can be used to get a user's location
        const geoSuccess = (position: GeolocationPosition) => {
            const coords = position.coords;
            // If the webversion, don't use blue dot
            // If the mobileversion, use the blue dot only at first time , and then use the yello dot (grey dot) after clear it.
            //                       and then update the current location every minute

            this.selectAddressService.showUserLocation = true;  // to show blue dot when it is mobile version

            // ! remove and uncomment below
            // this.selectAddressService.setUserLocation(
            //     this.userLocation.lat,
            //     this.userLocation.lng
            // );
            // !

            this.selectAddressService.setUserLocation(
                coords.latitude,
                coords.longitude
            );

            // get address title and other information from the reverse geoserver API
            // params (current lat, lng)
            this.getAddressFromPosition(
                this.userLocation.lat,
                this.userLocation.lng
            )
                .then((response: any) => {
                    const fullResult = response;

                    fullResult.lat = this.userLocation.lat;
                    fullResult.lng = this.userLocation.lng;
                    fullResult.title = "Current location";
                    this.pickupAddress = {
                        title: fullResult.title,
                        detail: '',
                        fullResult,
                    };
                    this.selectAddressService.selectPickupAddress(fullResult);
                    this.sharedService.setShowSpinner(false, null);
                })
                .catch((error) => {
                    this.sharedService.setShowSpinner(false, null);
                    console.log(error);
                });
        };

        const geoError = (error: any) => {
            // error.code can be:
            //   0: unknown error
            //   1: permission denied
            //   2: position unavailable (error response from location provider)
            //   3: timed out
            this.sharedService.setShowSpinner(false, null);
            this.selectAddressService.setUserLocation(
                this.selectAddressService.userLocation.lat,
                this.selectAddressService.userLocation.lng
            );
        };

        navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
            if (result.state == 'granted') {
            } else if (result.state == 'prompt') {
            }
            // Don't do anything if the permission was denied.
        })

        if (navigator.geolocation) {
            this.sharedService.setShowSpinner(true, 'Getting user location');
            // if(window.innerWidth <= 800)
            //     navigator.geolocation.getCurrentPosition(geoSuccess, geoError, {
            //         timeout: 7000,
            //     });
            // else 
            //     {
            /// start
            // this.http
            //     .get(
            //         'https://geolocation-db.com/json/'
            //     )
            //     .subscribe(
            //         (response: any) => {
            //             console.log("response===========", response)
            //             this.selectAddressService.setUserLocation(
            //                 response.latitude,
            //                 response.longitude
            //             );
            //         },
            //         (error) => {
            //             this.selectAddressService.setUserLocation(
            //                 this.selectAddressService.userLocation.lat,
            //                 this.selectAddressService.userLocation.lng
            //             );
            //         }
            //     )
            //// end

            // BDev ipinfo key
            fetch('https://ipinfo.io/json?token=a66ceccc3684c1')
                .then((response) => response.json())
                .then((data) => {
                    const latitude = Number(data.loc.split(',')[0]);
                    const longitude = Number(data.loc.split(',')[1]);
                    this.selectAddressService.setUserLocation(
                        latitude,
                        longitude
                    );
                })
                .catch((error) => {
                    console.error(error)
                    this.selectAddressService.setUserLocation(
                        this.selectAddressService.userLocation.lat,
                        this.selectAddressService.userLocation.lng
                    );
                });

            // }
        } else {
            this.selectAddressService.setUserLocation(
                this.selectAddressService.userLocation.lat,
                this.selectAddressService.userLocation.lng
            );
        }
    }

    private getAddressFromPosition(lat: number, lng: number): Promise<any> {

        // const fixedLat = parseFloat(lat.toFixed(5));
        // const fixedLng = parseFloat(lng.toFixed(5));

        const params = new HttpParams()
            .append('apiKey', hereEngineKey)
            .append('geo', `${lat},${lng}`);
        return new Promise((resolve, reject) => {
            this.http
                .get(
                    'https://aza9uj33tf.execute-api.us-east-2.amazonaws.com/1/geocode/getreversegeocode',
                    { params }
                )
                .subscribe(
                    (response: any) => {
                        const addr = response.addr;
                        const title = `${addr.strNbr} ${addr.strName}`;
                        const vicinity = `${addr.city}, ${addr.state}`;
                        const address: AddressSuggestion = {
                            lat: addr.lat,
                            lng: addr.lng,
                            title,
                            vicinity,
                            address: {
                                city: addr.city,
                                countryCode: '',
                                countryName: '',
                                county: '',
                                district: '',
                                label: '',
                                postalCode: addr.zip,
                                state: addr.state,
                                stateCode: addr.state,
                                street: addr.strName,
                                houseNumber: addr.strNbr,
                            },
                        };
                        resolve(address);
                    },
                    (error) => {
                        reject(error);
                    }
                );
        });
    }

    public onFocus(event: any, field: string): void {
        this.pickupAptVal.emit('focus')

        setTimeout(() => {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
        }, 300);

        if (field == 'pickup') {
            // this.isFocusPickupInput = true;
            if (this.countFocusPickupInput == 0) {
                this.pickupAddressInput.nativeElement.select();
            }
            this.countFocusPickupInput = this.countFocusPickupInput + 1;
        } else {
            if (this.countFocusDropoffInput == 0) {
                this.dropoffAddressInput.nativeElement.select();
            }
            this.countFocusDropoffInput = this.countFocusDropoffInput + 1;
        }

        this.showAddressSuggestions = true;
        this.selectAddressService.setAddressSuggestionsActive(true);

        if (this.currentField !== field) {
            this.addressSuggestions = [];
            this.currentField = field;
        }

        // this.focusedInput = field;

        // console.log(this.pickupAddressInput);
    }


    public onFocusOut(event: any, field: string): void {
        this.pickupAptVal.emit('focusOut');
        // console.log("onFocusOut - component ", event.target.value)
        const queryString = (event.target as HTMLInputElement).value;

        const focusedElement = document.activeElement;
        if (field == 'pickup') {
            this.countFocusPickupInput = 0;
            // this.isFocusPickupInput = false;

            if (queryString == "")
                this.selectAddressService.clearPickupAddress();

        } else {
            this.countFocusDropoffInput = 0;

            if (queryString == "")
                this.selectAddressService.clearDropOffAddress();
        }
        if (
            this.selectAddressService.pickupAddress &&
            this.selectAddressService.dropOffAddress &&
            this.selectAddressService.pickupInServiceArea
        ) {
            this.showAddressSuggestions = false;
            this.selectAddressService.setAddressSuggestionsActive(false);
        }

        // this.focusedInput = null;
    }

    public onFocusClear(field: string): void {
        if (field == 'pickup') {
            this.pickupAddressInput.nativeElement.focus();
            // this.isFocusPickupInput = true;
        }
    }

    // public showClearButton(field: string): boolean {
    //     if (
    //         field === 'pickup' &&
    //         this.pickupAddressInput &&
    //         this.pickupAddressInput.nativeElement.value != null &&
    //         this.pickupAddressInput.nativeElement.value !== ''
    //     ) {
    //         return true;
    //     } else if (
    //         field === 'dropoff' &&
    //         this.dropoffAddressInput &&
    //         this.dropoffAddressInput.nativeElement.value != null &&
    //         this.dropoffAddressInput.nativeElement.value !== ''
    //     ) {
    //         return true;
    //     }

    //     return false;
    // }

    public clearAddress(field: string): void {
        this.pickupAptVal.emit('clear')
        if (field === 'pickup') {
            this.pickupAddress = {
                title: '',
                detail: '',
            };
            this.pickupAddressInput.nativeElement.value = null;
            this.selectAddressService.clearPickupAddress();
            this.isPickup = false;
        } else if (field === 'dropoff') {
            this.dropoffAddress = {
                title: '',
                detail: '',
            };
            this.dropoffAddressInput.nativeElement.value = null;
            this.selectAddressService.clearDropOffAddress();
            this.isdropoff = false;
        }
        this.addressSuggestions = [];
    }



    public getLocation(): void {

    }


    public clickMyCurrentAddress(): void {
        // Case 1 Shan's house
        // this.showLoadingCurrentLocation = false; // loading wheel false show
        // this.selectAddressService.showUserLocation = true;  // to show blue dot when it is mobile version

        // // Shan's house
        // this.selectAddressService.setSelecteUserLoaction(
        //     34.1651868,
        //     -118.4541724
        // );

        // // // params (current lat, lng)
        // this.getAddressFromPosition(
        //     this.userLocation.lat,
        //     this.userLocation.lng
        // )
        //     .then((response: any) => {
        //         const fullResult = response;
        //         console.log("fullResult", fullResult)
        //         console.log("fullResult_title", fullResult.title)

        //         fullResult.lat = this.userLocation.lat;
        //         fullResult.lng = this.userLocation.lng;
        //         fullResult.title = "Current location";
        //         this.pickupAddress = {
        //             title: fullResult.title,
        //             detail: '',
        //             fullResult,
        //         };
        //         this.selectAddressService.selectPickupAddress(fullResult);
        //         this.sharedService.setShowSpinner(false, null);
        //     })
        //     .catch((error) => {
        //         this.sharedService.setShowSpinner(false, null);
        //         console.log(error);
        //     });


        // Case 2 Real Case
        this.selectAddressService.showUserLocation = true
        // this.getUserLocation();

        this.selectAddressService.clearUserLocation()
        // this.selectAddressService.setSelecteUserLoaction(
        //     this.userLocation.lat, 
        //     this.userLocation.lng
        // )

        var allowGeoRecall = true;
        var countLocationAttempts = 0;

        const geoSuccess = (position: GeolocationPosition) => {
            allowGeoRecall = false;

            const coords = position.coords;
            this.showLoadingCurrentLocation = false; // loading wheel false show
            this.selectAddressService.showUserLocation = true;  // to show blue dot when it is mobile version

            this.selectAddressService.setSelecteUserLoaction(
                coords.latitude,
                coords.longitude
            );

            // params (current lat, lng)
            this.getAddressFromPosition(
                this.userLocation.lat,
                this.userLocation.lng
            )
                .then((response: any) => {
                    const fullResult = response;

                    fullResult.lat = this.userLocation.lat;
                    fullResult.lng = this.userLocation.lng;
                    fullResult.title = "Current location";
                    this.pickupAddress = {
                        title: fullResult.title,
                        detail: '',
                        fullResult,
                    };
                    this.selectAddressService.selectPickupAddress(fullResult);
                    this.sharedService.setShowSpinner(false, null);
                })
                .catch((error) => {
                    this.sharedService.setShowSpinner(false, null);
                    console.log(error);
                });
        };

        const geoError = (error: any) => {
            if (allowGeoRecall && countLocationAttempts < 5) {
                countLocationAttempts += 1;
                getLocation();
            }

            // error.code can be:
            //   0: unknown error
            //   1: permission denied
            //   2: position unavailable (error response from location provider)
            //   3: timed out
            this.showLoadingCurrentLocation = false;   // loading wheel false show
            this.sharedService.setShowSpinner(false, null);
            this.selectAddressService.setUserLocation(
                this.selectAddressService.userLocation.lat,
                this.selectAddressService.userLocation.lng
            );

            // this.modalService.openModal(
            //     'Unfortunately, Location sharing is denied',
            //     null,
            //     false
            // );
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                this.sharedService.setShowSpinner(true, 'Getting user location');
                this.showLoadingCurrentLocation = true;
                navigator.geolocation.getCurrentPosition(geoSuccess, geoError, {
                    timeout: 7000,
                });
            }
        }

        getLocation();
    }

    public searchAddress(event: KeyboardEvent, suggestType: string): void {
        const queryString = (event.target as HTMLInputElement).value;
        if (queryString == "Current location")
            return;

        if (queryString != "Current location" && this.currentField == 'pickup') {
            this.selectAddressService.showUserLocation = false
            // this.getUserLocation();

            this.selectAddressService.clearUserLocation()
        }


        if (queryString.length < 2) {
            this.addressSuggestions = [];
            return;
        }

        // if (this.currentField === 'pickup') {
        //     this.pickupAddress = {
        //         title: '',
        //         detail: '',
        //     };
        //     console.log("searchAddress => this.selectAddressService.clearPickupAddress")
        //     this.selectAddressService.clearPickupAddress();
        // }

        // const params = new HttpParams()
        //     .append('apiKey', hereEngineKey)
        //     .append('lat', this.selectAddressService.pickupAddress?.lat ?  this.selectAddressService.pickupAddress?.lat?.toString() : this.userLocation.lat.toString())
        //     .append('lng', this.selectAddressService.pickupAddress?.lng ?  this.selectAddressService.pickupAddress?.lng?.toString() : this.userLocation.lng.toString())
        //     .append('query', queryString)
        //     .append('size', '6')
        //     .append('suggestType', suggestType);

        // const params = new HttpParams()
        //     .append('apiKey', hereEngineKey)
        //     .append('lat', this.selectAddressService.pickupAddress?.lat ? this.selectAddressService.pickupAddress?.lat?.toString() : this.userLocation.lat.toString())
        //     .append('lng', this.selectAddressService.pickupAddress?.lng ? this.selectAddressService.pickupAddress?.lng?.toString() : this.userLocation.lng.toString())
        //     .append('query', queryString)
        //     .append('size', '6')
        //     .append('suggestType', suggestType);
        const params = new HttpParams()
            .append('apiKey', hereEngineKey)
            .append('lat', this.selectAddressService.pickupAddress?.lat ? this.selectAddressService.pickupAddress?.lat?.toString() : this.userLocation.lat.toString())
            .append('lng', this.selectAddressService.pickupAddress?.lng ? this.selectAddressService.pickupAddress?.lng?.toString() : this.userLocation.lng.toString())
            .append('query', queryString)
            .append('size', '6')
            .append('suggestType', suggestType);
        //     34.1651868,
        //     -118.4541724

        // cancel pending request since new request supersedes the previous one
        // (if there is one still pending)
        if (this.searchRequestSubscription) {
            this.searchRequestSubscription.unsubscribe();
        }

        this.searchRequestSubscription = this.http
            .get(
                'https://aza9uj33tf.execute-api.us-east-2.amazonaws.com/1/places/suggest2',
                { params }
            )
            .subscribe(
                (response: any) => {
                    this.addressSuggestions = [];
                    if (response.results != null) {
                        // if(this.currentField == 'pickup') {
                        //     let count = 0;
                        //     for(let i = 0 ; i < response.results.length ; i ++) {
                        //         let item: AddressSuggestion = response.results[i]
                        //         const suggestion: AddressDisplay = {
                        //             title: this.formatSuggestionTitle(item),
                        //             detail: this.formatSuggestionDetail(item),
                        //             fullResult: item,
                        //         };
                        //         console.log("suggestion==========", suggestion )
                        //         // ! need to make sure only suggestions with street numbers are allowed
                        //         if(!suggestion.title.includes('LAX Terminal') && !(suggestion.title.includes('LAX') && suggestion.title.includes('Bradley Terminal')) ) {
                        //             this.addressSuggestions.push(suggestion);
                        //             count ++;
                        //         }

                        //         if(count == 6) {
                        //             break;
                        //         }
                        //     }
                        // } else {
                        //     let count = 0;
                        //     for (let i = 0; i < response.results.length; i++) {
                        //         let item: AddressSuggestion = response.results[i]
                        //         const suggestion: AddressDisplay = {
                        //             title: this.formatSuggestionTitle(item),
                        //             detail: this.formatSuggestionDetail(item),
                        //             fullResult: item,
                        //         };
                        //         // ! need to make sure only suggestions with street numbers are allowed

                        //         this.addressSuggestions.push(suggestion);
                        //         count++;

                        //         if (count == 6) {
                        //             break;
                        //         }
                        //     }
                        // }
                        response.results.forEach((item: AddressSuggestion) => {
                            const suggestion: AddressDisplay = {
                                title: this.formatSuggestionTitle(item),
                                detail: this.formatSuggestionDetail(item),
                                fullResult: item,
                            };
                            console.log("suggestion==========", suggestion )
                            // ! need to make sure only suggestions with street numbers are allowed
                            this.addressSuggestions.push(suggestion);

                            // if (/\d/.test(item.vicinity)) {
                            //     this.addressSuggestions.push(suggestion);
                            // }
                        });
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    public formatSuggestionTitle(suggestion: AddressSuggestion): string {
        return suggestion.title.split(',')[0];
    }

    public formatSuggestionDetail(suggestion: AddressSuggestion): string {
        const title = suggestion.title.split(',')[0];
        return suggestion.vicinity.replace(title + ',', '');
    }

    public setAddress(address: AddressDisplay): void {

        if (this.currentField === 'pickup' && !this.selectAddressService.showUserLocation) {

            // this.selectAddressService.checkPolygonAirport(address.fullResult);
            this.selectAddressService.selectPickupAddress(address.fullResult);
            this.pickupAddress = address;
            this.isPickup = true;
        } else if (this.currentField === 'dropoff') {
            this.dropoffAddress = address;
            this.selectAddressService.selectDropOffAddress(address.fullResult);
            this.isdropoff = true;
        }
        this.showAddressSuggestions = false;
        this.addressSuggestions = [];

    }

    private resetAddresses(): void {
        this.selectAddressService.resetAddresses();
        this.pickupAddress = {
            title: '',
            detail: '',
        };
        this.dropoffAddress = {
            title: '',
            detail: '',
        };
        this.getUserLocation();
    }

    public getCardTitle(): string {
        if (
            this.selectAddressService.pickupAddress &&
            this.selectAddressService.dropOffAddress &&
            this.selectAddressService.pickupInServiceArea
        ) {
            return "Ride Overview";
        }
        return "Hey there!";
    }

    showClearButton(field: string) {
        if (field === 'pickup') {
            if (
                this.pickupAddressInput &&
                this.pickupAddressInput.nativeElement.value
                // && this.isFocusPickupInput
                // && this.focusedInput === 'pickup'
            ) {
                return true;
            }
        } else {
            if (
                this.dropoffAddressInput &&
                this.dropoffAddressInput.nativeElement.value
                // && this.focusedInput === 'dropoff'
            ) {
                return true;
            }
        }

        return false;
    }

    inputIconAction(field: string, action: string) {
        console.log(field + ' ' + action);
    }
}
