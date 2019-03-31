import { Action } from '@ngrx/store';
import { IActionLogItem } from '../../models/ActionLogItem';

export enum actionTypes {
    LOAD_DEVICE_LOG = '[ACTION_LOG] Load Ddevice Log',
}

export class LoadDeviceLog implements Action {
    readonly type = actionTypes.LOAD_DEVICE_LOG;
    constructor(public devId: number, public payload: IActionLogItem[]) { }
}
export type ActionLogActions = LoadDeviceLog; // | UpdateDevice | SelectDevice;