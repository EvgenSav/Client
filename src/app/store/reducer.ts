import {
    ActionReducerMap, createSelector, createFeatureSelector,
    ActionReducer, MetaReducer
} from '@ngrx/store';

import { IDevicesState } from './devices/reducer';
import { devicesReducer } from './devices/reducer';
import { IHomeState, homeReducer } from './home/reducer';

export interface IAppState {
    devices: IDevicesState;
    home: IHomeState;
}

export const reducer: ActionReducerMap<IAppState, any> = {
    devices: devicesReducer,
    home: homeReducer
};
export function logger(reducer: ActionReducer<IAppState>):
    ActionReducer<IAppState> {
    return function (state: IAppState, action: any): IAppState {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}
export const metaReducers: MetaReducer<IAppState>[] = [logger];