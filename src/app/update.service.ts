import { Injectable, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { IDevice } from './models/Device';
import { DevicesStoreService } from './devices-store.service';
import { IDevicesState } from './store/devices/reducer';
import { IAppState } from './store/reducer'
import { Store } from '@ngrx/store';
import { UpdateDevice } from './store/devices/actions';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(private store: Store<IAppState>) { }
  connection: HubConnection;
  connectionStart = () => {
    this.connection = new HubConnectionBuilder().withUrl('/devicesHub').build();
    this.connection.start().then(() => console.log('started')).catch(() => console.log('error'));
    this.connection.on('UpdateDevice', this.deviceUpdate);
  }
  deviceUpdate = (dev: IDevice) => {
    /* console.log('dev update!!!');
    console.log(dev); */
    /* this.devStoreService.updateDevice(dev); */
    this.store.dispatch(new UpdateDevice(dev));
  }
}
