import { Action } from "@ngrx/store";
import { IRequest } from "../../models/Request";

export enum requestActionTypes {
    GET_REQUEST_LIST = '[REQUEST] GET_REQUEST_LIST',
    ADD_REQUEST = '[REQUEST] ADD_REQUEST',
    DELETE_REQUEST = '[REQUEST] DELETE_REQUEST',
    PATCH_REQUEST = '[REQUEST] PATCH_REQUEST',
    PATCH_NEW_REQUEST = '[REQUEST] PATCH_NEW_REQUEST',
    RESET_NEW_REQUEST = '[REQUEST] RESET_NEW_REQUEST'
}

export class GetRequestList implements Action {
    readonly type = requestActionTypes.GET_REQUEST_LIST;
    constructor(public payload: IRequest[]) { }
}
export class AddRequest implements Action {
    readonly type = requestActionTypes.ADD_REQUEST;
    constructor(public payload: IRequest) { }
}
export class PatchRequest implements Action {
    readonly type = requestActionTypes.PATCH_REQUEST;
    constructor(public id: string, public payload: IRequest) { }
}
export class DeleteRequest implements Action {
    readonly type = requestActionTypes.DELETE_REQUEST;
    constructor(public id: string) { }
}
export class PatchNewRequest implements  Action {
    readonly type = requestActionTypes.PATCH_NEW_REQUEST;
    constructor(public payload: IRequest) {}
}
export class ResetNewRequest implements  Action {
    readonly type = requestActionTypes.RESET_NEW_REQUEST;
}

export type BindRequestActions = GetRequestList | AddRequest | PatchRequest | PatchNewRequest | ResetNewRequest | DeleteRequest;