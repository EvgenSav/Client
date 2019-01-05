import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../devices.service';
import { Location } from '@angular/common';
import { Device } from '../models/Device';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {
  dev: Device;
  isDataOk: boolean = false;
  constructor(private devService: DevicesService, private route: ActivatedRoute) { }

  ngOnInit() {
    const devId = +this.route.snapshot.paramMap.get('devId');
    this.devService.getDeviceById(devId).subscribe(r => { this.dev = r; this.isDataOk = true; });
  }
}
