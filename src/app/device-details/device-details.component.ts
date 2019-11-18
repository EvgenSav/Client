import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../devices.service';
import { Location } from '@angular/common';
import { IDevice } from '../models/Device';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, find, map } from 'rxjs/operators'
import { IAppState } from '../store/reducer';
import { Store } from '@ngrx/store';
import { getDevices } from '../store/devices/selectors';
import { Patch, Operation } from '../patch-helper';
import { getRooms } from '../store/home/selectors';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {
  dev$: Observable<IDevice>;
  rooms$: Observable<string[]>;
  devId: number;
  constructor(private devService: DevicesService, private route: ActivatedRoute, private store: Store<IAppState>) {
    this.dev$ = this.store.select(getDevices).pipe(map(devs => devs.find(d => d.Key === this.devId)));
    this.rooms$ = this.store.select(getRooms);
  }
  patchDevice = (value: string, path: string) => {
    console.log(value, path);
    const patch = new Patch(value, path);
    this.devService.patchDevice(this.devId, patch).subscribe();
  }
  setBright = (brightValue: number) => {
    console.log(brightValue);
    this.devService.setBright(this.devId, brightValue).subscribe();
  }
  ngOnInit() {
    this.devId = +this.route.snapshot.paramMap.get('devId');
    /* this.devService.getDeviceById(devId).subscribe(r => { this.dev = r; this.isDataOk = true; }); */
  }
}
