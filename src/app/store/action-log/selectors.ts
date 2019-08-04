import { IActionLogState } from './reducer';
import { IAppState } from '../reducer';
import { createSelector } from '@ngrx/store';

const actionLogState = (state: IAppState) => state.actionLog;

export const getDeviceLog = createSelector(
    actionLogState,
    (state: IActionLogState, devId: number) => state.actionLogMap.get(devId)
);