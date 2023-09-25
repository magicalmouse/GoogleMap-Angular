import { HttpClient, HttpHeaders, HttpParams,  } from '@angular/common/http';
import {
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
    Input
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { AddressSuggestion } from 'src/app/shared/Address.model';
import { ColorSchemeService } from 'src/theming.service';
import { SelectAddressService } from '../shared/select-address.service';

import { APIService, Vehicle } from 'src/app/API.service';
import { ModalService } from 'src/app/shared/Modal/Modal.service';
import { TripDetailsService } from '../shared/trip-details.service';
import { SharedService } from 'src/app/shared/shared.service';
import { hereApiKey, hereEngineKey } from 'credentials';

declare var H: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit, OnDestroy {

    @Input('outDisplayBubble') outDisplayBubble: boolean;
    showMapInitError = false;
    private platform: any;
    map: any;
    behavior: any;
    ui: any;
    events: any;
    bounds: any;
    router: any;
    defaultLayers: any;
    baseLayer: any;

    lightMap: any;
    darkMap: any;

    points: any;

    userLocationSetSubscription: Subscription = null;
    selectUserLocationSubscription: Subscription = null;
    clearUserLocationSetSubscription: Subscription = null;
    selectPickupAddressSubscription: Subscription = null;
    selectDropOffAddressSubscription: Subscription = null;
    clearPickupAddressSubscription: Subscription = null;
    clearDropOffAddressSubscription: Subscription = null;
    themeChangedSubscription: Subscription = null;
    tripTimeSetSubscription: Subscription = null;
    etaSetSubscription: Subscription = null;
    getNearbyVehiclesSubscription: Subscription = null;
    pickupDateTimeChangedSubscription: Subscription = null;
    fareCalculatedSubscription: Subscription = null;
    subscriptions: Subscription[] = [
        this.userLocationSetSubscription,
        this.selectUserLocationSubscription,
        this.clearUserLocationSetSubscription,
        this.selectPickupAddressSubscription,
        this.selectDropOffAddressSubscription,
        this.clearPickupAddressSubscription,
        this.clearDropOffAddressSubscription,
        this.themeChangedSubscription,
        this.tripTimeSetSubscription,
        this.etaSetSubscription,
        this.getNearbyVehiclesSubscription,
        this.pickupDateTimeChangedSubscription,
        this.fareCalculatedSubscription,
    ];

    isNow: boolean;

    @ViewChild('map') mapElement!: ElementRef;

    pickupAddress: AddressSuggestion | null = null;
    dropOffAddress: AddressSuggestion | null = null;

    pickupMarker: any = null;
    dropOffMarker: any = null;
    userLocationMarker: any = null;
    userLocationMarkerShadow: any = null;

    etaInfoBubble: any = null;
    arrivalInfoBubble: any = null;
    tripTime: any = null;

    routeLines: any = [];

    lineString: any = null;
    vehicles: any = {};
    vehiclesGroup: any;

    public constructor(
        private api: APIService,
        private selectAddressService: SelectAddressService,
        private tripDetailsService: TripDetailsService,
        private colorSchemeService: ColorSchemeService,
        private http: HttpClient,
        private modalService: ModalService,
        private sharedService: SharedService
    ) {
        this.userLocationSetSubscription =
            this.selectAddressService.userLocationSet.subscribe(() => {
                this.initializeMap();
            });
        
        this.selectUserLocationSubscription = 
            this.selectAddressService.userLocationSelected.subscribe(() => {
                this.setUserLocationMarker();
            })
        this.clearUserLocationSetSubscription = 
            this.selectAddressService.userLocationSetCleared.subscribe(() => {
                this.clearUserLocationMarker();
                this.clearUserLocationMarkerShadow();
            })
        this.selectPickupAddressSubscription =
            this.selectAddressService.pickupAddressSelected.subscribe(
                (address) => {
                    console.log("map pickupaddress subscript")
                    console.log('selectPickupAddressSubscription');
                    if(!this.selectAddressService.showUserLocation) {
                        console.log('real selectPickupAddressSubscription');
                        this.setPickupAddressMarker(address);
                    }
                }
            );
        this.selectDropOffAddressSubscription =
            this.selectAddressService.dropOffAddressSelected.subscribe(
                (address) => {
                    if (
                        this.selectAddressService.pickupAddress == null ||
                        this.selectAddressService.pickupInServiceArea
                    ) {
                        this.setDropOffAddressMarker(address);
                    }
                }
            );
        this.clearPickupAddressSubscription =
            this.selectAddressService.pickupAddressCleared.subscribe(() => {
                this.clearPickupAddress();
            });

        this.clearDropOffAddressSubscription =
            this.selectAddressService.dropOffAddressCleared.subscribe(() => {
                this.clearDropOffAddress();
            });
        this.themeChangedSubscription =
            this.colorSchemeService.themeChanged.subscribe((theme: string) => {
                if (theme === 'dark') {
                    this.baseLayer = this.darkMap;
                } else {
                    this.baseLayer = this.lightMap;
                }
                this.map.setBaseLayer(this.baseLayer);
            });

        this.tripTimeSetSubscription =
            this.tripDetailsService.tripTimeSet.subscribe((response: any) => {
                if (this.isNow) {
                    console.log('set arrival and eta bubbles');
                    this.tripTime = response.tripTime;
                    this.setArrivalInfoBubble(response.eta, response.tripTime);
                    this.setEtaInfoBubble(response.eta);
                    this.clearVehiclesOnMap();
                }
            });
        
        this.etaSetSubscription = 
            this.tripDetailsService.etaSet.subscribe((response: any) => {
                if (this.isNow) {
                    this.setEtaInfoBubble(response.eta);

                    if(this.arrivalInfoBubble && this.tripTime) {
                        this.setArrivalInfoBubble(response.eta, this.tripTime);
                    }
                }
            })
        this.getNearbyVehiclesSubscription = interval(30000).subscribe(() => {
            if (this.isNow) {
                if (this.pickupAddress != null && this.pickupMarker != null) {
                    this.getNearbyVehicles();
                }
            }
        });

        this.pickupDateTimeChangedSubscription =
            this.tripDetailsService.pickupDateTimeChanged.subscribe((isNow) => {
                this.isNow = isNow;
                this.updateMapOnPickupDateTimeChanged();
            });
    }

    // resizes the map if the window size changes
    @HostListener('window:resize', ['$event']) onResize(): void {
        if (this.map) {
            const viewPort = this.map.getViewPort();
            viewPort.resize();
            this.setMapBounds();
        }
    }

    public ngOnInit(): void {
        this.isNow = this.tripDetailsService.isNow;
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
        this.unsubscribeVehicleStatus();
    }

    private initializeMap(): void {
        console.log('initialize map');
        this.platform = new H.service.Platform({
            apikey: hereApiKey,
        });
        this.router = this.platform.getRoutingService(null, 8);
        this.defaultLayers = this.platform.createDefaultLayers();
        this.lightMap = this.defaultLayers.raster.normal.map;
        this.darkMap = this.defaultLayers.raster.normal.mapnight;

        
        
        this.baseLayer =
            this.colorSchemeService.colorScheme === 'dark'
                ? this.darkMap
                : this.lightMap;
        
        console.log("userLocatino in Initialize map", this.selectAddressService.userLocation)
        // this.map = new H.Map(this.mapElement.nativeElement, this.baseLayer, {
        //     zoom: 14,
        //     center: {
        //         lat: this.selectAddressService.userLocation.lat,
        //         lng: this.selectAddressService.userLocation.lng,
        //     },
        //     pixelRatio: 2,           //set high resolution
        //     // renderBaseBackground: {lower: 6, higher: 5}
        // });
        
        // set the default map veiw to San Diego and Los Angeles and Orange
        // zoom: 9,
        // center: {
        //     lat: 33.674069,
        //     lng: -118.363909
        // },
        const general_view = {
            zoom: 9,
            center: {
                lat: 33.674069,
                lng: -118.363909
            }
        }

        const la_view = {
            zoom: 11,
            center: {
                lat: 33.972976,
                lng: -118.231419
            }
        }

        const san_diego_view = {
            zoom: 12,
            center: {
                lat: 32.718266,
                lng: -117.162835
            }
        }

        const orange_view = {
            zoom: 12,
            center: {
                lat: 33.7175,
                lng: -117.8311
            }
        }

        // current location
        //         lat: this.selectAddressService.userLocation.lat,
        //         lng: this.selectAddressService.userLocation.lng,

        // Shan location
        // 34.165268565297204, -118.4542219104649

        // set the range for 3 options
        // Define the bounding boxes for each city/county
        const losAngelesBoundingBox = {
            minLat: 33.7037,
            maxLat: 34.3373,
            minLng: -118.6682,
            maxLng: -118.1553
        };
        
        const sanDiegoBoundingBox = {
            minLat: 32.5349,
            maxLat: 33.3617,
            minLng: -117.4315,
            maxLng: -116.7925
        };
        
        const orangeCountyBoundingBox = {
            minLat: 33.4511,
            maxLat: 33.9263,
            minLng: -118.2716,
            maxLng: -117.3381
        };
        
        // Replace LATITUDE and LONGITUDE with the coordinates you want to check
       
        const lat =  this.selectAddressService.userLocation.lat;
        const lng =  this.selectAddressService.userLocation.lng;

        // alert(lat + " :: " + lng)
        // const lat = 34.165268565297204;
        // const lng = -118.4542219104649;

        let resultZoom;
        let resultLat;
        let resultLon;
        // Check if the coordinates fall within one of the bounding boxes
        if (
            lat >= losAngelesBoundingBox.minLat &&
            lat <= losAngelesBoundingBox.maxLat &&
            lng >= losAngelesBoundingBox.minLng &&
            lng <= losAngelesBoundingBox.maxLng
            ) {
            console.log("The coordinates are within Los Angeles.");
            resultZoom = la_view.zoom;
            resultLat = la_view.center.lat;
            resultLon = la_view.center.lng;
        } else if (
            lat >= sanDiegoBoundingBox.minLat &&
            lat <= sanDiegoBoundingBox.maxLat &&
            lng >= sanDiegoBoundingBox.minLng &&
            lng <= sanDiegoBoundingBox.maxLng
            ) {
            console.log("The coordinates are within San Diego.");
            resultZoom = san_diego_view.zoom;
            resultLat = san_diego_view.center.lat;
            resultLon = san_diego_view.center.lng;
        } else if (
            lat >= orangeCountyBoundingBox.minLat &&
            lat <= orangeCountyBoundingBox.maxLat &&
            lng >= orangeCountyBoundingBox.minLng &&
            lng <= orangeCountyBoundingBox.maxLng
            ) {
            console.log("The coordinates are within Orange County.");
            resultZoom = orange_view.zoom;
            resultLat = orange_view.center.lat;
            resultLon = orange_view.center.lng;
        } else {
            console.log("The coordinates are not within Los Angeles, San Diego, or Orange County.");
            resultZoom = general_view.zoom;
            resultLat = general_view.center.lat;
            resultLon = general_view.center.lng;
        }

        // set the default map view with result zoom, lat and lon
        this.map = new H.Map(this.mapElement.nativeElement, 
            this.baseLayer, 
            {
                zoom: resultZoom,
                center: {
                    lat: resultLat,
                    lng: resultLon
                },
            // pixelRatio: 2,           //set high resolution
            // renderBaseBackground: {lower: 6, higher: 5}
        });
        
        this.colorSchemeService.update('dark');

        // set the limit of zoom out and in
        this.darkMap
            .setMin(8)          // zoom out  -   100mi
            .setMax(20);        // zoom in
        this.lightMap
            .setMin(8)          // zoom out  -   100mi
            .setMax(20);        // zoom in
            
        if (this.map != null) {
            this.events = new H.mapevents.MapEvents(this.map);
            this.behavior = new H.mapevents.Behavior(this.events);

            this.vehiclesGroup = new H.map.Group();
            this.map.addObject(this.vehiclesGroup);

            const self = this;
            this.map.addEventListener('pointerenter', () => {
                self.mapElement.nativeElement.style.cursor = 'grab';
            });

            this.map.addEventListener('pointerleave', () => {
                self.mapElement.nativeElement.style.cursor = 'default';
            });

            this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
            this.ui.setUnitSystem(H.ui.UnitSystem.IMPERIAL);
            this.ui.getControl('mapsettings').setVisibility(false);
            this.ui.getControl('zoom').setVisibility(false);

            // new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
            
            
            this.setStyle(this.map);
            
            this.changeFeatureStyle(this.map);
            this.setUserLocationMarker();
        } else {
            this.showMapInitError = true;
        }
    }

    public setStyle(map: any) {
       // get the vector provider from the vector layer
//   var provider = map.getLayers().get(1).getProvider(); //get provider from vector layer
  var provider = map.getBaseLayer().getProvider();
  
  // Create the style object from the YAML configuration.
  // First argument is the style path and the second is the base URL to use for
  // resolving relative URLs in the style like textures, fonts.
  // all referenced resources relative to the base path https://js.api.here.com/v3/3.1/styles/omv.
  var style = new H.map.Style('https://heremaps.github.io/maps-api-for-javascript-examples/change-style-at-load/data/dark.yaml',
    'https://js.api.here.com/v3/3.1/styles/omv/');
  // set the style on the existing layer
  provider.setStyle(style);
    }

    public changeFeatureStyle (map: any) {
       // get the vector provider from the vector layer
        // var provider = map.getLayers().get(1).getProvider(); //get provider from vector layer
        var provider = map.getBaseLayer().getProvider();
        // get the style object for the vector layer
        var vStyle = provider.getStyle();

        var changeListener = (evt: any) => {
            if (vStyle.getState() === H.map.Style.State.READY) {
            vStyle.removeEventListener('change', changeListener);

            // query the sub-section of the style configuration
            // the call removes the subsection from the original configuration
            var vConfig = vStyle.extractConfig([
                        'earth',
                        'continent_label',
                        'road_labels',
                        'places',
                        'buildings.address-labels',
                        'roads.shields',
                        //'landuse.wood',
                        //'landuse.forest',
                        //'landuse.park',
                        'landuse.builtup',
                        'landuse.national_park',
                        'landuse.nature_reserve',
                        'landuse.green-areas',
                        'landuse.other',
                        'water.small_water',
                        'water.deep_water',
                        'water.river'
                        ]);
            }
        };

        vStyle.addEventListener('change', changeListener);
    }

    private setPickupAddressMarker(address: AddressSuggestion): void {
        if (this.map == null) {
            return;
        }
        this.clearPickupAddress();
        this.pickupAddress = address;
        // this.getNearbyVehicles();
        const domIconElement = this.createPickupDiv();
        const icon = new H.map.DomIcon(domIconElement);
        if (this.pickupAddress.title == "Los Angeles Int'l Airport (LAX)"){
            this.pickupMarker = new H.map.DomMarker(
                { lat: 33.947078, lng: -118.398846 },
                { icon }
            );
        }else{
            this.pickupMarker = new H.map.DomMarker(
                { lat: address.lat, lng: address.lng },
                { icon }
            );
        }
        console.log(this.pickupMarker);
        this.map.addObject(this.pickupMarker);

        if (
            this.dropOffMarker == null &&
            this.selectAddressService.dropOffAddress != null
        ) {
            this.setDropOffAddressMarker(
                this.selectAddressService.dropOffAddress
            );
        } else {
            this.setMapBounds();
        }
    }

    private setDropOffAddressMarker(address: AddressSuggestion): void {
        if (this.map == null) {
            return;
        }
        this.clearDropOffAddress();
        this.dropOffAddress = address;
        const domIconElement = this.createDropOffDiv();
        const icon = new H.map.DomIcon(domIconElement);
        this.dropOffMarker = new H.map.DomMarker(
            { lat: address.lat, lng: address.lng },
            { icon }
        );
        this.map.addObject(this.dropOffMarker);
        this.setMapBounds();
    }

    private setUserLocationMarker(): void {
        if (this.map == null) {
            return;
        }
        console.log("set UserLocationMarker in Mapcomponet status=>", this.selectAddressService.showUserLocation, )
        if (this.selectAddressService.showUserLocation) {
            this.setUserLocationMarkerShadow();

            const domIconElement = this.createUserLocationMarker();
            const icon = new H.map.DomIcon(domIconElement);
            this.userLocationMarker = new H.map.DomMarker(
                {
                    lat: this.selectAddressService.userLocation.lat,
                    lng: this.selectAddressService.userLocation.lng,
                },
                { icon }
            );

            // set pickupaddress as userlocation address
            // console.log(this.pickupAddress)
            // if (this.pickupAddress.title == "Los Angeles Int'l Airport (LAX)") {
            //     let address: AddressSuggestion = {
            //         lat: 33.947078,
            //         lng: -118.398846,
            //         title: '',
            //         vicinity: '',
            //         address: null
            //     }
            //     this.pickupAddress = address
            // }else{
                let address : AddressSuggestion = {
                    lat: this.selectAddressService.userLocation.lat,
                    lng: this.selectAddressService.userLocation.lng,                
                    title: '',
                    vicinity: '',
                    address: null
                }
                this.pickupAddress = address
            // }

            this.map.addObject(this.userLocationMarker);
            this.setMapBounds()
        }
    }

    private clearUserLocationMarker(): void {
        console.log('clearUserLocationMarker calling in Map Component')
        if (this.map == null) {
            return;
        }
        console.log('callin clear userLocationMarker');
        if (this.userLocationMarker != null) {
            this.map.removeObject(this.userLocationMarker);
            this.userLocationMarker = null;
        }
    }

    private clearUserLocationMarkerShadow(): void {
        console.log('clearUserLocationMarkerShadow calling in Map Component')
        if (this.map == null) {
            return;
        }
        console.log('callin clear userLocationMarker');
        if (this.userLocationMarkerShadow != null) {
            this.map.removeObject(this.userLocationMarkerShadow);
            this.userLocationMarkerShadow = null;
        }
    }

    private setEtaInfoBubble(eta: number): void {
        if (this.map == null) {
            return;
        }
        console.log(this.outDisplayBubble);

        const str: string = this.pickupAddress.title;
        const airport1: string = "Los Angeles Int'l Airport (LAX)";
        const airport2: string = 'John Wayne Airport-Orange County';
        const airport3: string = "San Diego Int'l Airport";
        const index1: number = str.indexOf(airport1);
        const index2: number = str.indexOf(airport2);
        const index3: number = str.indexOf(airport3);

        const containerElement = document.createElement('div');
        // containerElement.style.display = 'inline-block';
        containerElement.style.display = this.sharedService.isbubble ? 'inline-block' : 'none';
        containerElement.id = 'eta-info-bubble';
        if(index1 == -1 && index2 == -1 && index3 == -1){
            containerElement.innerHTML = `
            <div style = "opacity: 0;">
                <div class = "info-bubble">
                    <div class = "info-bubble-title" >Pickup</div>
                    <div class = "info-bubble-subtitle" >${eta} min</div>
                </div>
                <div class = "info-bubble-tail"></div>
            </div>
            `;
            const domIconElement = containerElement;
            const icon = new H.map.DomIcon(domIconElement, {
                onAttach: function (
                    clonedElement: any,
                    domIcon: any,
                    domMarker: any
                ) {
                    // set last used value for rotation when dom icon is attached (back in map's viewport)
                    const clonedContent =
                        clonedElement.getElementsByTagName('div')[0];
                    clonedContent.style.marginTop = `-${clonedContent.offsetHeight + 10
                        }px`;
                    clonedContent.style.marginLeft = `-${clonedContent.offsetWidth / 2 - 11 - 5
                        }px`; // 11 is circle radius, 5 is padding
                    clonedContent.style.opacity = '1';
                },
            });
            if (this.etaInfoBubble != null) {
                this.map.removeObject(this.etaInfoBubble);
                this.etaInfoBubble = null;
            }
            this.etaInfoBubble = new H.map.DomMarker(
                {
                    lat: this.pickupAddress.lat,
                    lng: this.pickupAddress.lng,
                },
                { icon }
            );
            this.map.addObject(this.etaInfoBubble);
        } else{
            if (index1 != -1){
                containerElement.innerHTML = `
                <div style = "opacity: 0;">
                    <div class = "info-bubble">
                        <div class = "info-bubble-title" >Pickup</div>
                        <div class = "info-bubble-subtitle" >LAX-it</div>
                    </div>
                    <div class = "info-bubble-tail"></div>
                </div>
                `;
                const domIconElement = containerElement;
                const icon = new H.map.DomIcon(domIconElement, {
                    onAttach: function (
                        clonedElement: any,
                        domIcon: any,
                        domMarker: any
                    ) {
                        // set last used value for rotation when dom icon is attached (back in map's viewport)
                        const clonedContent =
                            clonedElement.getElementsByTagName('div')[0];
                        clonedContent.style.marginTop = `-${clonedContent.offsetHeight + 10
                            }px`;
                        clonedContent.style.marginLeft = `-${clonedContent.offsetWidth / 2 - 11 - 5
                            }px`; // 11 is circle radius, 5 is padding
                        clonedContent.style.opacity = '1';
                    },
                });
                if (this.etaInfoBubble != null) {
                    this.map.removeObject(this.etaInfoBubble);
                    this.etaInfoBubble = null;
                }
                this.etaInfoBubble = new H.map.DomMarker(
                    {
                        lat: 33.947078,
                        lng: -118.398846,
                    },
                    { icon }
                );
                this.map.addObject(this.etaInfoBubble);
            } else if (index2 != -1 || index3 != -1) {
                containerElement.innerHTML = `
                <div style = "opacity: 0;">
                    <div class = "info-bubble">
                        <div class = "info-bubble-title" >Pickup</div>
                        <div class = "info-bubble-subtitle" >Taxi Line</div>
                    </div>
                    <div class = "info-bubble-tail"></div>
                </div>
                `;
                const domIconElement = containerElement;
                const icon = new H.map.DomIcon(domIconElement, {
                    onAttach: function (
                        clonedElement: any,
                        domIcon: any,
                        domMarker: any
                    ) {
                        // set last used value for rotation when dom icon is attached (back in map's viewport)
                        const clonedContent =
                            clonedElement.getElementsByTagName('div')[0];
                        clonedContent.style.marginTop = `-${clonedContent.offsetHeight + 10
                            }px`;
                        clonedContent.style.marginLeft = `-${clonedContent.offsetWidth / 2 - 11 - 5
                            }px`; // 11 is circle radius, 5 is padding
                        clonedContent.style.opacity = '1';
                    },
                });
                if (this.etaInfoBubble != null) {
                    this.map.removeObject(this.etaInfoBubble);
                    this.etaInfoBubble = null;
                }
                this.etaInfoBubble = new H.map.DomMarker(
                    {
                        lat: this.pickupAddress.lat,
                        lng: this.pickupAddress.lng,
                    },
                    { icon }
                );
                this.map.addObject(this.etaInfoBubble);
            }
        }
    }

    private setArrivalInfoBubble(eta: number, rideMinutes: number): void {
        if (this.map == null) {
            return;
        }
        const date = new Date();
        let arrivalMinutes = date.getMinutes() + eta + rideMinutes + 5;
        // arrivalMinutes = Math.ceil(arrivalMinutes/10) * 10
        let remainder = arrivalMinutes % 10;

        if(remainder != 0 && remainder != 5)
        {
            if(remainder < 5)
                arrivalMinutes = Math.floor(arrivalMinutes / 10) * 10 + 5;
            else 
                arrivalMinutes = Math.floor(arrivalMinutes / 10) * 10 + 10;
        }

        date.setMinutes(arrivalMinutes);

        const endDate = new Date(date.getTime());
        endDate.setMinutes(endDate.getMinutes() + 10);

        const containerElement = document.createElement('div');
        containerElement.style.display = this.sharedService.isbubble ? 'inline-block' : 'none';
        containerElement.id = 'arrival-info-bubble';
        // containerElement.innerHTML = `
        // <div style = "opacity: 0;">
        //     <div class = "info-bubble">
        //         <div class = "info-bubble-title" >Arrival</div>
        //         <div class = "info-bubble-subtitle" >${this.sharedService.formatTime(
        //             date
        //         )}-${this.sharedService.formatTime(endDate)}</div>
        //     </div>
        //     <div class = "info-bubble-tail"></div>
        // </div>
        // `;
        containerElement.innerHTML = `
        <div style = "opacity: 0;">
            <div class = "info-bubble">
                <div class = "info-bubble-title" >Arrival</div>
                <div class = "info-bubble-subtitle" >${this.sharedService.formatTime(
                    date
                )}</div>
            </div>
            <div class = "info-bubble-tail"></div>
        </div>
        `;
        const domIconElement = containerElement;
        const icon = new H.map.DomIcon(domIconElement, {
            onAttach: function (
                clonedElement: any,
                domIcon: any,
                domMarker: any
            ) {
                // set last used value for rotation when dom icon is attached (back in map's viewport)
                const clonedContent =
                    clonedElement.getElementsByTagName('div')[0];
                clonedContent.style.marginTop = `-${
                    clonedContent.offsetHeight + 10
                }px`;
                clonedContent.style.marginLeft = `-${
                    clonedContent.offsetWidth / 2 - 11 - 5
                }px`; // 11 is circle radius, 5 is padding
                clonedContent.style.opacity = '1';
            },
        });
        if (this.arrivalInfoBubble != null) {
            this.map.removeObject(this.arrivalInfoBubble);
            this.arrivalInfoBubble = null;
        }
        this.arrivalInfoBubble = new H.map.DomMarker(
            {
                lat: this.dropOffAddress.lat,
                lng: this.dropOffAddress.lng,
            },
            { icon }
        );
        this.map.addObject(this.arrivalInfoBubble);
    }

    private createPickupDiv(): HTMLDivElement {
        const domIconElement = document.createElement('div');
        domIconElement.id = 'pickup-marker';
        domIconElement.className = 'location-marker';
        if (this.colorSchemeService.colorScheme === 'dark') {
            // domIconElement.style.backgroundColor = '#D6D6D6';
            domIconElement.style.backgroundColor = '#fff82d';
        } else {
            // domIconElement.style.backgroundColor = '#3F3F41';
            domIconElement.style.backgroundColor = '#fff82d';
        }
        return domIconElement;
    }
    private createDropOffDiv(): HTMLDivElement {
        const domIconElement = document.createElement('div');
        domIconElement.id = 'dropoff-marker';
        domIconElement.className = 'location-marker';
        domIconElement.style.backgroundColor = '#F41952';
        return domIconElement;
    }

    private createUserLocationMarker(): HTMLDivElement {
        const domIconElement = document.createElement('div');
        domIconElement.id = 'user-location-marker';

        return domIconElement;
    }


    private setUserLocationMarkerShadow(): void {
        const domIconElement = document.createElement('div');
        domIconElement.id = 'user-location-marker-shadow';

        const icon = new H.map.DomIcon(domIconElement);
        this.userLocationMarkerShadow = new H.map.DomMarker(
            {
                lat: this.selectAddressService.userLocation.lat,
                lng: this.selectAddressService.userLocation.lng,
            },
            { icon }
        );
        this.map.addObject(this.userLocationMarkerShadow);
    }

    private clearPickupAddress(): void {
        if (this.map == null) {
            return;
        }

        // clear UserLocation together
        // remove blue dot from map
        this.selectAddressService.showUserLocation = false;
        this.clearUserLocationMarker();
        this.clearUserLocationMarkerShadow();
        console.log("clear user location When clearPickupAddress in Map component");
        // 
        console.log('callin clear pickupaddress');
        if (this.pickupMarker != null) {
            this.map.removeObject(this.pickupMarker);
            this.pickupMarker = null;

            if (this.etaInfoBubble != null) {
                this.map.removeObject(this.etaInfoBubble);
                this.etaInfoBubble = null;
            }

            if (this.arrivalInfoBubble != null) {
                this.map.removeObject(this.arrivalInfoBubble);
                this.arrivalInfoBubble = null;
            }
        } 
        // ASE 
        else {
            if (this.etaInfoBubble != null) {
                this.map.removeObject(this.etaInfoBubble);
                this.etaInfoBubble = null;
            }

            if (this.arrivalInfoBubble != null) {
                this.map.removeObject(this.arrivalInfoBubble);
                this.arrivalInfoBubble = null;
            }
        }
        this.clearRouteLine();
        this.clearVehiclesOnMap();
        this.setMapBounds();
    }

    private clearDropOffAddress(): void {
        if (this.map == null) {
            return;
        }
        if (this.dropOffMarker != null) {
            this.map.removeObject(this.dropOffMarker);
            this.dropOffMarker = null;

            if (this.arrivalInfoBubble != null) {
                this.map.removeObject(this.arrivalInfoBubble);
                this.arrivalInfoBubble = null;
            }
        }
        this.clearRouteLine();
        this.setMapBounds();
    }

    private clearRouteLine(): void {
        if (this.map == null) {
            return;
        }
        if (this.routeLines.length != 0) {
            this.routeLines.map((item:any) => 
                this.map.removeObject(item)
            )
            this.routeLines = [];
        }

        if (this.lineString != null) {
            this.lineString = null;
        }

        if (this.points != null) {
            this.points = null;
        }
    }

    private setMapBounds(): void {
        if (this.map == null) {
            return;
        }
        console.log('set map bounds');
        this.bounds = null;
        const viewportWidth = window.innerWidth;
        console.log(viewportWidth);
        const offset = viewportWidth > 900 ? viewportWidth * 0.4 : 0;
        console.log(offset);

        if (this.userLocationMarker) {
            this.checkBounds(this.userLocationMarker.getGeometry());
            this.bounds = this.bounds.mergePoint(
                this.userLocationMarker.getGeometry()
            );
        }

        if (this.pickupMarker) {
            this.checkBounds(this.pickupMarker.getGeometry());
            this.bounds = this.bounds.mergePoint(
                this.pickupMarker.getGeometry()
            );
        }

        if (this.dropOffMarker) {
            this.checkBounds(this.dropOffMarker.getGeometry());
            this.bounds = this.bounds.mergePoint(
                this.dropOffMarker.getGeometry()
            );
        }

        if (!this.pickupMarker && !this.dropOffMarker) {
            // debugger
            this.checkBounds({
                lat: this.selectAddressService.userLocation.lat,
                lng: this.selectAddressService.userLocation.lng,
            });
            
        }

        const routeBounds = this.setBoundsToIncludeRoute();
        const topLat = routeBounds.topLat;
        const bottomLat = routeBounds.bottomLat;
        const rightLng = routeBounds.rightLng;
        const leftLng = routeBounds.leftLng;

        const y = bottomLat;
        const horizontalSpan = rightLng - leftLng;
        const factorX = (viewportWidth / (viewportWidth - offset)) * 1.1;
        const x = rightLng - horizontalSpan * factorX;
        this.bounds = this.bounds.mergeLatLng(y, x);

        const verticalSpan = topLat - bottomLat;
        // const constant =
        //     viewportWidth > 900 ? verticalSpan / 10 : verticalSpan / 5;
        let constant;

        if( (this.pickupMarker || this.userLocationMarker) && !this.dropOffMarker )
            constant =
                Math.max(verticalSpan, horizontalSpan) /
                (viewportWidth > 900 ? 0.8 : 2);
        else
            constant =
                Math.max(verticalSpan, horizontalSpan) /
                (viewportWidth > 900 ? 12 : 2);
        // changed (viewportWidth > 900 ? 10 : 2);  =>   (viewportWidth > 900 ? 0.8 : 2);

        console.log('vertical span ', verticalSpan);
        console.log('horizonal span ', horizontalSpan);
        console.log('constant ', constant);

        this.bounds = new H.geo.Rect(
            this.bounds.getTop() + constant,
            this.bounds.getLeft() - constant,
            this.bounds.getBottom() - constant,
            this.bounds.getRight() + constant
        );

        // // ! remove this
        // this.map.addObject(
        //     new H.map.Rect(this.bounds, {
        //         style: {
        //             fillColor: 'rgba(255, 255, 255, .2)',
        //         },
        //     })
        // );
        // !

        this.map.getViewModel().setLookAtData({
            bounds: this.bounds,
            // zoom: this.getZoom(),
        });

        if (
            (this.pickupMarker != null || this.userLocationMarker != null) &&
            this.dropOffMarker != null &&
            this.routeLines.length == 0 &&
            this.selectAddressService.pickupInServiceArea
        ) {
            this.calculateRoute();
        }
    }

    private checkBounds(point: any): void {
        if (this.map == null) {
            return;
        }
        if (this.bounds == null) {
            const viewportWidth = window.innerWidth;
            // const constant = viewportWidth > 900 ? 0.01 : 0.03;
            const constant = 0.01;
            this.bounds = H.geo.Rect.coverPoints([
                new H.geo.Point(point.lat - constant, point.lng - constant),
                new H.geo.Point(point.lat + constant, point.lng + constant),
            ]);
        }
    }

    // ! set return value for this
    private setBoundsToIncludeRoute() {
        let topLat = this.bounds.getTop();
        let bottomLat = this.bounds.getBottom();
        let rightLng = this.bounds.getRight();
        let leftLng = this.bounds.getLeft();

        if (this.routeLines.length != 0 && this.points) {
            for (let i = 0; i < this.points.length - 3; i += 3) {
                const lat = this.points[i];
                const lng = this.points[i + 1];
                if (lat > topLat) {
                    topLat = lat;
                }
                if (lat < bottomLat) {
                    bottomLat = lat;
                }

                if (lng > rightLng) {
                    rightLng = lng;
                }

                if (lng < leftLng) {
                    leftLng = lng;
                }
            }
        }
        return {
            topLat,
            bottomLat,
            rightLng,
            leftLng,
        };
    }

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    private calculateRoute(): void {
        if (this.map == null) {
            return;
        }
        console.log(this.tripDetailsService.isNow);
        console.log(this.tripDetailsService.zoneId);
        console.log(this.tripDetailsService.pickupDate);
        console.log(this.tripDetailsService.pickupTime);
        let date;
        if (this.isNow) {
            date = this.sharedService.getCurrentTimeInUTC(
                this.tripDetailsService.zoneId
            );
        } else {
            date = this.sharedService.convertTimeToUTC(
                this.tripDetailsService.zoneId,
                this.tripDetailsService.pickupDate,
                this.tripDetailsService.pickupTime
            );
        }

        console.log("this.pickupAddress in calculateRoute", this.pickupAddress)
        if (this.pickupAddress.title == "Los Angeles Int'l Airport (LAX)") {
            this.pickupAddress.lat = 33.947078,
            this.pickupAddress.lng = -118.398846
        }
        this.clearRouteLine();
        const params = new HttpParams()
            .append('apiKey', hereEngineKey)
            .append(
                'startAddr',
                `${this.pickupAddress.lat},${this.pickupAddress.lng}`
            )
            .append(
                'destAddr',
                `${this.dropOffAddress.lat},${this.dropOffAddress.lng}`
            )
            .append('routeType', 'f')
            .append('trafficMode', 'e')
            .append('departureDate', date);

        console.log("calculate route params===============", params)
        this.http
            .get(
                'https://aza9uj33tf.execute-api.us-east-2.amazonaws.com/1/routing/v0',
                { params }
            )
            .subscribe(
                (response: any) => {
                    if (response.status === 'OK') {
                        // previous code
                        // const points = response.points;
                        // if (points && points.length > 0) {
                        //     this.points = [];
                        //     points.forEach((point: any) => {
                        //         this.points.push(point.lat, point.lng, 0);
                        //     });
                            
                        //     this.lineString = new H.geo.LineString(this.points);
                        //     // make the route gradient color
                        //     const temp = new H.map.Polyline(
                        //         this.lineString,
                        //         {
                        //             style: {
                        //                 strokeColor: 'rgb(255, 248, 45)',
                        //                 lineWidth: 10,
                        //             },
                        //         }
                        //     );
                        //     console.log("routeLine====", temp)
                        //     // this.setMapBounds();
                        //     this.map.addObject(temp);
                        // }

                        


                        // ctcode
                        
                        // const points = [
                        //     { lat: 52.5309825, lng: 13.3845921 },
                        //     { lat: 52.5311923, lng: 13.3853495 },
                        //     { lat: 52.531352, lng: 13.3861755 },
                        //     { lat: 52.531481, lng: 13.3870278 },
                        //   ];
                        // end ctcode
                        // my gradient code
                        const points = response.points;
                        console.log("response=========", response)
                        if (points && points.length > 0) {
                            this.points = [];

                            // instead of
                            // points.forEach((point: any) => {
                            //     this.points.push(point.lat, point.lng, 0);
                            // });
                            
                            // use this code
                            this.points = points.map((point: any) => [point.lat, point.lng, 0]).flat();
                            // instead of
                            
                            // non animation part start
                             // console.log("thispoints=========", this.points)

                             const size = points.length;
                             points.map((point: any, key: number) => {
                                 const tempPoints: any[] = []
                                 // if(key < size - size/50 + 1) 
                                 if(key < size - 4)
                                 {
 
                                     for(let i = 0 ; i < 5 ; i ++) {
                                         tempPoints.push(points[key + i].lat, points[key + i].lng, 0)
                                     }
                                     const cLineString = new H.geo.LineString(tempPoints);
                                     // make the route gradient color
                                    //  const sColor = 'rgb(255, '+ (255 - 255 * (key / 3) / (size / 3 )  ) +', 0)';
                                   
                                    const yellow = [255, 255, 0]; // RGB values for yellow
                                    const maroon = [244, 25, 82]; // RGB values for maroon
                                    const c = [];
                                    
                                    for (let i = 0; i < 3; i++) {
                                      // interpolate the RGB values between yellow and maroon
                                      c[i] = yellow[i] + (maroon[i] - yellow[i]) * (key / (size - 1));
                                    }
                                    
                                    const sColor = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
                                    
                                    const cRouteLine = new H.map.Polyline(
                                         cLineString,
                                         {
                                             style: {
                                                 strokeColor: sColor,
                                                 lineWidth: 5,
                                             },
                                         }
                                     );
                                     // console.log("routeLine====", cRouteLine, tempPoints)
                                     // this.setMapBounds();
                                     this.routeLines.push(cRouteLine);
                                     this.map.addObject(cRouteLine);
                      
                                 }
                             })
                            // non animation part end
                        }

                    } else {
                        this.modalService.openModal(
                            'Something went wrong. Please try again.',
                            null,
                            false
                        );
                    }

                    // this.points = response.points;
                    // if (this.points && this.points.length > 0) {
                    //     const newLine = [
                    //         this.points[0].lat,
                    //         this.points[0].lng,
                    //         0,
                    //         this.points[0].lat,
                    //         this.points[0].lng,
                    //         0,
                    //     ];
                    //     this.lineString = new H.geo.LineString(newLine);
                    //     this.routeLine = new H.map.Polyline(this.lineString, {
                    //         style: {
                    //             strokeColor: 'rgb(195, 191, 32)', // #c3bf20
                    //             lineWidth: 5,
                    //         },
                    //     });
                    //     this.setMapBounds();
                    //     this.map.addObject(this.routeLine);
                    //     this.animateRoute(this.lineString);
                    // }
                },
                (error) => {
                    console.log("calculate route error", error)
                    // don't show error dialog
                    // this.modalService.openModal(
                    //     'Something went wrong. Please try again.',
                    //     null,
                    //     false
                    // );
                }
            );
    }

    // private animateRoute(lineString: any): void {
    //     // animate route line based on the number of points
    //     // If the number of points is larger, skip some of them when drawing
    //     let timeOut = 0;
    //     let step = 3;
    //     const numberOfPoints = this.points.length;
    //     if (numberOfPoints >= 1000) {
    //         step = 12 * Math.round(numberOfPoints / 1000);
    //     } else if (numberOfPoints >= 400) {
    //         step = 12;
    //     } else {
    //         timeOut = 10;
    //     }
    //     console.log('step ', step);
    //     this.animateRouteRecursive(0, lineString, step, timeOut);
    // }

    // private animateRouteRecursive(
    //     i: number,
    //     originalLineString: any,
    //     step: number,
    //     timeOut: number
    // ): void {
    //     if (this.routeLine != null) {
    //         if (i < this.points.length - step) {
    //             this.lineString.pushLatLngAlt(
    //                 this.points[i + step].lat,
    //                 this.points[i + step].lng,
    //                 timeOut
    //             );

    //             setTimeout(() => {
    //                 if (this.routeLine) {
    //                     this.routeLine.setGeometry(this.lineString);
    //                     this.animateRouteRecursive(
    //                         i + step,
    //                         originalLineString,
    //                         step,
    //                         timeOut
    //                     );
    //                 }
    //             }, timeOut);
    //         } else {
    //             this.routeLine.setGeometry(originalLineString);
    //             return;
    //         }
    //     }
    // }

    private getNearbyVehicles(): void {
        if (this.map == null) {
            return;
        }
        console.log('calling getNearbyVehicles');
        if (this.isNow) {
            this.tripDetailsService
                .getNearbyVehicles()
                .then((vehicles: Vehicle[]) => {
                    const newVehicle = this.checkForNewVehicles(vehicles);
                    if (newVehicle) {
                        this.clearVehiclesOnMap();
                        this.vehicles.vehicles = {};
                        vehicles.forEach((vehicle: any) => {
                            this.vehicles.vehicles[vehicle.vehicleId] = vehicle;
                        });
                        this.addVehiclesToMap();
                    }
                })
                .catch((error: any) => {
                    // don't show error dialog
                    console.log(error);
                });
        }
    }

    private checkForNewVehicles(vehicles: any): boolean {
        let newVehicle = false;
        for (let i = 0; i < vehicles.length; i++) {
            let found = false;
            for (let vehicleId in this.vehicles.vehicles) {
                if (vehicles[i].vehicleId === vehicleId) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                newVehicle = true;
                break;
            }
        }
        return newVehicle;
    }

    private addVehiclesToMap(): void {
        console.log(this.tripDetailsService.isNow)
        if (this.map == null) {
            return;
        }
        // distance: 590
        // gpsDirection: 215
        // lat: 34.0545329805107
        // lng: -118.25862686165456
        // types: []
        // vehicleId: "ccsi_Y_6732"

        this.vehicles.vehicleMarkers = {};
        this.vehicles.listeners = {};

        for (let vehicleId in this.vehicles.vehicles) {
            const vehicle = this.vehicles.vehicles[vehicleId];

            const domIconElement = document.createElement('div');
            domIconElement.id = `${vehicle.vehicleId}`;
            // domIconElement.style.display = !this.tripDetailsService.isNow ? 'none' : ''; 
            domIconElement.className = 'vehicle-marker-container';
            const image = document.createElement('div');
            image.className = 'vehicle-marker';
            domIconElement.appendChild(image);

            const icon = new H.map.DomIcon(domIconElement, {
                onAttach: function (
                    clonedElement: any,
                    domIcon: any,
                    domMarker: any
                ) {
                    const clonedImage =
                        clonedElement.getElementsByTagName('div')[0];
                    clonedImage.style.transform = `rotate(${vehicle.gpsDirection}deg)`;
                },
            });

            vehicle.prevLat = vehicle.lat;
            vehicle.prevLng = vehicle.lng;
            vehicle.prevGpsDirection = vehicle.gpsDirection;
            this.vehicles.vehicleMarkers[vehicle.vehicleId] =
                new H.map.DomMarker(
                    { lat: vehicle.lat, lng: vehicle.lng },
                    { icon }
                );
            this.vehiclesGroup.addObject(
                this.vehicles.vehicleMarkers[vehicle.vehicleId]
            );
            this.subscribeToVehicleStatus(vehicle.vehicleId);
        }
    }

    private clearVehiclesOnMap(): void {
        if (this.map == null) {
            return;
        }
        if (
            (this.vehicles && this.vehicles.vehicles) ||
            this.vehiclesGroup != null
        ) {
            this.unsubscribeVehicleStatus();
            this.vehicles.vehicles = {};
            this.vehicles.vehicleMarkers = {};
            this.vehiclesGroup.removeAll();
        }
    }

    private subscribeToVehicleStatus(vehicleId: string) {
        if (this.map == null) {
            return;
        }
        this.vehicles.listeners[vehicleId] = this.api
            .OnUpdateVehicleStatusListener(vehicleId)
            .subscribe(
                (result: any) => {
                    if (result.value) {
                        if (
                            this.vehicles.vehicleMarkers[vehicleId] != null &&
                            this.vehicles.vehicles[vehicleId] != null
                        ) {
                            const data =
                                result.value.data.onUpdateVehicleStatus;
                            const vehicle = this.vehicles.vehicles[vehicleId];
                            vehicle.prevLat = vehicle.lat;
                            vehicle.prevLng = vehicle.lng;
                            vehicle.prevGpsDirection = vehicle.gpsDirection;
                            vehicle.lat = data.lat;
                            vehicle.lng = data.lng;
                            vehicle.gpsDirection = data.gpsDirection;

                            this.ease(
                                { lat: vehicle.prevLat, lng: vehicle.prevLng },
                                { lat: vehicle.lat, lng: vehicle.lng },
                                25500,
                                (coord: any) => {
                                    const vehicleMarker =
                                        document.getElementById(
                                            vehicle.vehicleId
                                        );
                                    if (
                                        vehicleMarker != null &&
                                        this.vehicles.vehicleMarkers[
                                            vehicleId
                                        ] &&
                                        vehicle.gpsDirection !==
                                            vehicle.prevGpsDirection
                                    ) {
                                        const image =
                                            vehicleMarker.getElementsByTagName(
                                                'div'
                                            )[0];
                                        image.style.transform = `rotate(${vehicle.gpsDirection}deg)`;
                                    }

                                    if (
                                        this.vehicles.vehicleMarkers[
                                            vehicleId
                                        ] != null
                                    ) {
                                        this.vehicles.vehicleMarkers[
                                            vehicleId
                                        ].setGeometry(coord);
                                    }
                                }
                            );
                        }
                    }
                },
                (error) => {
                    // don't show error dialog
                    console.log(error);
                }
            );
    }

    private ease(
        startCoord = { lat: 0, lng: 0 },
        endCoord = { lat: 1, lng: 1 },
        durationMs = 200,
        onStep = console.log,
        onComplete = function () {}
    ) {
        var raf =
                window.requestAnimationFrame ||
                function (f) {
                    window.setTimeout(f, 16);
                },
            stepCount = durationMs / 16,
            valueIncrementLat = (endCoord.lat - startCoord.lat) / stepCount,
            valueIncrementLng = (endCoord.lng - startCoord.lng) / stepCount,
            sinValueIncrement = Math.PI / stepCount,
            currentValueLat = startCoord.lat,
            currentValueLng = startCoord.lng,
            currentSinValue = 0;

        function step() {
            currentSinValue += sinValueIncrement;
            currentValueLat +=
                valueIncrementLat * Math.sin(currentSinValue) ** 2 * 2;
            currentValueLng +=
                valueIncrementLng * Math.sin(currentSinValue) ** 2 * 2;

            if (currentSinValue < Math.PI) {
                onStep({ lat: currentValueLat, lng: currentValueLng });
                raf(step);
            } else {
                onStep(endCoord);
                onComplete();
            }
        }

        raf(step);
    }

    private unsubscribeVehicleStatus(): void {
        if (this.map == null) {
            return;
        }
        for (let vehicleId in this.vehicles.vehicles) {
            this.vehicles.listeners[vehicleId].unsubscribe();
            delete this.vehicles.listeners[vehicleId];
        }
    }

    private updateMapOnPickupDateTimeChanged(): void {
        if (this.map == null) {
            return;
        }
        console.log("isNow========>", this.isNow);
        if (this.isNow) {
            this.getNearbyVehicles();
        } else {
            this.clearVehiclesOnMap();
            if (this.etaInfoBubble != null) {
                console.log('???');
                this.map.removeObject(this.etaInfoBubble);
                this.etaInfoBubble = null;
            }

            if (this.arrivalInfoBubble != null) {
                this.map.removeObject(this.arrivalInfoBubble);
                this.arrivalInfoBubble = null;
            }
        }
        this.calculateRoute();
    }
}
