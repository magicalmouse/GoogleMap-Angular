import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/shared.service';
import { CountriesListSelectComponent } from './countries-list/countries-list-select.component';
import { allCountries } from './data';
import * as lpn from 'google-libphonenumber';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/shared/Country.model';

@Component({
    selector: 'app-phone-number-input',
    templateUrl: './phone-number-input.component.html',
    styleUrls: ['./phone-number-input.component.css'],
})
export class PhoneNumberInputComponent implements OnInit {
    @Output() phoneNumberChange = new EventEmitter<string>();

    defaultCountry: Country = allCountries[231]; // set default country as US
    selectedCountry: Country;
    countries: Country[] = [];
    phoneUtil: any = lpn.PhoneNumberUtil.getInstance();
    formatter: any;
    phoneNumber: string = null;
    phoneNumberFormControl: FormControl;
    
    invalidPhoneNumber: boolean = false;
    requiredPhoneNumber: boolean = false;
    focusPhone: boolean = false;

    @Input('savedPhoneNumber') savedPhoneNumber: string;

    constructor(
        private sharedService: SharedService,
        private dialog: MatDialog
    ) {}
    public ngOnInit(): void {
        this.countries = allCountries;
        this.selectedCountry = this.defaultCountry;
        this.phoneNumberFormControl = new FormControl(this.savedPhoneNumber ? this.savedPhoneNumber  : null, [
            Validators.required,
        ]);
        console.log(this.savedPhoneNumber);
        this.formatter = new lpn.AsYouTypeFormatter(
            this.selectedCountry.abbrev.toUpperCase()
        );
    }

    public onFocusInput(event: any, field: string) : void {
        if(field == "phone")
            this.focusPhone = true;

    }

    public onFocusInputOut(event: any, field: string) : void {
        if(field == "phone" )
            this.focusPhone = false;
    }

    public openCountriesListSelectModal(): void {
        this.phoneNumberFormControl.disable();
        let dialogConfig: any = this.sharedService.getModalSize();
        dialogConfig.autoFocus = false;
        const dialogRef = this.dialog.open(
            CountriesListSelectComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((index: number) => {
            this.phoneNumberFormControl.enable();
            if (index != null) {
                this.selectedCountry = this.countries[index];
                this.formatter = new lpn.AsYouTypeFormatter(
                    this.selectedCountry.abbrev.toUpperCase()
                );
                this.formatPhoneNumber();
            }
        });
    }

    public getFormattedPhoneNumber(): void {
        this.phoneNumber = this.phoneNumberFormControl.value;
        if (this.phoneNumber != null && this.phoneNumber.length >= 2) {
            let parsedPhoneNumber = null;

            try {
                parsedPhoneNumber = this.phoneUtil.parse(
                    this.phoneNumber,
                    this.selectedCountry.abbrev.toUpperCase()
                );    
                
                // ADD by ASE
                this.phoneNumberChange.emit(this.phoneNumber);

                if (
                    this.phoneUtil.isValidNumberForRegion(
                        parsedPhoneNumber,
                        this.selectedCountry.abbrev.toUpperCase()
                    )
                ) {
                    const values = parsedPhoneNumber.values_;
                    return values['1'].toString() + values['2'].toString();
                } else {
                    this.phoneNumberFormControl.setErrors({
                        invalid: true,
                    });
                }

            } catch (error) {
                this.phoneNumberFormControl.setErrors({
                    invalid: true,
                });
            }
            
        } else {
            this.phoneNumberFormControl.setErrors({
                invalid: true,
            });
        }
    }

    // autoformat phone number based on country code
    public formatPhoneNumber(): void {
        
        if (this.phoneNumberFormControl.value != null && this.phoneNumberFormControl.value != '') {
            this.requiredPhoneNumber = false;
            this.formatter.clear();
            const oldValue = this.phoneNumberFormControl.value.replace(
                /\D/g,
                ''
            );
            let newValue = '';
            for (let i = 0; i < oldValue.length; i++) {
                newValue = this.formatter.inputDigit(oldValue[i]);
            }
            this.phoneNumberFormControl.patchValue(newValue);


            // ADD by ASE
            this.getFormattedPhoneNumber()



        } else {
            this.requiredPhoneNumber = true;
            this.invalidPhoneNumber = false;
        }
    }

    public reset(): void {
        this.phoneNumberFormControl.reset();
        this.phoneNumberChange.emit('');
    }


        

}
