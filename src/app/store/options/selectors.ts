import { IOptionsState } from './reducer';
import { IAppState } from '../reducer';
import { createSelector } from '@ngrx/store';

const optionsState = (state: IAppState) => state.options;

export const getDeviceTypeOptions = createSelector(
    optionsState,
    (state: IOptionsState) => state.deviceTypeOptions
);