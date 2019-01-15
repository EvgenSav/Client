import { Component, OnInit } from '@angular/core';
import { UpdateService } from './update.service';
import { DevicesService } from './devices.service';
import { DevicesStoreService } from './devices-store.service';
import { Store } from '@ngrx/store';
import { IAppState } from './store/reducer';
import { getDevices } from './store/devices/selectors';
import { Action } from 'rxjs/internal/scheduler/Action';
import { LoadDevices } from './store/devices/actions';
import { HomeService } from './home.service';
import { LoadRooms } from './store/home/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';
  constructor(private updService: UpdateService, private devService: DevicesService, private homeService: HomeService, private store: Store<IAppState>) { }
  ngOnInit() {
    this.homeService.getRooms().subscribe(rooms => { this.store.dispatch(new LoadRooms(rooms)) });
    this.devService.getDevices().subscribe(devices => { this.store.dispatch(new LoadDevices(devices)) });
    this.updService.connectionStart();
  }
}

