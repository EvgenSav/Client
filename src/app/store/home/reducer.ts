import { HomeActions } from './actions';
import { actionTypes } from './actions';
import update from 'immutability-helper';

export interface IHomeState {
    rooms: string[]
}
const initialState: IHomeState = {
    rooms: []
}

export const homeReducer = (state = initialState, action: HomeActions): IHomeState => {
    switch (action.type) {
        case actionTypes.LOAD_ROOMS: {
            return {
                ...state, rooms: action.payload
            };
        }
        /* case actionTypes.UPDATE_DEVICE: {
            const devices = state.devices;
            const updIdx = devices.findIndex(d => d.key === action.payload.key);
            const updatedDevs = update(devices, { $splice: [[updIdx, 1, action.payload]] });
            return {
                ...state, devices: updatedDevs
            }
        }
        case actionTypes.SELECT_DEV: {
            return {
                ...state, selectedDevKey: action.payload
            }
        } */
        default:
            return { ...state };
    }
}