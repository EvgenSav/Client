import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActionLogService } from '../action-log.service';
import { IActionLogItem } from '../models/ActionLogItem';
import { Store } from '@ngrx/store';
import * as Actions from '../store/action-log/actions';
import * as Selectors from '../store/action-log/selectors';
import { Observable, of } from 'rxjs';
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
    this.route.params.subscribe(params => this.handleChangeRoute());
  }
  getDeviceActionLog = () => {
    this.actionLogService.getActionLog(this.devId)
      .subscribe(logItems => this.loadActionLog(logItems));
  }
  loadActionLog = (items) => {
    this.store.dispatch(new Actions.LoadDeviceLog(this.devId, items))
  }
  addActionLogItems = (items: IActionLogItem[]) => {
    this.store.dispatch(new Actions.AddLogItems(this.devId, items))
  }
  ngOnInit() {
    /*  this.getDeviceActionLog(); */
  }
  handleChangeRoute = () => {
    console.log('change route');
    this.devId = +this.route.parent.snapshot.paramMap.get('devId');
    console.log(this.devId);
    this.getDeviceActionLog();
    this.actionLog$ = this.store.select(Selectors.getDeviceLog, this.devId);

  };
}
