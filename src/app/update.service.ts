import { Injectable, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { IDevice } from './models/Device';
import { IDevicesState } from './store/devices/reducer';
import { IAppState } from './store/reducer'
import { Store } from '@ngrx/store';
import { UpdateDevice } from './store/devices/actions';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(private store: Store<IAppState>) { }
  connection: HubConnection;
  tmr: any;
  connectionStart = () => {
    this.connection = new HubConnectionBuilder().withUrl('/devicesHub').build();
    this.connection.start().then(() => {
      console.log('started');
      if (this.tmr) {
        clearInterval(this.tmr);
      }
    }).catch(() => console.log('error'));
    this.connection.on('UpdateDevice', this.deviceUpdate);
    this.connection.onclose((error) => {
      console.log(error.message)
      if (error) {
        this.tmr = setInterval(() => {
          console.log(this.connection.state);
          this.connectionStart();
        }, 30000)
      }
    });

  }
  deviceUpdate = (dev: IDevice) => {
    /* console.log('dev update!!!');
    console.log(dev); */
    /* this.devStoreService.updateDevice(dev); */
    this.store.dispatch(new UpdateDevice(dev));
  }
}
