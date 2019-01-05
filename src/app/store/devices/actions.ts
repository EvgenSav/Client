import { Action } from '@ngrx/store';
import { Device } from '../../models/Device';

export const actionTypes = {
    LOAD_ALL:  '[DEVICES] Load All',
    UPDATE_DEVICE: '[Device] Update'
}

export class LoadDevices implements Action {
    readonly type = actionTypes.LOAD_ALL;
    constructor(public payload: Device[]) { }
}
export class UpdateDevice implements Action {
    readonly type = actionTypes.UPDATE_DEVICE;
    constructor(public payload: Device) { }
}
export type Action = LoadDevices /* | UpdateDevice */;