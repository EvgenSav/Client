import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAutomation } from '../models/Automation';
import { IAppState } from '../store/reducer';
import { Store } from '@ngrx/store';
import { Patch } from '../patch-helper';

@Component({
  selector: 'app-automation-details',
  templateUrl: './automation-details.component.html',
  styleUrls: ['./automation-details.component.scss']
})
export class AutomationDetailsComponent implements OnInit {
  automationItem$: Observable<IAutomation>;
  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {
    console.log('constructor')
    this.route.params.subscribe(p => {
      console.log('subscribe', p)
      this.automationItem$ = this.store.select(state => state.automation.automationList.find(r => r.Id == p.id))
    })
  }
  patchAutomation = (value: string, path: string) => {
    const patch = new Patch(value, path);
    console.log(patch);
  }
  ngOnInit(): void {
  }

}
