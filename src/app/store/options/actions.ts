import { Action } from "@ngrx/store";
import { IRequest } from "../../models/Request";

export enum optionsActionTypes {
    LOAD_GENERAL_OPTIONS = '[OPTIONS] LOAD_GENERAL_OPTIONS',
}

export class LoadGeneralOptions implements Action {
    readonly type = optionsActionTypes.LOAD_GENERAL_OPTIONS;
    constructor(public payload: object) { }
}
export type OptionsActions = LoadGeneralOptions;