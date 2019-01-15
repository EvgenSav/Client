import { Action } from '@ngrx/store';

export enum actionTypes {
    LOAD_ROOMS = '[HOME] Load Rooms',
}

export class LoadRooms implements Action {
    readonly type = actionTypes.LOAD_ROOMS;
    constructor(public payload: string[]) { }
}
export type HomeActions = LoadRooms;