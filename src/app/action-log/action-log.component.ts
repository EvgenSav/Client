import { Component, OnInit, OnChanges } from '@angular/core';
import { ActionLogService } from '../action-log.service';
import { IActionLogItem } from '../models/ActionLogItem';
import { Store } from '@ngrx/store';
import * as Actions from '../store/action-log/actions';
import * as Selectors from '../store/action-log/selectors';
import { Observable } from 'rxjs';
import { filter, find, map } from 'rxjs/operators'
import { IAppState } from '../store/reducer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-action-log',
  templateUrl: './action-log.component.html',
  styleUrls: ['./action-log.component.scss']
})
export class ActionLogComponent implements OnInit {

  actionLog$: Observable<IActionLogItem[]>;
  devId: number;
  constructor(private actionLogService: ActionLogService, private store: Store<IAppState>, private route: ActivatedRoute) {
    this.actionLog$ = this.store.select(Selectors.getDeviceLog).pipe(map(logsMap => logsMap.get(this.devId)));
    this.route.params.subscribe(params => this.handleChangeRoute());
  }
  getDeviceActionLog = () => {
    this.actionLogService.getActionLog(this.devId).subscribe(logItems => this.store.dispatch(new Actions.LoadDeviceLog(this.devId, logItems)));
    console.log(this.devId);
  }
  ngOnInit() {
   /*  this.getDeviceActionLog(); */
  }
  handleChangeRoute = () => {
    this.devId = +this.route.parent.snapshot.paramMap.get('devId');
    this.getDeviceActionLog();
  };
}
