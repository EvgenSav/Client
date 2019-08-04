import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDevice } from './models/Device';
import { APP_BASE_HREF } from '@angular/common';
import { Patch } from './patch-helper';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private baseUrl = 'api/devices';
  constructor(private http: HttpClient) { }
  getDevices = () => {
    return this.http.get<IDevice[]>(this.baseUrl);
  };
  getDeviceById = (devId: number) => {
    return this.http.get<IDevice>(`${this.baseUrl}/${devId}`);
  };
  switchDevice = (devId: number) => {
    return this.http.get(`${this.baseUrl}/Switch/${devId}`);
  }
  getSetting = (devId: number, settingType: number) => {
    return this.http.get(`${this.baseUrl}/${devId}/settings/${settingType}`);
  }
  patchDevice = (devId: number, patch: Patch) => {
    return this.http.patch(`${this.baseUrl}/${devId}`, [patch]);
  }
  patchSetting = (devId: number, settingType: number, patch: Patch) => {
    return this.http.patch(`${this.baseUrl}/${devId}/settings/${settingType}`, [patch]);
  }
  setBright = (devId: number, bright: number) => {
    return this.http.get(`${this.baseUrl}/${devId}/Brightness/${bright}`)
  }
}
