import { Injectable } from '@angular/core';
import { IDevice } from './models/Device';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesStoreService {
  devices: IDevice[];
  constructor() { }
  deviceChanged: Subject<IDevice[]> = new Subject<IDevice[]>();
  getDevices = () => {
    return this.devices;
  }
  setDevicesList = (devList: IDevice[]) => {
    this.devices = devList;
    this.deviceChanged.next(this.devices)
  }
  updateDevice = (dev: IDevice) => {
    const devIdx = this.devices.findIndex(d => d.key == dev.key);
    if (devIdx !== -1) {
      this.devices[devIdx] = dev;
    }
    this.deviceChanged.next(this.devices);
  }
}
