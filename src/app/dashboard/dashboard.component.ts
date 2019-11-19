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
import { ModalContentComponent } from '../modal-content/modal-content.component';






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  devList$: Observable<IDevice[]>;
  modalRef: BsModalRef;
  constructor(private devService: DevicesService, private store: Store<IAppState>, private modalService: BsModalService) {
    this.devList$ = this.store.select(Devices.getDevices);
  }
  ngOnInit() {
    this.devService.getDevices().subscribe(devices => {
      this.store.dispatch(new Actions.LoadDevices(devices));
    });
  }
  removeDevice = (key: number) => {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.modalRef = this.modalService.show(ModalContentComponent, { initialState});
    console.log(key);
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
}
