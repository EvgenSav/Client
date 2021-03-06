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
import { RequestComponent } from './request/request.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeleteDeviceConfirmationComponent } from './modals/delete-device-modal/modal-content.component';
import { NewRequestModalComponent } from './modals/new-request-modal/new-request-modal.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MeasurementChartComponent } from './modals/measurement-chart/measurement-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// RECOMMENDED
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AutomationComponent } from './automation/automation.component';
import { EffectsModule } from '@ngrx/effects';
import { AutomationEffects } from './store/automation/effects';
import { AutomationDetailsComponent } from './automation-details/automation-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DeviceDetailsComponent,
    DeviceSettingsComponent,
    ActionLogComponent,
    RequestComponent,
    DeleteDeviceConfirmationComponent,
    NewRequestModalComponent,
    LineChartComponent,
    MeasurementChartComponent,
    AutomationComponent,
    AutomationDetailsComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducer, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([AutomationEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDeviceConfirmationComponent, NewRequestModalComponent, MeasurementChartComponent]
})
export class AppModule { }
