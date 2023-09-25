import {
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    OnInit,
    ViewChild,
    OnChanges,
    Input,
    SimpleChanges,
    InjectionToken,
    Inject,
    Output,
    EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { VehicleTypeResponse } from 'src/app/API.service';
import {
    APIService,
    InsertTripResponse,
    VehicleType,
} from 'src/app/API.service';
import { ModalService } from 'src/app/shared/Modal/Modal.service';
import { SharedService } from 'src/app/shared/shared.service';
import { BookingService } from '../shared/booking-service';
import { SelectAddressService } from '../shared/select-address.service';
import { TripDetailsService } from '../shared/trip-details.service';
import { DateTimeSelectComponent } from './date-time-select/date-time-select.component';
import { PickupDialogComponent } from './pickup-dialog/pickup-dialog.component';
import { DateSelectComponent } from './date-select/date-select.component';
import { FormErrorsDialogComponent } from './form-errors-dialog/form-errors-dialog.component';
import { PhoneNumberInputComponent } from './phone-number-input/phone-number-input.component';
import { TripCodeConfirmationModalComponent } from './trip-code-confirmation/trip-code-confirmation-modal.component';
import { VehicleTypeSelectComponent } from './vehicle-type-select/vehicle-type-select.component';
import { RideConfirmationModalComponent } from './ride-confirmation/ride-confirmation-modal.component';
import { GetTripCodeConfirmationModalComponent } from './gettripcode-confirmation/gettripcode-confirmation-modal.component';
import { RideRequestPolygonConfirmationModalComponent } from './ride-request-polygon-confirmation/ride-request-polygon-confirmation-modal.component';
import { RideRequestPolygonTripCodeConfirmationModalComponent } from './ride-request-polygon-trip-code-confirmation/ride-request-polygon-trip-code-confirmation-modal.component';
import { BookRideConfirmationModalComponent } from './bookride-confirmation/bookride-confirmation-modal.component';
import { InfoTripCodeModalComponent } from './infotripcode-confirmation/infotripcodeconfirmation-modal.component';
import { isLive } from 'config';

import { ExampleHeader } from './date-time-select/example-header.component';
import { Location, Time } from '@angular/common';
import { Console } from 'console';
import { PhoneNumber } from 'google-libphonenumber';


@Component({
    selector: 'app-ride-details',
    templateUrl: './ride-details.component.html',
    styleUrls: ['./ride-details.component.css'],
})
export class RideDetailsComponent implements OnInit, OnDestroy, OnChanges {

    VEHICLE_TYPES: any = {
        '1': {
            displayName: 'Standard Taxi',
            numberOfSeats: '4 seats',
            desc: 'Fastest ride to get you there.',
        },
        '2': {
            displayName: 'Roomy Taxi',
            numberOfSeats: '4 seats',
            desc: 'A wagon or minivan for extra stuff.',
        },
        '3': {
            displayName: 'Minivan Taxi',
            numberOfSeats: '6 seats',
            desc: 'A bigger vehicle for your group.',
        },
        '4': {
            displayName: 'Accessible Van',
            numberOfSeats: '4 seats + 1 wheelchair',
            desc: 'Limited supply. Book 24hrs ahead.',
        },
    };
    addressSuggestionsActive = false;
    // ! set to false
    showCabAndFare = false;
    // ! set to false
    showPassengerDetails = false;
    insertTripInProgress = false;

    addressSuggestionsActiveSetSubscription: Subscription = null;
    fareCalculatedSubscription: Subscription = null;
    selectPickupAddressSubscription: Subscription = null;
    selectDropOffAddressSubscription: Subscription = null;
    clearPickupAddressSubscription: Subscription = null;
    clearDropOffAddressSubscription: Subscription = null;
    requestRideBtnEnableSubscription: Subscription = null;
    subscriptions: Subscription[] = [
        this.addressSuggestionsActiveSetSubscription,
        this.fareCalculatedSubscription,
        this.selectPickupAddressSubscription,
        this.selectDropOffAddressSubscription,
        this.clearPickupAddressSubscription,
        this.clearDropOffAddressSubscription,
    ];

    returnTripState: boolean = false; //diplay or hidden return date-time select
    isReturn: boolean = false;
    displayReturnTripCode: boolean = false;


    pickupDate: Date = new Date();
    pickupTime: any = {
        hours: 0,
        minutes: 0,
        period: 'AM',
    };

    selectedDateTimeShow: String = '';
    selectedDateShow: String = '';

    currentDate: Date;
    isNow: boolean;
    vehicleTypes: VehicleType[] = [];
    selectedVehicleType: any = null;
    isWillCall = false;
    timeZoneAbbrev: string = '';

    fare: any = null;
    tripNbr: number = null;
    tripCode: string = null;
    returnTripCode: string = null;
    displayFare: any = null;
    questions: string[] = [];
    questionsAnswer: string[] = [];


    tripNbrNum: number
    servicingCompany: string
    companyPhone: string
    message: string
    zoneIdStr: string
    pickup: string
    destination: string
    passengerName: string
    passengerPhone: string
    callDate: string
    returnTripNbr: number
    returnServicingCompany: string
    returnCompanyPhone: string
    returnMessage: string
    returnZoneId: string
    returnPickup: string
    returnDestination: string
    returnPassengerName: string
    returnPassengerPhone: string
    returnCallDate: string



    @Input('username') username: string;
    @Output() displayBubble = new EventEmitter<boolean>();

    form: FormGroup;
    disableDrag = true;
    submitted = false;

    invalidEmail: boolean = false;
    requiredEmail: boolean = false;

    requiredName: boolean = false;
    isTwoLetterError: boolean = false;

    focusPassenger: boolean = false;
    focusPhone: boolean = false;
    focusEmail: boolean = false;


    isPickupAirport: boolean = false;
    pickupAirportName: string = '';
    passengerDetails: any;
    btnsDown: boolean = true;

    tripType: string;

    @ViewChild('rideDetailsContainer') rideDetailsContainer: ElementRef;
    @ViewChild('rideDetailsSmallContainer') rideDetailsSmallContainer: ElementRef;
    @ViewChild('pickupNow') pickupNow: ElementRef;
    @ViewChild('willcallLater') willcallLater: ElementRef;
    @ViewChild(PhoneNumberInputComponent)
    phoneNumberInputComponent: PhoneNumberInputComponent;

    allowScroll = true;
    scrollPosition = 0;
    originalPosition = 0;

    isSwipedUp = false;  // initial state is bottom

    isMobile = false;
    savedPhoneNumber = '';

    rightBoxDisplay: boolean = false; //Rightbox display state
    rightBoxDataState: boolean = false;
    nextBtnDisplaty: boolean = true; //Next Button state(disable/enable)
    noteDriver: String = '';//Note For driver
    HOURS: number[] = [];
    MINUTES: number[] = [];
    exampleHeader = ExampleHeader;
    formatedDate = '';
    maxDate: Date;
    willCallCheck: boolean = false;
    isCash: boolean = false;
    deliveryItems = [
        'Trip Type*',
        'PASSENGER',
        'DELIVERY'
    ]
    selected: string = this.deliveryItems[1];
    phoneNumber: string //for return phoneNum


    returnDate: Date = null;
    secondLoop: boolean = false;

    windowHeight: number = window.innerHeight;
    leftbarHeight: string = window.innerHeight * 0.95 <= 700 ? '45%' : 'auto'

    public modelChanged(date: any) {
        var theDate = new Date(Date.parse(date));
        const localDate = theDate.toLocaleString().split(" ");
    }

    //Start appointment time State
    appointmentState: boolean = false;
    public displayAppointmentTime() {
        this.appointmentState = !this.appointmentState
    }
    //End Appointment time State

    constructor(
        private bookingService: BookingService,
        private selectAddressService: SelectAddressService,
        private tripDetailsService: TripDetailsService,
        private fb: FormBuilder,
        private api: APIService,
        private dialog: MatDialog,
        private sharedService: SharedService,
        private modalService: ModalService,
        private location: Location,
    ) {
        if (window.innerWidth <= 800)
            this.isMobile = true
        this.addressSuggestionsActiveSetSubscription =
            this.selectAddressService.addressSuggestionsActiveSet.subscribe(
                () => {
                    if (!this.isSwipedUp)
                        this.onClickDragBar();
                    this.addressSuggestionsActive =
                        this.selectAddressService.addressSuggestionsActive;
                }
            );

        this.requestRideBtnEnableSubscription = 
            this.selectAddressService.requestRideBtnEnable.subscribe((value) => {
                if (value.isAirport) {
                    // show modal
                    const dialogRef = this.dialog.open(RideRequestPolygonConfirmationModalComponent, {
                        data: {
                            pickupName: value.poly_name//this.selectAddressService.pickupAddress.title
                        },
                        width: "380px"
                    });

                    dialogRef.afterClosed().subscribe(dialogResult => {
                        if (dialogResult) {

                        }
                    });

                }
                this.isPickupAirport = value.isAirport;
                this.pickupAirportName = value.isAirport ? value.poly_name : '';
            })
        this.selectPickupAddressSubscription =
            this.selectAddressService.pickupAddressSelected.subscribe(() => {
                if (
                    this.selectAddressService.pickupAddress &&
                    this.selectAddressService.dropOffAddress &&
                    this.selectAddressService.pickupInServiceArea
                ) {
                    this.addressSuggestionsActive = false; // this means it is ready to calculate route
                    if (this.isSwipedUp)
                        this.onClickDragBar();            // so set this value to false  /* ABS */

                    this.showCabAndFare = true;
                    this.showPassengerDetails = true;
                    this.getAvailableVehicleTypes();
                    this.tripDetailsService.getFare();
                    this.selectedDateTimeShow = '';
                    this.selectedDateShow = '';
                    this.sharedService.getPickupDate(false);
                    this.isNow = true;
                    this.sharedService.isNow = true;
                    // check polygon area
                    // console.log("selectPickupAddressSubscription")
                    this.selectAddressService.checkPolygonAirport(this.selectAddressService.pickupAddress)

                } else if (
                    this.selectAddressService.pickupAddress &&
                    this.selectAddressService.pickupInServiceArea
                ) {
                    this.getAvailableVehicleTypes();
                }
            });
        this.selectDropOffAddressSubscription =
            this.selectAddressService.dropOffAddressSelected.subscribe(() => {
                if (
                    this.selectAddressService.pickupAddress &&
                    this.selectAddressService.dropOffAddress &&
                    this.selectAddressService.pickupInServiceArea
                ) {
                    // check polygon area
                    this.selectAddressService.checkPolygonAirport(this.selectAddressService.pickupAddress)

                    this.addressSuggestionsActive = false; // this means it is ready to calculate route
                    if (this.isSwipedUp)
                        this.onClickDragBar();            // so set this value to false  /* ABS */

                    this.showCabAndFare = true;
                    this.showPassengerDetails = true;
                    this.selectedDateTimeShow = '';
                    this.selectedDateShow = '';
                    this.isNow = true;
                    this.sharedService.isNow = true;
                    this.sharedService.getPickupDate(false);
                    if (this.vehicleTypes.length < 1) {
                        this.getAvailableVehicleTypes();
                    } else if (this.selectedVehicleType) {
                        this.tripDetailsService.setEta(
                            this.selectedVehicleType.eta
                        );
                    }

                    this.tripDetailsService.getFare();
                }
            });

        this.clearPickupAddressSubscription =
            this.selectAddressService.pickupAddressCleared.subscribe(() => {
                this.clearFare();
                this.isNow = true;
                this.sharedService.isNow = true;
                this.selectedDateTimeShow = "";
                this.selectedDateShow = '';
                this.initPickupDateTime();
                this.showCabAndFare = false;
            });

        this.clearDropOffAddressSubscription =
            this.selectAddressService.dropOffAddressCleared.subscribe(() => {
                this.clearFare();
                this.isNow = true;
                this.sharedService.isNow = true;
                this.selectedDateTimeShow = "";
                this.selectedDateShow = '';
                this.initPickupDateTime();
                this.showCabAndFare = false;
            });
        this.fareCalculatedSubscription =
            this.tripDetailsService.fareCalculated.subscribe((fare) => {
                this.displayFare = fare;
                this.tripDetailsService.setTripTime(fare.minutes);
            });
        this.bookingService.bookingDataRefresh.subscribe(() => {
            // refresh fare price
            if (this.displayFare != null) {
                this.displayFare = null;
                this.tripDetailsService.getFare();
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.username) {
            this.form.patchValue({
                email: this.username
            });
        }
    }

    getInnerHeight() {
        return window.innerHeight;
    }
    displayRightBox() {
        if (!this.rightBoxDisplay) {
            if (this.phoneNumberInputComponent.phoneNumber.length == 14 && this.phoneNumberInputComponent.phoneNumber[0] == '(') {
                this.rightBoxDisplay = true;
                this.getQuestion(false);
                this.rightBoxDataState = true
            }
        } else {
            this.rightBoxDisplay = false;
        }
    }

    public dropOffAptVal(val: string) {
        //this.apt
    }
    public pickupAptVal(val: string) {
        // this.showCabAndFare = false;
        // this.displayFare = false;
        // console.log(val);
        if (val == 'focus') {
            this.btnsDown = true;
        } if (val == 'clear') {
            this.btnsDown = true;
            this.displayFare = false;
        } if (val == 'focusOut') {
            this.rightBoxDisplay = false;
            this.btnsDown = false;
        }
    }

    public nextBtnState() {
        // if (!this.isTwoLetterError && this.noteDriver != '' && this.savedPhoneNumber != '' && this.savedPhoneNumber.length > 2) {
        if (!this.isTwoLetterError && this.savedPhoneNumber != '' && this.savedPhoneNumber.length > 10) {
            this.nextBtnDisplaty = false;
        } else {
            this.nextBtnDisplaty = true;
        }
    }

    @HostListener('window:resize', ['$event']) onResize(): void {
        if (window.innerWidth <= 800) {
            this.isMobile = true
            this.disableDrag = false;
        } else {
            this.isMobile = false
            this.disableDrag = true;
            this.allowScroll = true;
            // this.rideDetailsContainer.nativeElement.style.transform = 'none';
        }
    }

    public ngAfterViewInit() {
        this.originalPosition =
            this.rideDetailsContainer.nativeElement.getBoundingClientRect().top;
    }

    public ngOnInit(): void {
        const pattern1 = /\/AccountReservationsWeb\/Acct\/(\w+)\/([a-zA-Z=]+)\/([a-zA-Z0-9_-]+)/;
        const pattern2 = /\/AccountReservationsWeb\/Acct\/(\w+)\/([a-zA-Z=]+)/;
        const pattern3 = /\/AccountReservationsWeb\/AccountAccess/;
        this.tripType = 'P';
        this.rightBoxDisplay = false;
        this.showCabAndFare = false;
        const currentUrl = this.location.path();

        const result1 = pattern1.exec(currentUrl);
        const result2 = pattern2.exec(currentUrl);
        if (result2 != null) {
            this.isCash = false;
        } else {
            this.isCash = true;
        }

        if (window.innerWidth <= 800) {
            this.disableDrag = false;
        }
        //add by ASE
        this.isNow = this.tripDetailsService.isNow;
        this.sharedService.isNow = this.tripDetailsService.isNow;

        // this.initPickupDateTime()

        this.addressSuggestionsActive =
            this.selectAddressService.addressSuggestionsActive;

        this.form = this.fb.group({
            name: [null, Validators.required],
            // phone: [null, Validators.required],
            email: [
                this.username,
                Validators.compose([Validators.required, Validators.email]),
            ],
            comment: null,
        });
        // const dateAfter60Days = new Date(this.currentDate.getTime() + 60 * 24 * 60 * 60 * 1000);
        // this.maxDate = dateAfter60Days;
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    private getAvailableVehicleTypes(): void {

        const pickup = {
            lat: this.selectAddressService.pickupAddress.lat,
            lng: this.selectAddressService.pickupAddress.lng,
        };

        const geometry = this.selectAddressService.pickupGeometry;
        const fleetId = geometry.fleet;
        const zoneId = this.tripDetailsService.zoneId;
        this.api
            .GetTypes('t', pickup.lat, pickup.lng, zoneId, fleetId)
            .then((response: VehicleTypeResponse) => {
                if (response.error) {
                    // ? What to do in the case of this error
                } else {
                    this.vehicleTypes = response.data.types;
                    this.vehicleTypes.forEach((v: any) => {
                        v.type = v.type.toString();
                    });
                    this.selectedVehicleType = this.vehicleTypes[0];
                    this.tripDetailsService.setEta(
                        this.selectedVehicleType.eta
                    );
                }
            })
            .catch((error) => {
                // ? What to do in the case of this error?
                console.log(error);
            });
    }

    public openVehicleSelectDialog(): void {
        if (this.displayFare == null || this.displayFare.error != null) {
            return;
        }
        let dialogConfig: any = this.sharedService.getModalSize();
        dialogConfig.maxWidth = '560px';
        dialogConfig.data = {
            selectedVehicleType: this.selectedVehicleType,
            vehicleTypes: this.vehicleTypes,
            displayFare: this.displayFare,
            isNow: this.isNow
        };

        let countExist = 0;
        for (let i = 0; i < this.vehicleTypes.length; i++) {
            if (this.vehicleTypes[i].exist == 1)
                countExist++;
        }

        if (countExist <= 1) {
            return;
        }
        const dialogRef = this.dialog.open(
            VehicleTypeSelectComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((type: any) => {
            if (type) {
                this.selectedVehicleType = type;
                this.tripDetailsService.setEta(type.eta);
            }
        });
    }

    private insertTrip(flag: Boolean): void {
        let pickupAddress = this.selectAddressService.pickupAddress;
        let dropOffAddress = this.selectAddressService.dropOffAddress;
        const pickupPosition = {
            lat: pickupAddress.lat,
            lng: pickupAddress.lng,
        };
        const dropOffPosition = {
            lat: dropOffAddress.lat,
            lng: dropOffAddress.lng,
        };
        const passengerDetails = this.form.getRawValue();
        for (let key in passengerDetails) {
            if (passengerDetails[key] != null) {
                passengerDetails[key] = passengerDetails[key].trim();
            }
        }
        passengerDetails.firstName = '';
        passengerDetails.lastName = '';
        const splitPassengerName = passengerDetails.name.split(' ');
        passengerDetails.firstName = splitPassengerName[0];
        if (splitPassengerName.length > 1) {
            splitPassengerName.shift();
            passengerDetails.lastName = splitPassengerName.join(' ');
        }
        if (passengerDetails.lastName === '') {
            passengerDetails.lastName = ' ';
        }
        passengerDetails.phone =
            this.phoneNumberInputComponent.getFormattedPhoneNumber();
        const zoneId = this.tripDetailsService.zoneId;
        let date;
        if (this.isNow) {
            date = this.sharedService.getCurrentTimeInUTC(zoneId);
        } else if(!this.isNow) {
            date = this.sharedService.convertTimeToUTC(
                zoneId,
                this.pickupDate,
                this.pickupTime
            );
        }else if (this.isWillCall) {
            date = this.sharedService.convertDateToUTC(
                zoneId,
                this.pickupDate,
            );
        } else if(!this.isWillCall) {
            if (this.returnTripState) {
                date = this.sharedService.convertDateToUTC(
                    zoneId,
                    this.pickupDate,
                );
            } else {
                date = this.sharedService.getCurrentTimeInUTC(zoneId);
            }
        }
        const strAccountNbr = this.sharedService.custId ? this.sharedService.custId : '';
        const PricingEngineData = this.displayFare.PricingEngineData;
        this.passengerDetails = passengerDetails;
        let parameters: any = {
            userId: localStorage.sessionId, // need to randomly generate these for unauth guests
            comment: passengerDetails.comment,
            pkupDate: date,
            pkupStreet:
                pickupAddress.address.houseNumber +
                ' ' +
                pickupAddress.address.street,
            pkupApt: '', // ! need to set this
            pkupCity: pickupAddress.address.city,
            pkupState: pickupAddress.address.stateCode,
            pkupZip: pickupAddress.address.postalCode.split('-')[0],
            pkupLat: pickupPosition.lat,
            pkupLng: pickupPosition.lng,
            destStreet:
                dropOffAddress.address.houseNumber +
                ' ' +
                dropOffAddress.address.street,
            destApt: '', // ! need to set this
            destCity: dropOffAddress.address.city,
            destState: dropOffAddress.address.stateCode,
            destZip: dropOffAddress.address.postalCode.split('-')[0],
            destLat: dropOffPosition.lat,
            destLng: dropOffPosition.lng,
            nbrPass: 1, // not being used currently, but still required
            tripRate: this.displayFare.fare, // ! need to make sure this is right for discounted trips
            distance: this.displayFare.miles,
            timeEstimate: this.displayFare.minutes,
            isNow: this.isNow, // ! changes depending on trip type
            couponId: String(this.displayFare.promoId != null ? this.displayFare.promoId : ''),
            source: '9994', // ! need to figure out which code to use for this. Talk to Shan && Chad
            vehicleType: this.selectedVehicleType.type,
            pickupTime: '', // this does not appear to still be used
            paymentId: '',
            paymentMethod: '', // ! what are the other possible values for this?
            tip: 0,
            tipType: '',
            isWillCall: this.isWillCall, // ! changes depending on if it is a walkup trip or not
            phone: passengerDetails.phone,
            // phone: this.phoneNumber ? this.phoneNumber : this.savedPhoneNumber, //for return phone
            firstName: passengerDetails.firstName,
            lastName: passengerDetails.lastName,
            passEmail: passengerDetails.email,
            PkupName: pickupAddress.title,
            DestName: dropOffAddress.title,
            isLive,
            processingFee: this.displayFare.processingFee,
            strAccountNbr: strAccountNbr,
            PricingEngineData: PricingEngineData,
            ApiStage: flag,
            isCash: this.isCash,
            TripType: this.tripType
        };
        this.insertTripInProgress = true;
        this.api
            .InsertTrip(
                parameters.userId,
                parameters.comment,
                parameters.pkupDate,
                parameters.pkupStreet,
                parameters.pkupApt,
                parameters.pkupCity,
                parameters.pkupState,
                parameters.pkupZip,
                parameters.pkupLat,
                parameters.pkupLng,
                parameters.destStreet,
                parameters.destApt,
                parameters.destCity,
                parameters.destState,
                parameters.destZip,
                parameters.destLat,
                parameters.destLng,
                parameters.nbrPass,
                parameters.tripRate,
                parameters.distance,
                parameters.timeEstimate,
                parameters.isNow,
                parameters.couponId,
                parameters.source,
                parameters.vehicleType,
                parameters.pickupTime,
                parameters.paymentId,
                parameters.paymentMethod,
                parameters.tip,
                parameters.tipType,
                parameters.isWillCall,
                parameters.phone,
                parameters.firstName,
                parameters.lastName,
                parameters.passEmail,
                parameters.PkupName,
                parameters.DestName,
                parameters.isLive,
                parameters.processingFee,
                this.questionsAnswer[0],
                this.questionsAnswer[1],
                this.questionsAnswer[2],
                this.questionsAnswer[3],
                this.questionsAnswer[4],
                this.questionsAnswer[5],
                parameters.strAccountNbr,
                parameters.PricingEngineData,
                parameters.ApiStage,
                parameters.isCash,
                parameters.TripType,
            )
            .then((response: InsertTripResponse) => {
                const data = response.data;
                if (response.error) {
                    this.insertTripInProgress = false;
                    const messages = response.messages[0];
                    // removed erorr dialog at the moment.
                    this.modalService.openModal(
                        `Error!`,
                        `${messages.userMessage}`,
                        false
                    );
                } else {
                    this.insertTripInProgress = false;
                    this.tripNbr = data.tripNbr;
                    if (this.isWillCall) {
                        // Trip Code Confirmation
                        // the trip code for walk-up trips is the last 6 digits of the tripNbr
                        const tripNbrString = this.tripNbr.toString();
                        if (this.tripCode) {
                            this.returnTripCode = tripNbrString.substring(
                                tripNbrString.length - 6
                            );
                        } else {
                            this.tripCode = tripNbrString.substring(
                                tripNbrString.length - 6
                            );
                            console.log(tripNbrString.substring(tripNbrString.length - 6));
                        }
                        // show gettrip code confirmation popup
                        if (this.returnTripCode) {
                            const dialogRef = this.dialog.open(GetTripCodeConfirmationModalComponent, {
                                data: {
                                    tripCode: this.tripCode,
                                    returnTripCode: this.returnTripCode
                                }
                            });
                            dialogRef.afterClosed().subscribe(dialogResult => {
                                this.returnTripCode = null;
                                this.tripCode = null;
                                this.resetForm();
                                if (dialogResult) {
                                }
                            });
                        } else if (!this.returnDate) {
                            const dialogRef = this.dialog.open(GetTripCodeConfirmationModalComponent, {
                                data: {
                                    tripCode: this.tripCode
                                }
                            });
                            dialogRef.afterClosed().subscribe(dialogResult => {
                                this.returnTripCode = null;
                                this.tripCode = null;
                                this.resetForm();
                                if (dialogResult) {

                                }
                            });
                        }

                    } else {
                        if (!this.secondLoop) {
                            this.tripNbrNum = response.data.tripNbr;
                            this.servicingCompany = response.data.servicingCompany;
                            this.companyPhone = response.data.companyPhone;
                            this.message = response.messages[0].userMessage;
                            this.zoneIdStr = response.data.zoneId;
                            this.pickup = response.data.pickup;
                            this.destination = response.data.destination;
                            this.passengerName = response.data.passengerName;
                            this.passengerPhone = response.data.passengerPhone;
                            this.callDate = response.data.callDate;
                            this.secondLoop = true;
                        } else if (this.secondLoop) {
                            this.secondLoop = false;
                            this.returnTripNbr = response.data.tripNbr;
                            this.returnServicingCompany = response.data.servicingCompany;
                            this.returnCompanyPhone = response.data.companyPhone;
                            this.returnMessage = response.messages[0].userMessage;
                            this.returnZoneId = response.data.zoneId;
                            this.returnPickup = response.data.pickup;
                            this.returnDestination = response.data.destination;
                            this.returnPassengerName = response.data.passengerName;
                            this.returnPassengerPhone = response.data.passengerPhone;
                            this.returnCallDate = response.data.callDate;
                            // if (this.selectedDateTimeShow == '') {
                            //     this.setSelectedDateTimeShow();
                            // }
                            const dialogRef = this.dialog.open(BookRideConfirmationModalComponent, {
                                data: {
                                    tripNbr: this.tripNbrNum,
                                    servicingCompany: this.servicingCompany,
                                    companyPhone: this.companyPhone,
                                    message: this.message,
                                    zoneId: this.zoneIdStr,
                                    pickup: this.pickup,
                                    destination: this.destination,
                                    passengerName: this.passengerName,
                                    passengerPhone: this.passengerPhone,
                                    callDate: this.selectedDateTimeShow,
                                    returnTripNbr: this.returnTripNbr,
                                    returnServicingCompany: this.returnServicingCompany,
                                    returnCompanyPhone: this.returnCompanyPhone,
                                    returnMessage: this.returnMessage,
                                    returnZoneId: this.returnZoneId,
                                    returnPickup: this.returnPickup,
                                    returnDestination: this.returnDestination,
                                    returnPassengerName: this.returnPassengerName,
                                    returnPassengerPhone: this.returnPassengerPhone,
                                    returnCallDate: this.returnCallDate,
                                    displayFare: this.displayFare,
                                    comment: passengerDetails.comment
                                }
                            });

                            dialogRef.afterClosed().subscribe(dialogResult => {
                                this.secondLoop = false;
                                this.returnTripCode = null;
                                this.tripCode = null;
                                this.resetForm();
                                this.displayRightBox();
                            });
                        }
                        if (this.returnDate == null || this.returnDate == new Date) {
                            // if (this.selectedDateTimeShow == '') {
                            //     this.setSelectedDateTimeShow();
                            // }
                            const dialogRef = this.dialog.open(BookRideConfirmationModalComponent, {
                                data: {
                                    tripNbr: this.tripNbrNum,
                                    servicingCompany: this.servicingCompany,
                                    companyPhone: this.companyPhone,
                                    message: this.message,
                                    zoneId: this.zoneIdStr,
                                    pickup: this.pickup,
                                    destination: this.destination,
                                    passengerName: this.passengerName,
                                    passengerPhone: this.passengerPhone,
                                    callDate: this.selectedDateTimeShow,
                                    displayFare: this.displayFare,
                                    comment: passengerDetails.comment
                                }
                            });
                            dialogRef.afterClosed().subscribe(dialogResult => {
                                this.returnTripCode = null;
                                this.tripCode = null;
                                this.resetForm();
                                this.displayRightBox();
                            });
                        }
                    }
                }
            })
            .catch((err: any) => {
                this.insertTripInProgress = false;
                console.log("farePrice Error==", err);
                this.modalService.openModal(
                    'Something went wrong. Please try again. ' +
                    JSON.stringify(err),
                    null,
                    false
                );
            });
        if (this.isReturn) {
            this.isReturn = false;
            let tempAddress = this.selectAddressService.pickupAddress;
            this.selectAddressService.pickupAddress = this.selectAddressService.dropOffAddress;
            this.selectAddressService.dropOffAddress = tempAddress;
            this.pickupDate = this.returnDate;
            this.insertTrip(true);
        }
    }

    private getQuestion(flag: Boolean): void {
        const pickupAddress = this.selectAddressService.pickupAddress;
        const dropOffAddress = this.selectAddressService.dropOffAddress;
        const pickupPosition = {
            lat: pickupAddress.lat,
            lng: pickupAddress.lng,
        };
        const dropOffPosition = {
            lat: dropOffAddress.lat,
            lng: dropOffAddress.lng,
        };
        const passengerDetails = this.form.getRawValue();
        for (let key in passengerDetails) {
            if (passengerDetails[key] != null) {
                passengerDetails[key] = passengerDetails[key].trim();
            }
        }
        passengerDetails.firstName = '';
        passengerDetails.lastName = '';
        const splitPassengerName = passengerDetails.name.split(' ');
        passengerDetails.firstName = splitPassengerName[0];
        if (splitPassengerName.length > 1) {
            splitPassengerName.shift();
            passengerDetails.lastName = splitPassengerName.join(' ');
        }
        if (passengerDetails.lastName === '') {
            passengerDetails.lastName = ' ';
        }
        passengerDetails.phone =
            this.phoneNumberInputComponent.getFormattedPhoneNumber();
        const zoneId = this.tripDetailsService.zoneId;
        let date;
        if (this.isNow) {
            date = this.sharedService.getCurrentTimeInUTC(zoneId);
        } else {
            date = this.sharedService.convertTimeToUTC(
                zoneId,
                this.pickupDate,
                this.pickupTime
            );
        }
        if (this.isWillCall) {
            date = this.sharedService.convertTimeToUTC(
                zoneId,
                this.pickupDate,
                this.pickupTime
            );
        } else {
            date = this.sharedService.getCurrentTimeInUTC(zoneId);
        }

        const strAccountNbr = this.sharedService.custId;
        const PricingEngineData = this.displayFare.PricingEngineData;
        let parameters: any = {
            userId: this.sharedService.userId, // need to randomly generate these for unauth guests
            comment: passengerDetails.comment,
            pkupDate: date,
            pkupStreet:
                pickupAddress.address.houseNumber +
                ' ' +
                pickupAddress.address.street,
            pkupApt: '', // ! need to set this
            pkupCity: pickupAddress.address.city,
            pkupState: pickupAddress.address.stateCode,
            pkupZip: pickupAddress.address.postalCode.split('-')[0],
            pkupLat: pickupPosition.lat,
            pkupLng: pickupPosition.lng,
            destStreet:
                dropOffAddress.address.houseNumber +
                ' ' +
                dropOffAddress.address.street,
            destApt: '', // ! need to set this
            destCity: dropOffAddress.address.city,
            destState: dropOffAddress.address.stateCode,
            destZip: dropOffAddress.address.postalCode.split('-')[0],
            destLat: dropOffPosition.lat,
            destLng: dropOffPosition.lng,
            nbrPass: 1, // not being used currently, but still required
            tripRate: this.displayFare.fare, // ! need to make sure this is right for discounted trips
            distance: this.displayFare.miles,
            timeEstimate: this.displayFare.minutes,
            isNow: this.isNow, // ! changes depending on trip type
            couponId: String(this.displayFare.promoId != null ? this.displayFare.promoId : ''),
            source: '9994', // ! need to figure out which code to use for this. Talk to Shan && Chad
            vehicleType: this.selectedVehicleType.type,
            pickupTime: '', // this does not appear to still be used
            paymentId: '',
            paymentMethod: '', // ! what are the other possible values for this?
            tip: 0,
            tipType: '',
            isWillCall: this.isWillCall, // ! changes depending on if it is a walkup trip or not
            phone: passengerDetails.phone,
            firstName: passengerDetails.firstName,
            lastName: passengerDetails.lastName,
            passEmail: passengerDetails.email,
            PkupName: pickupAddress.title,
            DestName: dropOffAddress.title,
            isLive,
            processingFee: this.displayFare.processingFee,
            strAccountNbr: strAccountNbr,
            ClientInfo1: this.questionsAnswer[0],
            ClientInfo2: this.questionsAnswer[1],
            ClientInfo3: this.questionsAnswer[2],
            ClientInfo4: this.questionsAnswer[3],
            ClientInfo5: this.questionsAnswer[4],
            ClientInfo6: this.questionsAnswer[5],
            PricingEngineData: PricingEngineData,
            ApiStage: flag
        };


        this.insertTripInProgress = true;
        this.api
            .InsertTrip(
                parameters.userId,
                parameters.comment,
                parameters.pkupDate,
                parameters.pkupStreet,
                parameters.pkupApt,
                parameters.pkupCity,
                parameters.pkupState,
                parameters.pkupZip,
                parameters.pkupLat,
                parameters.pkupLng,
                parameters.destStreet,
                parameters.destApt,
                parameters.destCity,
                parameters.destState,
                parameters.destZip,
                parameters.destLat,
                parameters.destLng,
                parameters.nbrPass,
                parameters.tripRate,
                parameters.distance,
                parameters.timeEstimate,
                parameters.isNow,
                parameters.couponId,
                parameters.source,
                parameters.vehicleType,
                parameters.pickupTime,
                parameters.paymentId,
                parameters.paymentMethod,
                parameters.tip,
                parameters.tipType,
                parameters.isWillCall,
                parameters.phone,
                parameters.firstName,
                parameters.lastName,
                parameters.passEmail,
                parameters.PkupName,
                parameters.DestName,
                parameters.isLive,
                parameters.processingFee,
                this.questionsAnswer[0],
                this.questionsAnswer[1],
                this.questionsAnswer[2],
                this.questionsAnswer[3],
                this.questionsAnswer[4],
                this.questionsAnswer[5],
                parameters.strAccountNbr,
                parameters.PricingEngineData,
                parameters.ApiStage
            )
            .then((response: InsertTripResponse) => {
                const data = response.data;
                if (response.error) {
                    this.insertTripInProgress = false;
                    const messages = response.messages[0];
                    // removed erorr dialog at the moment.
                    this.modalService.openModal(
                        `Error!`,
                        `${messages.userMessage}`,
                        false
                    );
                } else {
                    this.insertTripInProgress = false;
                    this.tripNbr = data.tripNbr;

                    this.questions = response.data.questions;
                }
            })
            .catch((err: any) => {
                this.insertTripInProgress = false;
                console.log("farePrice Error==", err);
                this.modalService.openModal(
                    'Something went wrong. Please try again. ' +
                    JSON.stringify(err),
                    null,
                    false
                );
            });

    }

    public infoTripCodeClick(): void {
        this.dialog.open(InfoTripCodeModalComponent,
            {
                width: "380px"
            }
        );
    }

    private validateRideDetails(): boolean {
        this.showRideDetailsError();
        return (
            this.form.valid &&
            this.phoneNumberInputComponent.getFormattedPhoneNumber() != null &&
            this.selectAddressService.pickupAddress != null &&
            this.selectAddressService.dropOffAddress != null &&
            this.selectAddressService.pickupInServiceArea
        );
    }

    public validateEmail(): void {
        this.form.controls['email'].markAsTouched(); // Mark the field as touched to trigger the validation
    }

    private showRideDetailsError(): void {
        let errors = [];
        const phoneNumber =
            this.phoneNumberInputComponent.getFormattedPhoneNumber();
        if (this.selectAddressService.pickupAddress == null) {
            errors.push('Pickup location required.');
        }
        if (this.selectAddressService.dropOffAddress == null) {
            errors.push('Drop-off location required');
        }

        if (!this.selectAddressService.pickupInServiceArea) {
            errors.push('Pickup location is not in service area.');
        }


        this.phoneNumberInputComponent.invalidPhoneNumber = false;
        if (!this.form.valid || phoneNumber == null) {
            const controls = this.form.controls;

            // set submitted to true 
            this.submitted = true;

            // initialize 
            this.requiredEmail = false;
            this.invalidEmail = false;
            this.requiredName = false;

            this.phoneNumberInputComponent.requiredPhoneNumber = false;
            this.phoneNumberInputComponent.invalidPhoneNumber = false;

            Object.keys(controls).forEach(key => {
                controls[key].markAsTouched();
            });

            if (controls['name'].hasError('required')) {
                errors.push('Passenger Name is required.');
                this.requiredName = true;
            }

            // do phone number check here to keep the errors in the same orders as the
            // form controls

            if (this.phoneNumberInputComponent.phoneNumber == null || this.phoneNumberInputComponent.phoneNumber == '') {
                errors.push('Phone number is required.');
                this.phoneNumberInputComponent.requiredPhoneNumber = true;
                this.phoneNumberInputComponent.invalidPhoneNumber = false;
            } else if (phoneNumber == undefined) {
                errors.push('Phone number is invalid.');
                this.phoneNumberInputComponent.requiredPhoneNumber = false;
                this.phoneNumberInputComponent.invalidPhoneNumber = true;
            }

            if (controls['email'].hasError('required')) {
                errors.push('Email is required.');
                this.requiredEmail = this.form.controls['email'].invalid;
            } else if (controls['email'].hasError('email')) {
                errors.push('Email is invalid.');
                this.invalidEmail = this.form.controls['email'].invalid;
            }
        }
        if (errors.length > 0) {
            let dialogConfig = {
                data: {
                    errors,
                },
            };
        }
    }

    public onFocusInput(event: any, field: string): void {
        this.onFocusOtherInputs(field);
        if (field == "passenger")
            this.focusPassenger = true;
        else if (field == "email")
            this.focusEmail = true;

    }

    public onFocusInputOut(event: any, field: string): void {
        if (field == "passenger")
            this.focusPassenger = false;
        else if (field == "email") {
            this.focusEmail = false;
        }
    }

    public onChangePassengerName(event: any): void {
        if (this.requiredName) {
            if (event.target.value.length < 2) {
                this.isTwoLetterError = true;
            } else
                this.isTwoLetterError = false;
        }
        this.nextBtnState()
    }
    public onChangeQuestion(event: any): void {
        this.questionsAnswer[event.target.id] = event.target.value;
    }

    private resetForm(): void {
        this.form.reset();
        this.phoneNumberInputComponent.reset();
        this.bookingService.resetBooking();
        this.showCabAndFare = false;
        this.showPassengerDetails = false;
        this.selectedVehicleType = null;
        this.isReturn = false;
        this.pickupDate = new Date();
        this.pickupTime = {
            hours: 0,
            minutes: 0,
            period: 'AM',
        };
        this.sharedService.pickupDate = new Date();
        this.sharedService.pickupTime =  {
            hours: 0,
            minutes: 0,
            period: 'AM',
        };
        this.returnDate = null;
        this.selectedDateTimeShow = '';
        this.selectedDateShow = '';
        this.secondLoop = false;
        this.form.patchValue({
            email: this.username
        });
        window.location.reload();
    }

    public bookScheduledTrip(): void {
        // When click Request Ride button
        if (!this.validateRideDetails()) {
            this.rightBoxDisplay = false;
            return;
        }

        this.isWillCall = false;
        this.insertTrip(true);

        /**
         * TODO: Here should be request ride confirmation screen
         */

        // this.insertTrip(true);
    }

    public bookWalkUpTrip(): void {
        if (!this.validateRideDetails()) {
            return;
        }
        this.openTripCodeConfirmationModal()
            .then((res: boolean) => {
                if (res === true) {
                    this.isWillCall = true;
                    this.insertTrip(true);
                    this.rightBoxDisplay = false;
                }
            })
            .catch((err) => console.log(err));
    }

    public accountAnswerTrip(): void {
        if (!this.validateRideDetails()) {
            return;
        }
    }

    private openTripCodeConfirmationModal(): Promise<boolean> {
        if (this.isPickupAirport) {
            const dialogRef = this.dialog.open(RideRequestPolygonTripCodeConfirmationModalComponent, {
                data: {
                    pickupName: this.pickupAirportName ? this.pickupAirportName : '' //this.selectAddressService.pickupAddress.title
                },
                width: "380px"
            });
            return new Promise((resolve) => {
                dialogRef.afterClosed().subscribe((result: boolean) => {
                    resolve(result);
                });
            });

        } else {
            const dialogRef = this.dialog.open(TripCodeConfirmationModalComponent, {
                width: "380px"
            });
            return new Promise((resolve) => {
                dialogRef.afterClosed().subscribe((result: boolean) => {
                    resolve(result);
                });
            });
        }
    }

    formatDate(date: Date): any {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const suffix = this.getOrdinalSuffix(day);
        const dayStr = `${day}${suffix}`;
        const formatedDate = `${date.toLocaleString('default', { weekday: 'short' })}, ${month} ${dayStr}`;
        return formatedDate;
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

    private clearFare(): void {
        this.displayFare = null;
        this.tripDetailsService.clearFare();
    }

    private setPickupDateTime(): void {
        if (this.isNow && this.selectedVehicleType) {
            this.tripDetailsService.setEta(this.selectedVehicleType.eta);
        }

        let tempPickupDate = String(this.formatDate(this.pickupDate))
        tempPickupDate = tempPickupDate.substring(0, tempPickupDate.length - 2)

        let tempHours = String(this.pickupTime.hours).length == 1 ? "0" + String(this.pickupTime.hours) : String(this.pickupTime.hours);
        let tempMins = String(this.pickupTime.minutes).length == 1 ? "0" + String(this.pickupTime.minutes) : String(this.pickupTime.minutes);
        if (this.isPickupAirport) {
            this.selectedDateTimeShow = tempPickupDate;
        } else {
            this.selectedDateTimeShow = tempPickupDate + " at " + tempHours + ":" + tempMins + " " + this.pickupTime.period;
        }
        this.selectedDateShow = tempPickupDate;
        //String(this.formatDate(this.pickupDate)).substring(0, tempPickupDate.length - 2)

        // this.tripDetailsService.setPickupDateTime(
        //     this.pickupDate,
        //     this.pickupTime,
        //     this.isNow
        // );
    }

    private setSelectedDateTimeShow(): void {
        console.log(this.pickupDate)
        this.initPickupDateTime();
        let tempPickupDate = String(this.formatDate(this.pickupDate));
        tempPickupDate = tempPickupDate.substring(0, tempPickupDate.length - 2);
        let tempHours = String(this.pickupTime.hours).length == 1 ? "0" + String(this.pickupTime.hours) : String(this.pickupTime.hours);
        let tempMins = String(this.pickupTime.minutes).length == 1 ? "0" + String(this.pickupTime.minutes) : String(this.pickupTime.minutes);
        if (this.isPickupAirport) {
            this.selectedDateTimeShow = tempPickupDate;
        } else {
            this.selectedDateTimeShow = tempPickupDate + " at " + tempHours + ":" + tempMins + " " + this.pickupTime.period;
        }
        this.selectedDateShow = tempPickupDate;
    }

    public dragging(): void {
        const top =
            this.rideDetailsContainer.nativeElement.getBoundingClientRect().top;
        if (top <= 1) {
            this.allowScroll = true;
        } else {
            this.allowScroll = false;
        }
    }

    public dragDropped(event: CdkDragDrop<any>): void {
        const direction = event.currentIndex > event.previousIndex ? 'down' : 'up';
    }

    // when click drag bar
    public onClickDragBar(): void {
        this.isSwipedUp = !this.isSwipedUp
    }

    public onInputNoteDriver(event: any): void {
        console.log(event.target.value);
        this.noteDriver = event.target.value;
        this.nextBtnState()
    }

    public onFocusOtherInputs(field: string): void {

        if (!this.isSwipedUp)
            this.onClickDragBar();

        if (field == "passenger")
            this.rideDetailsSmallContainer.nativeElement.scrollTop = 380;
        else if (field == "email")
            this.rideDetailsSmallContainer.nativeElement.scrollTop = 498;
        else if (field == "note")
            this.rideDetailsSmallContainer.nativeElement.scrollTop = 535;

    }

    public canDrag(): boolean {

        if (
            this.scrollPosition != 0)
            return false;   // drag enable
        else
            return true;        // drag

    }

    public onScroll(): void {
        this.scrollPosition = this.rideDetailsContainer.nativeElement.scrollTop;
    }

    onSelectedDate(event: any) {
        if (event.panelState == 'willCall') {
            this.isWillCall = true;
            this.isNow = false;
            this.sharedService.isNow = false;
        } else if (event.panelState == 'schedule') {
            this.pickupDate = event.selectDate;
            this.pickupTime = event.selectTime;
            this.isNow = false;
            this.sharedService.isNow = false;
            this.isWillCall = false;
        } else if (event.panelState == 'returnTime') {
            this.returnDate = event.selectDate;
            this.returnTrip();
        } else {
            this.isNow = true;
            this.sharedService.isNow = false;
            this.isWillCall = false;
        }
        this.displayBubble.emit(true);
        this.tripDetailsService.getFare();
    }

    public changePickup(): void {
        this.openDateTimeModal();
    }

    public openDateTimeModal(): void {

        console.log(this.pickupNow.nativeElement)
        let dialogRef

        if (this.isNow)
            this.initPickupDateTime();
        // 
        this.pickupTime.hours     // hours
        this.pickupTime.minutes   // minutes
        this.pickupTime.period    // PM or AM

        this.pickupDate           // 
        this.timeZoneAbbrev
        this.currentDate

        if (!this.isMobile) {
            dialogRef = this.dialog.open(DateTimeSelectComponent, {
                width: '350px',
                autoFocus: false,
                panelClass: 'dateTimeSelect-custom-dialog',
                data: {
                    currentDate: this.currentDate,
                    pickupTime: this.pickupTime,
                    timeZoneAbbrev: this.timeZoneAbbrev,
                    pickupDate: this.pickupDate,
                    isPickupAirport: this.isPickupAirport
                },
                position: {
                    left: this.pickupNow.nativeElement.offsetLeft + 16 + 'px',
                    top: this.pickupNow.nativeElement.offsetTop + this.pickupNow.nativeElement.offsetHeight + 'px'
                }
            });
        } else {
            dialogRef = this.dialog.open(DateTimeSelectComponent, {
                width: '350px',
                autoFocus: false,
                panelClass: 'dateTimeSelect-custom-dialog',
                data: {
                    currentDate: this.currentDate,
                    pickupTime: this.pickupTime,
                    timeZoneAbbrev: this.timeZoneAbbrev,
                    pickupDate: this.pickupDate,
                    isPickupAirport: this.isPickupAirport
                }
            });
        }

        dialogRef.afterClosed().subscribe((result) => {
            if (result != null) {
                const pickupDate = result.pickupDate;
                const pickupTime = result.pickupTime;
                const reset = result.reset;
                
                this.sharedService.pickupDate = result.pickupDate;
                this.sharedService.pickupTime = result.pickupTime;
                
                this.pickupDate = pickupDate;
                this.pickupTime = pickupTime;
                this.sharedService.getPickupDate(true);

                if (reset) {
                    this.isNow = true;
                    this.sharedService.isNow = true;
                    this.selectedDateTimeShow = "";
                    this.selectedDateShow = "";
                    this.initPickupDateTime();
                    this.sharedService.getPickupDate(false);
                } else {
                    this.isNow = false;
                    this.sharedService.isNow = false;

                }
                this.tripDetailsService.getFare();
                this.setPickupDateTime();
            } else {
                if (this.pickupDate == null) {
                    this.isNow = !this.isNow
                    this.sharedService.isNow = this.isNow;
                }

            }
            this.displayBubble.emit(true);
        });
    }
    public initPickupDateTime(): void {
        const date = new Date();
        date.setMinutes(date.getMinutes());
        this.pickupTime = {
            hours: date.getHours(),
            minutes: Math.ceil(date.getMinutes() / 5) * 5,
            period: date.getHours() >= 12 ? 'PM' : 'AM',
        };

        this.sharedService.pickupTime =  {
            hours: date.getHours(),
            minutes: Math.ceil(date.getMinutes() / 5) * 5,
            period: date.getHours() >= 12 ? 'PM' : 'AM',
        };

        if (this.pickupTime.minutes === 60) {
            this.pickupTime.minutes = 0;
            this.sharedService.pickupTime.minutes = 0;
        }

        if (this.pickupTime.hours > 12) {
            this.pickupTime.hours = this.pickupTime.hours - 12;
            this.sharedService.pickupTime.hours = this.pickupTime.hour - 12;
        }
        this.currentDate = date;
        this.pickupDate = date;
        this.sharedService.pickupDate = date;


        this.tripDetailsService.pickupDate = this.pickupDate;
        this.tripDetailsService.pickupTime = this.pickupTime;

        this.timeZoneAbbrev = this.sharedService.getTimeZoneAbbrev(
            this.tripDetailsService.zoneId
        );
    }

    controlPhone(event: any) {
        console.log(event)
        this.savedPhoneNumber = event
    }

    pickupClear(event: string) {
        this.showCabAndFare = false;
    }

    willCallCheckState(event: boolean) {
        this.isWillCall = event;
    }

    onWillCallPhone(event: string) {

        this.phoneNumber = event;
    }

    returnTrip() {
        this.returnTripState = true;
        this.isReturn = true;
        this.displayReturnTripCode = false;
    }
    isReturnTrip(event: boolean) {
        this.returnTripState = event;
        this.isReturn = event;
        this.displayReturnTripCode = !event;
        this.returnDate = event ? new Date : null;
    }
    onTripType(event: string) {
        this.tripType = event;
        console.log(event);
    }

}
