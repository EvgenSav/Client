import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBindRequest, DeviceTypeEnum } from '../models/BindRequest';
import { BindingService } from '../binding.service';
import { IAppState } from '../store/reducer';
import { Store } from '@ngrx/store';
import { LoadBindRequest, AddNewBindRequest, PatchBindRequest } from '../store/binding/actions';
import { Observable } from 'rxjs';
import { getBindRequestList } from '../store/binding/selectors';
import { Patch } from '../patch-helper';
import { request } from 'https';
import { getRooms } from '../store/home/selectors';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.scss']
})
export class BindingComponent implements OnInit {
  bindRequests$: Observable<IBindRequest[]>;
  rooms$: Observable<string[]>;
  constructor(private bindService: BindingService, private store: Store<IAppState>) {
    this.bindRequests$ = this.store.select(getBindRequestList);
    this.rooms$ = this.store.select(getRooms);
  }
  getBindRequests = () => {
    this.bindService.getBindRequests().subscribe(requests => this.store.dispatch(new LoadBindRequest(requests)))
  }
  addNewBindRequest = () => {
    const model: IBindRequest = {
      deviceFk: null,
      name: 'new device',
      deviceType: DeviceTypeEnum.PowerUnit,
      type: 0
    }
    this.bindService.addNewBindRequests(model).subscribe(bindRequest => this.store.dispatch(new AddNewBindRequest(bindRequest)));
  }
  ngOnInit() {    
    this.getBindRequests();
  }

}
