import { Action } from './actions';
import { Device } from '../../models/Device';
import * as Actions from './actions';
import { actionTypes } from './actions';
import * as Selectors from './selectors';
import update from 'immutability-helper';

export interface DevicesState {
    devices: Device[],
    selectedDevKey: number
}

export const devicesReducer = (state: DevicesState = { devices: [], selectedDevKey: null }, action: Action) => {
    switch (action.type) {
        case actionTypes.LOAD_ALL: {
            return {
                ...state, devices: action.payload
            };
        }
        case actionTypes.UPDATE_DEVICE: {
            const devices = Selectors.getDevices(state);
            const dev = action.payload as Device;
            const updIdx = devices.findIndex(d => d.key === dev.key);
            const updatedDevs = update(devices, { $splice: [[updIdx, 1, dev]] });
            return {
                ...state, devices: updatedDevs
            }
        }
        default:
            return state;
    }
}