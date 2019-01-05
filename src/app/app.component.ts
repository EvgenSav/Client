import { Component, OnInit } from '@angular/core';
import { UpdateService } from './update.service';
import { DevicesService } from './devices.service';
import { DevicesStoreService } from './devices-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';
  constructor(private updService: UpdateService, private devService: DevicesService, private storeService: DevicesStoreService) { }
  ngOnInit() {    
    this.devService.getDevices().subscribe(devices => { this.storeService.setDevicesList(devices) });
    this.updService.connectionStart();
  }
}

