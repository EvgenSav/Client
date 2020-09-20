import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AutomationService } from '../../services/automation.service';
import { automationActionTypes } from './actions';
import { Patch } from 'src/app/patch-helper';

@Injectable()
export class AutomationEffects {
    getAutomations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(automationActionTypes.GET_AUTOMATION_LIST),
            mergeMap(() => this.automationService.getAutomationList()
                .pipe(
                    map(automations => ({ type: automationActionTypes.SET_AUTOMATION_LIST, payload: automations })),
                    catchError(() => of({ type: '[AUTOMATION API] Automation List Load Error' }))
                )
            )
        )
    );
    patchAutomation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(automationActionTypes.PATCH_AUTOMATION),
            mergeMap(() => this.automationService.patchAutomation('', new Patch('','')) 
                .pipe(
                    map(automarion => ({ type: automationActionTypes.SET_AUTOMATION_LIST, payload: [] })),
                    catchError(() => of ({ type: '[AUTOMATION API] Automation List Load Error' }))
                )
            )
        )
    );
    constructor(
        private actions$: Actions,
        private automationService: AutomationService
    ) { }
}