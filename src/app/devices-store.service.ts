import { Injectable } from '@angular/core';
import { Device } from './models/Device';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesStoreService {
  devices: Device[];
  constructor() { }
  deviceChanged: Subject<Device[]> = new Subject<Device[]>();
  getDevices = () => {
    return this.devices;
  }
  setDevicesList = (devList: Device[]) => {
    this.devices = devList;
    this.deviceChanged.next(this.devices)
  }
  updateDevice = (dev: Device) => {
    const devIdx = this.devices.findIndex(d => d.key == dev.key);
    if (devIdx !== -1) {
      this.devices[devIdx] = dev;
    }
    this.deviceChanged.next(this.devices);
  }
}
