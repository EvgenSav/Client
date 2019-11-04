import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { UpdateService } from './update.service';
import { DevicesService } from './devices.service';
import { Store } from '@ngrx/store';
import { IAppState } from './store/reducer';
import { getDevices } from './store/devices/selectors';
import { Action } from 'rxjs/internal/scheduler/Action';
import { LoadDevices } from './store/devices/actions';
import { HomeService } from './home.service';
import { LoadRooms } from './store/home/actions';
import { OptionsService } from './options.service';
import { LoadGeneralOptions } from './store/options/actions';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Client';
  constructor(private updService: UpdateService, private devService: DevicesService, private homeService: HomeService,
    private optionsService: OptionsService,
    private store: Store<IAppState>,
    private idle: Idle) { }
  ngOnInit() {
    this.homeService.getRooms().subscribe(rooms => { this.store.dispatch(new LoadRooms(rooms)) });
    this.devService.getDevices().subscribe(devices => { this.store.dispatch(new LoadDevices(devices)) });
    this.optionsService.getGeneralOptions().subscribe(options => this.store.dispatch(new LoadGeneralOptions(options)))
    this.updService.connectionStart();
    this.idle.onIdleStart.subscribe(() => console.log(`idle started ${Date.now}`));
    this.idle.onIdleEnd.subscribe(() => {
      this.devService.getDevices().subscribe(devices => { this.store.dispatch(new LoadDevices(devices)) });
      this.updService.connectionStart();
    });
  }
  ngOnDestroy() {
    this.updService.connectionClose();
  }
}

