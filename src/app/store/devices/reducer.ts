import { DevicesActions } from './actions';
import { IDevice } from '../../models/Device';
import { actionTypes } from './actions';
import update from 'immutability-helper';

export interface IDevicesState {
    devices: IDevice[],
    device: IDevice,
    selectedDevKey: number
}
const initialState: IDevicesState = {
    devices: [],
    device: null,
    selectedDevKey: null
}

export const devicesReducer = (state = initialState, action: DevicesActions): IDevicesState => {
    switch (action.type) {
        case actionTypes.LOAD_ALL: {
            return {
                ...state, devices: action.payload
            };
        }
        case actionTypes.UPDATE_DEVICE: {
            const devices = state.devices;
            const updIdx = devices.findIndex(d => d.key === action.payload.key);
            const updatedDevs = update(devices, { $splice: [[updIdx, 1, action.payload]] });
            return {
                ...state, devices: updatedDevs
            }
        }
        case actionTypes.ADD_DEVICE: {
            const devices = state.devices;
            const updatedDevs = update(devices, { $push: [action.payload] });
            return {
                ...state, devices: updatedDevs
            }
        }
        case actionTypes.SELECT_DEV: {
            return {
                ...state, selectedDevKey: action.payload
            }
        }
        default:
            return { ...state };
    }
}