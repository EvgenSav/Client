import { IAutomationState } from './reducer';
import { IAppState } from '../reducer';
import { createSelector } from '@ngrx/store';

const automationState = (state: IAppState) => state.automation;

export const getAutomationList = createSelector(
    automationState,
    (state: IAutomationState) => state.automationList
);
export const getAutomation = (id: string) => createSelector(
    automationState,
    (state: IAutomationState) => state.automationList.find(r => r.Id == id)
);
export const getNewAutomation = createSelector(
    automationState,
    (state: IAutomationState) => state.newAutomation
);