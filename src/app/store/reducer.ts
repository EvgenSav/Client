import {
    ActionReducerMap, createSelector, createFeatureSelector,
    ActionReducer, MetaReducer
} from '@ngrx/store';

import { IDevicesState } from './devices/reducer';
import { devicesReducer } from './devices/reducer';
import { IHomeState, homeReducer } from './home/reducer';
import { IActionLogState, actionLogReducer } from './action-log/reducer';
import { requestReducer, IRequestState } from './request/reducer';
import { automationReducer, IAutomationState } from './automation/reducer';
import { IOptionsState, optionsReducer } from './options/reducer';

export interface IAppState {
    devices: IDevicesState;
    actionLog: IActionLogState;
    home: IHomeState;
    request: IRequestState,
    options: IOptionsState,
    automation: IAutomationState
}

export const reducer: ActionReducerMap<IAppState, any> = {
    devices: devicesReducer,
    actionLog: actionLogReducer,
    home: homeReducer,
    request: requestReducer,
    automation: automationReducer,
    options: optionsReducer
};
export function logger(reducer: ActionReducer<IAppState>):
    ActionReducer<IAppState> {
    return function (state: IAppState, action: any): IAppState {
        /* console.log('state', state);
        console.log('action', action); */
        return reducer(state, action);
    };
}
export const metaReducers: MetaReducer<IAppState>[] = [logger];