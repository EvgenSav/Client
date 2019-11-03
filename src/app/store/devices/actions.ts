import { Action } from '@ngrx/store';
import { IDevice } from '../../models/Device';

export enum actionTypes {
    LOAD_ALL = '[DEVICES] Load All',
    UPDATE_DEVICE = '[Device] Update',
    SELECT_DEV = '[Device] Select',
    ADD_DEVICE = '[DEVICES] Add'
}

export class LoadDevices implements Action {
    readonly type = actionTypes.LOAD_ALL;
    constructor(public payload: IDevice[]) { }
}
export class UpdateDevice implements Action {
    readonly type = actionTypes.UPDATE_DEVICE;
    constructor(public payload: IDevice) { }
}
export class AddDevice implements Action {
    readonly type = actionTypes.ADD_DEVICE;
    constructor(public payload: IDevice) { }
}
export class SelectDevice implements Action {
    readonly type = actionTypes.SELECT_DEV;
    constructor(public payload: number) { }
}
export type DevicesActions = LoadDevices | UpdateDevice | SelectDevice | AddDevice;