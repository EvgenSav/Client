import { Component, OnInit, OnDestroy } from '@angular/core';
import { UpdateService } from './update.service';
import { DevicesService } from './devices.service';
import { Store } from '@ngrx/store';
import { IAppState } from './store/reducer';
import { HomeService } from './home.service';
import { LoadRooms } from './store/home/actions';
import { OptionsService } from './options.service';
import { LoadGeneralOptions } from './store/options/actions';
import { HubConnectionState } from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Client';
  constructor(private updService: UpdateService, private homeService: HomeService,
    private optionsService: OptionsService, private store: Store<IAppState>) {
  }
  ngOnInit() {
    this.homeService.getRooms().subscribe(rooms => { this.store.dispatch(new LoadRooms(rooms)) });
    /* this.devService.getDevices().subscribe(devices => { this.store.dispatch(new LoadDevices(devices)) }); */
    this.optionsService.getGeneralOptions().subscribe(options => this.store.dispatch(new LoadGeneralOptions(options)))
    this.updService.connectionStart();
    window.addEventListener("focus", () => this.handleBrowserState(true));
    window.addEventListener("blur", () => this.handleBrowserState(false));
  }

  ngOnDestroy() {
    this.updService.connectionClose();
    window.removeEventListener("focus", () => this.handleBrowserState(true));
    window.removeEventListener("blur", () => this.handleBrowserState(false));
  }

  handleBrowserState = (isActive: boolean) => {
    if (isActive) {
      if(this.updService.connection.state != HubConnectionState.Connected)
      this.updService.connectionStart();
      /* this.devService.getDevices().subscribe(devices => { this.store.dispatch(new LoadDevices(devices)) }); */
    } /* else {
      this.updService.connectionClose();
    } */
  }
}

