import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { DeviceSettingsComponent } from './device-settings/device-settings.component';
import { ActionLogComponent } from './action-log/action-log.component';
import { RequestComponent } from './request/request.component';
import { LineChartComponent } from './line-chart/line-chart.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'details/:devId',
    component: DeviceDetailsComponent,
    children: [
      { path: 'settings/:type', component: DeviceSettingsComponent },
      { path: 'actionLog', component: ActionLogComponent },
      { path: 'chart', component: LineChartComponent }
    ]
  },
  {
    path: 'request',
    component: RequestComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
