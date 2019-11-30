import { IRequestState } from './reducer';
import { IAppState } from '../reducer';
import { createSelector } from '@ngrx/store';

const requestState = (state: IAppState) => state.request;

export const getRequestList = createSelector(
    requestState,
    (state: IRequestState) => state.requestList
);
export const getBindRequest = (id: string) => createSelector(
    requestState,
    (state: IRequestState) => state.requestList.find(r => r.Id == id)
);
export const getNewRequest = createSelector(
    requestState,
    (state: IRequestState) => state.newRequest
);