import { Action } from "@ngrx/store";
import { IAutomation } from 'src/app/models/Automation';

export enum automationActionTypes {
    GET_AUTOMATION_LIST = '[AUTOMATION] GET_AUTOMATION_LIST',
    SET_AUTOMATION_LIST = '[AUTOMATION API] AUTOMATION_LIST_LOADED',
    ADD_AUTOMATION = '[AUTOMATION] ADD_AUTOMATION',
    DELETE_AUTOMATION = '[AUTOMATION] DELETE_AUTOMATION',
    PATCH_AUTOMATION = '[AUTOMATION] PATCH_AUTOMATION',
    PATCH_NEW_AUTOMATION = '[AUTOMATION] PATCH_NEW_AUTOMATION',
    RESET_NEW_AUTOMATION = '[AUTOMATION] RESET_NEW_AUTOMATION'
}

export class SetAutomationList implements Action {
    readonly type = automationActionTypes.SET_AUTOMATION_LIST;
    constructor(public payload: IAutomation[]) { }
}
export class AddAutomation implements Action {
    readonly type = automationActionTypes.ADD_AUTOMATION;
    constructor(public payload: IAutomation) { }
}
export class PatchAutomation implements Action {
    readonly type = automationActionTypes.PATCH_AUTOMATION;
    constructor(public id: string, public payload: IAutomation) { }
}
export class DeleteAutomation implements Action {
    readonly type = automationActionTypes.DELETE_AUTOMATION;
    constructor(public id: string) { }
}

export class PatchNewAutomation implements Action {
    readonly type = automationActionTypes.PATCH_NEW_AUTOMATION;
    constructor(public payload: IAutomation) { }
}
export class ResetNewAutomation implements Action {
    readonly type = automationActionTypes.RESET_NEW_AUTOMATION;
}

export type AutomationActions = SetAutomationList | AddAutomation | PatchAutomation | DeleteAutomation | PatchNewAutomation | ResetNewAutomation;