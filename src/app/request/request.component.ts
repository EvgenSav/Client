import { Component, OnInit } from '@angular/core';
import { IRequest, RequestStepEnum, RequestTypeEnum, DeviceTypeEnum } from '../models/Request';
import { RequestService } from '../request.service';
import { IAppState } from '../store/reducer';
import { Store } from '@ngrx/store';
import { GetRequestList, AddRequest, ResetNewRequest } from 'src/app/store/request/actions';
import { Observable } from 'rxjs';
import { getRequestList as getRequestList } from '../store/request/selectors';
import { getRooms } from '../store/home/selectors';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NewRequestModalComponent } from '../modals/new-request-modal/new-request-modal.component';
import { WindowService } from '../window.service';

@Component({
  selector: 'app-binding',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  requests$: Observable<IRequest[]>;
  rooms$: Observable<string[]>;
  screenWidth: number;

  requestStepOptions: any[] = Object.keys(RequestStepEnum)
    .filter(r => isNaN(parseInt(r)))
  requestTypeOptions: any[] = Object.keys(RequestTypeEnum)
    .filter(r => isNaN(parseInt(r)))
  deviceTypeOptions: any[] = Object.keys(DeviceTypeEnum)
    .filter(r => isNaN(parseInt(r)))

  constructor(private requestService: RequestService, private store: Store<IAppState>, private modalService: BsModalService, private windowService: WindowService) {
    this.requests$ = this.store.select(getRequestList);
    this.rooms$ = this.store.select(getRooms);
  }
  getBindRequests = () => {
    this.requestService.getRequests().subscribe(requests => this.store.dispatch(new GetRequestList(requests)))
  }
  addNewBindRequest = () => {
    const initialState = {
      title: 'Request Details',
      onPrimaryClick: (req: IRequest) => this.requestService.addNewRequest(req).subscribe()
    };
    this.modalService.show(NewRequestModalComponent, { initialState })
  }
  executeRequest = (id: string) => {
    this.requestService.executeRequest(id).subscribe();
  }
  deleteRequest = (id: string) => {
    this.requestService.deleteRequest(id).subscribe();
  }
  ngOnInit() {
    this.getBindRequests();
    this.screenWidth = this.windowService.getWindowRef().innerWidth;
  }

}
