import { Component, OnInit, Input, Output } from '@angular/core';
import { DevicesService } from '../devices.service';
import { DeviceSettings } from '../models/DeviceSettings';
import { ActivatedRoute } from '@angular/router';
import { DevicesStoreService } from '../devices-store.service';

@Component({
  selector: 'app-device-settings',
  templateUrl: './device-settings.component.html',
  styleUrls: ['./device-settings.component.scss']
})
export class DeviceSettingsComponent implements OnInit {
  settings: DeviceSettings;
  type: number;
  id: number;

  constructor(private devService: DevicesService, private route: ActivatedRoute, private store: DevicesStoreService) {
    this.route.params.subscribe(params => { this.handleChangeRoute() });
    this.store.deviceChanged.subscribe(devices => {
      this.settings = devices.find(dev => dev.key === this.id).settings;
      console.log('SUBSCRIPTION: devices updated');
    });
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

