import { Action } from "@ngrx/store";
import { IBindRequest } from "../../models/BindRequest";

export enum bindingActionTypes {
    LOAD_BIND_REQUESTS = '[BINDING] LOAD_BIND_REQUESTS',
    ADD_NEW_BIND_REQUEST = '[BINDING] ADD_NEW_BIND_REQUEST',
    PATCH_BIND_REQUEST = '[BINDING] PATCH_BIND_REQUEST'
}

export class LoadBindRequest implements Action {
    readonly type = bindingActionTypes.LOAD_BIND_REQUESTS;
    constructor(public payload: IBindRequest[]) { }
}
export class AddNewBindRequest implements Action {
    readonly type = bindingActionTypes.ADD_NEW_BIND_REQUEST;
    constructor(public payload: IBindRequest) { }
}
export class PatchBindRequest implements Action {
    readonly type = bindingActionTypes.PATCH_BIND_REQUEST;
    constructor(public id: string, public payload: IBindRequest) { }
}
export type BindRequestActions = LoadBindRequest | AddNewBindRequest | PatchBindRequest;