import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from './models/Device';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private baseUrl = 'api/devices';
  constructor(private http: HttpClient) { }
  getDevices = () => {
    return this.http.get<Device[]>(this.baseUrl);
  };
  getDeviceById = (devId: number) => {
    return this.http.get<Device>(`${this.baseUrl}/${devId}`);
  };
  switchDevice = (devId: number) => {
    return this.http.get(`${this.baseUrl}/Switch/${devId}`);
  }
  getSetting = (devId: number, settingType: number) => {
    return this.http.get(`${this.baseUrl}/${devId}/settings/${settingType}`);
  }
}
