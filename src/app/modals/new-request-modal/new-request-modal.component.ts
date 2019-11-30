import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IRequest, DeviceTypeEnum, RequestTypeEnum } from 'src/app/models/Request';
import { IAppState } from 'src/app/store/reducer';
import { Store } from '@ngrx/store';
import { getNewRequest } from 'src/app/store/request/selectors';
import { Observable } from 'rxjs';
import { PatchNewRequest, ResetNewRequest } from 'src/app/store/request/actions';

@Component({
  selector: 'app-new-request-modal',
  templateUrl: './new-request-modal.component.html',
  styleUrls: ['./new-request-modal.component.scss']
})
export class NewRequestModalComponent implements OnInit {
  title: string;
  request$: Observable<IRequest>;
  request: IRequest;
  onPrimaryClick: (request: IRequest) => void;

  deviceTypeOptions: any[] = Object.keys(DeviceTypeEnum)
    .filter(key => !isNaN(Number(key)))
    .map(key => ({ Key: key, Value: DeviceTypeEnum[key] }));
  requestTypeOptions: any[] = Object.keys(RequestTypeEnum)
    .filter(key => !isNaN(Number(key)))
    .map(key => ({ Key: key, Value: RequestTypeEnum[key] }));

  constructor(public bsModalRef: BsModalRef, private store: Store<IAppState>) {
    this.store.select(getNewRequest).subscribe(req => this.request = req);
  }

  patchBindRequest = (val: any, path: string) => {
    this.store.dispatch(new PatchNewRequest({ ...this.request, [path]: val }));
  }

  createBtnClick = () => {
    if (this.onPrimaryClick !== null) {
      this.onPrimaryClick(this.request);
    }
    this.bsModalRef.hide();
    this.store.dispatch(new ResetNewRequest())
  }
  closeBtnClick = () => {
    this.bsModalRef.hide();
    this.store.dispatch(new ResetNewRequest())
  }

  ngOnInit() {
  }

}
