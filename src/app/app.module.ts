import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingComponent } from './booking/booking.component';
import { RideDetailsComponent } from './booking/ride-details/ride-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatList, MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MapComponent } from './booking/map/map.component';
import { SelectAddressService } from './booking/shared/select-address.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ColorSchemeService } from 'src/theming.service';
import { ChangeThemeComponent } from './settings/change-theme.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CDK_DRAG_CONFIG, DragDropModule } from '@angular/cdk/drag-drop';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { ModalComponent, ModalService } from './shared/Modal/Modal.service';
import { SharedService } from './shared/shared.service';
import { SelectAddressesComponent } from './booking/ride-details/select-addresses/select-addresses.component';
import { TripDetailsService } from './booking/shared/trip-details.service';
import { VehicleTypeSelectComponent } from './booking/ride-details/vehicle-type-select/vehicle-type-select.component';
import { VehicleTypeComponent } from './booking/ride-details/vehicle-type/vehicle-type.component';
import { MatNativeDateModule } from '@angular/material/core';
import { TripCodeConfirmationModalComponent } from './booking/ride-details/trip-code-confirmation/trip-code-confirmation-modal.component';
import { GetTripCodeConfirmationModalComponent } from './booking/ride-details/gettripcode-confirmation/gettripcode-confirmation-modal.component';
import { InfoTripCodeModalComponent } from './booking/ride-details/infotripcode-confirmation/infotripcodeconfirmation-modal.component';
import { BookRideConfirmationModalComponent } from './booking/ride-details/bookride-confirmation/bookride-confirmation-modal.component';
import { RideRequestPolygonConfirmationModalComponent } from './booking/ride-details/ride-request-polygon-confirmation/ride-request-polygon-confirmation-modal.component';
import { RideRequestPolygonTripCodeConfirmationModalComponent } from './booking/ride-details/ride-request-polygon-trip-code-confirmation/ride-request-polygon-trip-code-confirmation-modal.component';
import { RideConfirmationModalComponent } from './booking/ride-details/ride-confirmation/ride-confirmation-modal.component';
import { DateTimeSelectComponent } from './booking/ride-details/date-time-select/date-time-select.component';
import { PhoneNumberInputComponent } from './booking/ride-details/phone-number-input/phone-number-input.component';
import { CountriesListSelectComponent } from './booking/ride-details/phone-number-input/countries-list/countries-list-select.component';
import { FormErrorsDialogComponent } from './booking/ride-details/form-errors-dialog/form-errors-dialog.component';
import { BookingService } from './booking/shared/booking-service';
import { LoaderComponent } from './shared/loader/loader.component';
import { ExampleHeader } from './booking/ride-details/date-time-select/example-header.component';
import { AccountInfoComponent } from './AccountInfo/account-info.component';
import { LoginComponent } from './login/login/login.component';
import { RideQuestionAnswerConfirmationComponent } from './booking/ride-details/ride-question-answer-confirmation/ride-question-answer-confirmation.component';
import { DateSelectComponent } from './booking/ride-details/date-select/date-select.component';
import { PickupDialogComponent } from './booking/ride-details/pickup-dialog/pickup-dialog.component';
import { DateTimeSelectionComponent } from './booking/ride-details/date-time-selection/date-time-selection.component';
@NgModule({
    declarations: [
        AppComponent,
        BookingComponent,
        RideDetailsComponent,
        PhoneNumberInputComponent,
        CountriesListSelectComponent,
        DateTimeSelectComponent,
        SelectAddressesComponent,
        VehicleTypeComponent,
        VehicleTypeSelectComponent,
        TripCodeConfirmationModalComponent,
        GetTripCodeConfirmationModalComponent,
        InfoTripCodeModalComponent,
        BookRideConfirmationModalComponent,
        RideRequestPolygonConfirmationModalComponent,
        RideRequestPolygonTripCodeConfirmationModalComponent,
        RideConfirmationModalComponent,
        MapComponent,
        ChangeThemeComponent,
        ModalComponent,
        FormErrorsDialogComponent,
        LoaderComponent,
        ExampleHeader,
        AccountInfoComponent,
        LoginComponent,
        RideQuestionAnswerConfirmationComponent,
        DateSelectComponent,
        PickupDialogComponent,
        DateTimeSelectionComponent
    ],
    imports: [
        AmplifyUIAngularModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        HttpClientModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        DragDropModule,
        NgxMaskModule.forRoot(),
    ],
    providers: [
        SharedService,
        BookingService,
        SelectAddressService,
        TripDetailsService,
        ColorSchemeService,
        ModalService,
        MatDatepickerModule,
        { provide: CDK_DRAG_CONFIG, useValue: { zIndex: 2000 } },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
