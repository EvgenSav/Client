import { IBindingState } from './reducer';
import { IAppState } from '../reducer';
import { createSelector } from '@ngrx/store';

const bindingState = (state: IAppState) => state.bindRequest;

export const getBindRequestList = createSelector(
    bindingState,
    (state: IBindingState) => state.bindRequestList
);
export const getBindRequest = (id: string) => createSelector(
    bindingState,
    (state: IBindingState) => state.bindRequestList.find(r => r.id == id)
);