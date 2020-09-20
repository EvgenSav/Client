import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../services/devices.service';
import { Observable } from 'rxjs';
import { IDevice } from '../models/Device';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as Actions from '../store/devices/actions';
import * as Devices from '../store/devices/selectors';
import { IAppState } from '../store/reducer';
import { RequestService } from '../services/request.service';
import { DeviceTypeEnum } from '../models/Request';
import { MeasurementChartComponent } from '../modals/measurement-chart/measurement-chart.component';
import { ActionLogService } from '../services/action-log.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  devList$: Observable<IDevice[]>;
  deviceTypeOptions: any[] = Object.keys(DeviceTypeEnum)
    .filter(r => isNaN(parseInt(r)))
  constructor(private devService: DevicesService, private store: Store<IAppState>, private modalService: BsModalService,
    private requestServie: RequestService, private actionLogService: ActionLogService) {
    this.devList$ = this.store.select(Devices.getDevices);
  }
  ngOnInit() {
    /* this.devService.getDevices().subscribe(devices => {
      this.store.dispatch(new Actions.LoadDevices(devices));
    }); */
  }


  screenWidth = 360;

  deviceCardClick = (dev: IDevice, e: Event) => {
    e.stopPropagation();
    switch (dev.Type) {
      case DeviceTypeEnum.PowerUnitF:
        this.switch(dev.Key);
        break;
      case DeviceTypeEnum.PowerUnit:
        this.switch(dev.Key);
        break;
      case DeviceTypeEnum.Sensor:
        this.openChart(dev.Key);
        break;
      default:
        break;
    }
  }
  switch = (id: number) => {
    this.devService.switchDevice(id).subscribe();
  };
  setBright = (id: number, brightLvl: number, e: Event) => {
    e.stopPropagation();
    const bright = brightLvl < 0 ?
      0 : brightLvl > 100 ?
        100 : brightLvl;
    this.devService.setBright(id, bright).subscribe();
  }

  openChart = (devId: number) => {
    const initialState = {
      date: new Date(),
      deviceFk: devId,
      onDateChange: (devId: number, date: Date) => this.actionLogService.getActionLogByDate(devId, date.toISOString())
    }
    this.modalService.show(MeasurementChartComponent, { initialState });
  };
}