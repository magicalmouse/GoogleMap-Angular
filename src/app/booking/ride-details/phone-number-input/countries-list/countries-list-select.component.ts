import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Country } from 'src/app/shared/Country.model';
import { ModalComponent } from 'src/app/shared/Modal/Modal.service';
import { allCountries } from '../data';

@Component({
    selector: 'app-countries-list-select',
    templateUrl: './countries-list-select.component.html',
    styleUrls: [
        '../phone-number-input.component.css',
        './countries-list-select.component.css',
    ],
})
export class CountriesListSelectComponent {
    allCountries: any[] = allCountries;
    countries: any[] = [];

    constructor(private dialogRef: MatDialogRef<ModalComponent>) {}

    public ngOnInit(): void {
        this.countries = this.allCountries;
    }

    public searchCountry(event: KeyboardEvent): void {
        let queryString = (event.target as HTMLInputElement).value;
        queryString = queryString.toLowerCase().trim();
        if (queryString == null || queryString.length < 1) {
            this.countries = this.allCountries;
            return;
        }
        this.countries = this.allCountries.filter((country: any) => {
            for (let key in country) {
                if (country[key] != null) {
                    if (
                        country[key]
                            .toString()
                            .toLowerCase()
                            .startsWith(queryString)
                    ) {
                        return true;
                    }
                }
            }
            return false;
        });
    }

    public selectCountry(country: Country): void {
        let index = 0;
        for (let i = 0; i < this.allCountries.length; i++) {
            if (this.allCountries[i].abbrev === country.abbrev) {
                index = i;
                break;
            }
        }
        this.dialogRef.close(index);
    }

    public close(): void {
        this.dialogRef.close();
    }
}
