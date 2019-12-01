import { Component, OnInit, Input, Output } from '@angular/core';
import { DevicesService } from '../devices.service';
import { IDeviceSettings } from '../models/DeviceSettings';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter, find, map } from 'rxjs/operators'
import { IAppState } from '../store/reducer';
import { getDevices } from '../store/devices/selectors';
import { Observable } from 'rxjs';
import { Patch } from '../patch-helper';

@Component({
  selector: 'app-device-settings',
  templateUrl: './device-settings.component.html',
  styleUrls: ['./device-settings.component.scss']
})
export class DeviceSettingsComponent implements OnInit {
  settings$: Observable<IDeviceSettings>;
  type: number;
  id: number;

  constructor(private devService: DevicesService, private route: ActivatedRoute, private store: Store<IAppState>) {
    this.route.params.subscribe(params => { this.handleChangeRoute() });
    this.settings$ = this.store.select(getDevices).pipe(map(devs => {
      return devs.length > 0 ? devs.find(dev => dev.Key === this.id).Settings : null;
    }));
    /* this.store.deviceChanged.subscribe(devices => {
      this.settings = devices.find(dev => dev.key === this.id).settings;
      console.log('SUBSCRIPTION: devices updated');
    }); */
  }
  handlePatchSetting = (val: any, path: string) => {
    const patch = new Patch(val, path);
    console.log(this.id, this.type, patch);
    this.devService.patchSetting(this.id, this.type, patch).subscribe();
  }
  handleChangeRoute = () => {
    this.type = +this.route.snapshot.paramMap.get('type');
    this.id = +this.route.parent.snapshot.paramMap.get('devId');
    this.loadSettings();
  };
  ngOnInit() {
    /* this.handleChangeRoute(); */
  };
  loadSettings = () => {
    this.devService.getSetting(this.id, this.type).subscribe(r => console.log(`get settings for ${this.id} of type: ${this.type}`));
  };
}

