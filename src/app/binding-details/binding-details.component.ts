import { Component, OnInit } from '@angular/core';
import { BindingService } from '../binding.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/reducer';
import { Patch } from '../patch-helper';
import { PatchBindRequest } from '../store/binding/actions';
import { ActivatedRoute } from '@angular/router';
import { IBindRequest } from '../models/BindRequest';
import { Observable } from 'rxjs';
import { getBindRequestList, getBindRequest } from '../store/binding/selectors';
import { IOption } from '../models/Option';
import { getDeviceTypeOptions } from '../store/options/selectors';

@Component({
  selector: 'app-binding-details',
  templateUrl: './binding-details.component.html',
  styleUrls: ['./binding-details.component.scss']
})
export class BindingDetailsComponent implements OnInit {
  requestId: string;
  request$: Observable<IBindRequest>;
  options$: Observable<IOption[]>;
  constructor(private bindService: BindingService, private store: Store<IAppState>, private route: ActivatedRoute) {
    route.params.subscribe(params => this.handleRouteChanges(params))
  }
  patchBindRequest = (val: any, path: string) => {
    const patch = new Patch(val, path);
    this.bindService.pathBindingRequest(this.requestId, patch).subscribe(request => this.store.dispatch(new PatchBindRequest(this.requestId, request)))
  }
  ngOnInit() {
    this.options$ = this.store.select(getDeviceTypeOptions);
  }
  handleRouteChanges = (params: object) => {
    const keys = Object.keys(params);
    if (keys.includes('id')) {
      this.requestId = this.route.snapshot.paramMap.get('id');
      this.request$ = this.store.select(getBindRequest(this.requestId));
    }
  }
}
