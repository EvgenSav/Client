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

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {
  dev$: Observable<IDevice>;
  devId: number;
  constructor(private devService: DevicesService, private route: ActivatedRoute, private store: Store<IAppState>) {
    this.dev$ = this.store.select(getDevices).pipe(map(devs => devs.find(d => d.key === this.devId)));
  }
  patchDevice = (value: any) => {
    console.log(value);
    const patch = new Patch(value, '/Name');    
    this.devService.patchDevice(this.devId, patch).subscribe();
  }
  ngOnInit() {
    this.devId = +this.route.snapshot.paramMap.get('devId');
    /* this.devService.getDeviceById(devId).subscribe(r => { this.dev = r; this.isDataOk = true; }); */
  }
}
