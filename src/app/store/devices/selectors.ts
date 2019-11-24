import { IDevicesState } from './reducer';
import { IAppState } from '../reducer';
import { createSelector } from '@ngrx/store';

const devicesState = (state: IAppState) => state.devices;

export const getDevices = createSelector(
    devicesState,
    (state: IDevicesState) => state.devices
);
export const getSelectedDeviceKey = createSelector(
    devicesState,
    (state: IDevicesState) => state.selectedDevKey
);