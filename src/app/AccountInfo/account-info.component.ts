import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-account-info',
    templateUrl: './account-info.component.html',
    styleUrls: ['./account-info.component.css'],
})
export class AccountInfoComponent {

    @Input('fleetId') fleetId: string;
    @Input('custId') custId: string;
    @Input('name') name: string;

    constructor() {
       
    }
}
