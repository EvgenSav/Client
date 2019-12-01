import { Component, OnInit, OnChanges } from '@angular/core';
import { DevicesService } from '../devices.service';
import { Observable } from 'rxjs';
import { IDevice } from '../models/Device';
import { Store, select } from '@ngrx/store';
import { IDevicesState } from '../store/devices/reducer';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as Actions from '../store/devices/actions';
import * as Devices from '../store/devices/selectors';
import { IAppState } from '../store/reducer';
import { DeleteDeviceConfirmationComponent } from '../modals/delete-device-modal/modal-content.component';
import { RequestService } from '../request.service';
import { IRequest, RequestTypeEnum, DeviceTypeEnum, RequestStepEnum } from '../models/Request';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { MeasurementChartComponent } from '../modals/measurement-chart/measurement-chart.component';
import { ChartConfig } from '../chart-config';
import { ActionLogService } from '../action-log.service';
import { IChartDataSet, IChartLine } from 'src/app/models/ChartDataPoint';






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  devList$: Observable<IDevice[]>;
  modalRef: BsModalRef;
  constructor(private devService: DevicesService, private store: Store<IAppState>, private modalService: BsModalService,
    private requestServie: RequestService, private actionLogService: ActionLogService) {
    this.devList$ = this.store.select(Devices.getDevices);
  }
  ngOnInit() {
    this.devService.getDevices().subscribe(devices => {
      this.store.dispatch(new Actions.LoadDevices(devices));
    });
  }

  openRemoveConfirm = (device: IDevice, requestId: string) => {
    const initialState = {
      primaryBtnName: 'Delete',
      list: [
        `Device ${device.Name} will be deleted`
      ],
      title: 'Modal with component',
      onPrimaryClicked: () => this.removeConfirmed(requestId)
    };
    this.modalRef = this.modalService.show(DeleteDeviceConfirmationComponent, { initialState });
  }

  removeDevice = (device: IDevice, e: Event) => {
    e.stopPropagation();
    const request: IRequest = {
      DeviceType: device.Type,
      Type: RequestTypeEnum.Unbind,
      Name: device.Name,
      Step: RequestStepEnum.Created,
      MetaData: {
        Channel: device.Channel,
        AddressF: device.Type === DeviceTypeEnum.PowerUnitF ? device.Key : null
      }
    };
    this.requestServie.addNewRequest(request).subscribe(r => this.openRemoveConfirm(device, r.Id));
  }
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
  removeConfirmed = (requestId: string) => {
    this.requestServie.executeRequest(requestId).subscribe();
  }
  openChart = (devId: number) => {

    this.actionLogService.getActionLogByDate(devId, new Date().toISOString())
      .subscribe(res => {
        const lines: IChartLine[] = [];
        const measureKeys: string[] = [];
        if (res.length && res[0].State && res[0].State.MeasuredData) {
          measureKeys.push(...Object.keys(res[0].State.MeasuredData))
          if (measureKeys.includes('Temperature')) {
            lines.push({
              label: 'Temperature',
              data: res.map(r => r.State.MeasuredData.Temperature),
              borderColor: 'rgb(24, 237, 138)',
              borderWidth: 2
            })
          }
          if (measureKeys.includes('Humidity')) {
            lines.push({
              label: 'Humidity',
              data: res.map(r => r.State.MeasuredData.Humidity),
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 2
            })
          }
        }
        const initialState = {
          title: measureKeys.join('/'),
          deviceFk: devId,
          dataset: {
            xAxis: res.map(r => r.TimeStamp),
            ChartLines: lines
          }
        }
        this.modalService.show(MeasurementChartComponent, { initialState });
      });

  }
}

/* Temperature: res.map(r => ({ TimeStamp: r.TimeStamp, Temperature: r.State.MeasuredData.Temperature })),
Humidity: res.map(r => ({ TimeStamp: r.TimeStamp, Humidity: r.State.MeasuredData.Humidity })) */