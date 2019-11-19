import { ActionLogActions } from './actions';
import { IDevice } from '../../models/Device';
import { actionTypes } from './actions';
import update from 'immutability-helper';
import { IActionLogItem } from '../../models/ActionLogItem';

export interface IActionLogState {
    actionLogMap: Map<number, IActionLogItem[]>
}
const initialState: IActionLogState = {
    actionLogMap: new Map<number, []>()
}

export const actionLogReducer = (state = initialState, action: ActionLogActions): IActionLogState => {
    switch (action.type) {
        case actionTypes.LOAD_DEVICE_LOG: {
            const updatedActionLogMap = state.actionLogMap.set(action.devId, action.payload);
            return {
                ...state, actionLogMap: updatedActionLogMap
            };
        }
        case actionTypes.ADD_LOG_ITEMS: {
            const logItems = state.actionLogMap.get(action.devId);
            const updatedActionLogMap = state.actionLogMap.set(action.devId, [...action.payload, ...logItems]);
            return {
                ...state, actionLogMap: updatedActionLogMap
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