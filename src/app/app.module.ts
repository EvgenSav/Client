import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { DeviceSettingsComponent } from './device-settings/device-settings.component';
import { StoreModule } from '@ngrx/store';
import { reducer, metaReducers } from './store/reducer';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ActionLogComponent } from './action-log/action-log.component';
import { BindingComponent } from './binding/binding.component';
import { BindingDetailsComponent } from './binding-details/binding-details.component'; // Angular CLI environemnt
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from './modal-content/modal-content.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DeviceDetailsComponent,
    DeviceSettingsComponent,
    ActionLogComponent,
    BindingComponent,
    BindingDetailsComponent,
    ModalContentComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducer, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalContentComponent]
})
export class AppModule { }
