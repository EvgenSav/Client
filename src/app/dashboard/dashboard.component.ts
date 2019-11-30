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






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  devList$: Observable<IDevice[]>;
  modalRef: BsModalRef;
  constructor(private devService: DevicesService, private store: Store<IAppState>, private modalService: BsModalService,
    private requestServie: RequestService) {
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
  switch = (id: number, e: Event) => {
    e.stopPropagation();
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
}
