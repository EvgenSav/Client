import {
    ActionReducerMap, createSelector, createFeatureSelector,
    ActionReducer, MetaReducer
} from '@ngrx/store';

import { DevicesState } from './devices/reducers';
import { devicesReducer } from './devices/reducers';

export interface State {
    devices: DevicesState;    
}

export const reducer: ActionReducerMap<State> = {
    devices: devicesReducer
};
export function logger(reducer: ActionReducer<State>):
    ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}
export const metaReducers: MetaReducer<State>[] = [logger];