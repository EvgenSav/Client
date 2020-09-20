import { Component, OnInit } from '@angular/core';
import { IAutomation } from '../models/Automation';
import { Store } from '@ngrx/store';
import { automationActionTypes } from '../store/automation/actions';
import { Observable } from 'rxjs';
import { IAppState } from '../store/reducer';

@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.scss']
})

export class AutomationComponent implements OnInit {
  automationList$: Observable<IAutomation[]>;
  constructor(private store: Store<IAppState>) {
    this.automationList$ = this.store.select(state => state.automation.automationList);
  }

  ngOnInit(): void {
    this.store.dispatch({ type: automationActionTypes.GET_AUTOMATION_LIST })
  }
}
