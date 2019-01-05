import { Component, OnInit, OnChanges } from '@angular/core';
import { DevicesService } from '../devices.service';
import { Observable } from 'rxjs';
import { Device } from '../models/Device';
import { UpdateService } from '../update.service';
import { DevicesStoreService } from '../devices-store.service';
import { Store } from '@ngrx/store';
import { DevicesState } from '../store/devices/reducers';
import * as Actions from '../store/devices/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnChanges {
  devList: Device[];
  constructor(private devService: DevicesService, private devStoreService: DevicesStoreService, private store: Store<DevicesState>) { }
  ngOnInit() {
    this.devService.getDevices().subscribe(devices => {
      this.devStoreService.setDevicesList(devices);
      this.devList = this.devStoreService.devices;
      this.store.dispatch(new Actions.LoadDevices(devices));
    });
  }
  ngOnChanges() {
  }
  switch = (id: number) => {
    this.devService.switchDevice(id).subscribe();
  };
}
