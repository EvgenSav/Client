import { Injectable, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { IDevice } from './models/Device';
import { IDevicesState } from './store/devices/reducer';
import { IAppState } from './store/reducer'
import { Store } from '@ngrx/store';
import { UpdateDevice, AddDevice } from './store/devices/actions';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { IBindRequest } from './models/BindRequest';
import { updateBinding } from '@angular/core/src/render3/instructions';
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
      if (this.tmr) {
        clearInterval(this.tmr);
      }
    }).catch(() => console.log('error'));
    this.connection.on('DeviceUpdated', this.deviceUpdate);
    this.connection.on('DeviceAdded', this.deviceAdd);
    this.connection.on('RequestUpdated', this.requestUpdate);
    
    this.connection.onclose(error => {
      console.log(error.name);
      console.log(error.message);
      console.log(error.stack);
      this.connectionClose();
      if (error) {
        /* this.tmr = setInterval(() => {
          console.log(this.connection.state);
          this.connectionStart();
        }, 30000) */
      }
    });

  }
  requestUpdate = (req: IBindRequest) => {
    console.log(req);
    this.store.dispatch(new PatchBindRequest(req.id, req))
  }
  deviceUpdate = (dev: IDevice) => {
    this.store.dispatch(new UpdateDevice(dev));
  }
  deviceAdd = (dev: IDevice) => {
    this.store.dispatch(new AddDevice(dev));
  }
  connectionClose = () => {
    this.connection.stop().then(() => console.log('stop'));
    this.connection = null;
  }
}
