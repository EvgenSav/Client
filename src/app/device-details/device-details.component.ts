import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../devices.service';
import { IDevice } from '../models/Device';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { IAppState } from '../store/reducer';
import { Store } from '@ngrx/store';
import { getDevices } from '../store/devices/selectors';
import { Patch } from '../patch-helper';
import { getRooms } from '../store/home/selectors';
import { RequestService } from '../request.service';
import { IRequest, RequestTypeEnum, RequestStepEnum, DeviceTypeEnum } from '../models/Request';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteDeviceConfirmationComponent } from '../modals/delete-device-modal/modal-content.component';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {
  dev$: Observable<IDevice>;
  rooms$: Observable<string[]>;
  devId: number;
  modalRef: BsModalRef;
  constructor(private devService: DevicesService, private route: ActivatedRoute, private store: Store<IAppState>, 
    private requestServie: RequestService, private modalService: BsModalService) {
    this.dev$ = this.store.select(getDevices).pipe(map(devs => devs.find(d => d.Key === this.devId)));
    this.rooms$ = this.store.select(getRooms);
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
  removeConfirmed = (requestId: string) => {
    this.requestServie.executeRequest(requestId).subscribe();
  }
  patchDevice = (value: string, path: string) => {
    console.log(value, path);
    const patch = new Patch(value, path);
    this.devService.patchDevice(this.devId, patch).subscribe();
  }
  setBright = (brightValue: number) => {
    console.log(brightValue);
    this.devService.setBright(this.devId, brightValue).subscribe();
  }
  ngOnInit() {
    this.devId = +this.route.snapshot.paramMap.get('devId');
    /* this.devService.getDeviceById(devId).subscribe(r => { this.dev = r; this.isDataOk = true; }); */
  }
}
