import { Injectable, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { IDevice } from './models/Device';
import { IDevicesState } from './store/devices/reducer';
import { IAppState } from './store/reducer'
import { Store } from '@ngrx/store';
import * as Actions from './store/devices/actions';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { IBindRequest } from './models/BindRequest';
import { PatchBindRequest } from './store/binding/actions';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(private store: Store<IAppState>) { }
  connection: HubConnection;
  tmr: any;
  connectionStart = () => {
    console.log('try start');
    this.connection = new HubConnectionBuilder().withUrl('/devicesHub').build();
    this.connection.start().then(() => {
      console.log('started');
    }).catch(() => console.log('error onStart'));
    this.connection.on('DeviceUpdated', this.deviceUpdate);
    this.connection.on('DeviceCollection', this.deviceCollectionUpdate);
    this.connection.on('DeviceAdded', this.deviceAdd);
    this.connection.on('DeviceDeleted', this.deviceDelete);
    this.connection.on('RequestUpdated', this.requestUpdate);

    this.connection.onclose(error => {
      if (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error.stack);
      }
    });

  }
  requestUpdate = (req: IBindRequest) => {
    console.log(req);
    this.store.dispatch(new PatchBindRequest(req.Id, req))
  }
  deviceUpdate = (dev: IDevice) => {
    this.store.dispatch(new Actions.UpdateDevice(dev));
  }
  deviceCollectionUpdate = (devs: IDevice[]) => {
    this.store.dispatch(new Actions.LoadDevices(devs));
  }
  deviceAdd = (dev: IDevice) => {
    this.store.dispatch(new Actions.AddDevice(dev));
  }
  deviceDelete = (devKey: number) => {
    this.store.dispatch(new Actions.DeleteDevice(devKey))
  }
  connectionClose = () => {
    this.connection.stop().then(() => console.log('stop'));
    this.connection = null;
  }
}
