import { Component, OnInit, OnChanges } from '@angular/core';
import { DevicesService } from '../devices.service';
import { Observable } from 'rxjs';
import { IDevice } from '../models/Device';
import { Store, select } from '@ngrx/store';
import { IDevicesState } from '../store/devices/reducer';
import * as Actions from '../store/devices/actions';
import * as Devices from '../store/devices/selectors';
import { IAppState } from '../store/reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnChanges {
  devList$: Observable<IDevice[]>;
  constructor(private devService: DevicesService, private store: Store<IAppState>) {
    this.devList$ = this.store.select(Devices.getDevices);
  }
  ngOnInit() {
    this.devService.getDevices().subscribe(devices => {
      this.store.dispatch(new Actions.LoadDevices(devices));
    });
  }
  ngOnChanges() {
  }
  switch = (id: number) => {
    this.devService.switchDevice(id).subscribe();
  };
}
