import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { MapComponent } from './booking/map/map.component';

const routes: Routes = [
  { 
    // path: 'AccountReservationsWeb/Acct/:fleetId/:custId?sessionId=sessionId&token=token',
    path: 'AccountReservationsWeb/Acct/:fleetId/:custId/:token',
    component: AppComponent
  },
  {
    path: 'AccountReservationsWeb/Acct/:fleetId/:custId',
    component: MapComponent
  },
  {
    path: 'AccountReservationsWeb/AccountAccess',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
