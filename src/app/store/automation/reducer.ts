
import update from 'immutability-helper';
import { IAutomation } from 'src/app/models/Automation';
import { AutomationActions, automationActionTypes } from './actions';

export interface IAutomationState {
    automationList: IAutomation[],
    newAutomation: IAutomation
}

const initialState: IAutomationState = {
    automationList: [],
    newAutomation: { Id: '', Name: '' }
}


export const automationReducer = (state = initialState, action: AutomationActions): IAutomationState => {
    switch (action.type) {
        case automationActionTypes.SET_AUTOMATION_LIST: {
            return {
                ...state, automationList: action.payload
            };
        }
        case automationActionTypes.ADD_AUTOMATION: {
            const automations = state.automationList;
            const updatedAutomationList = update(automations, { $push: [action.payload] })
            return {
                ...state, automationList: updatedAutomationList
            };
        }
        case automationActionTypes.PATCH_AUTOMATION: {
            const automations = state.automationList;
            const updateIndex = automations.findIndex(r => r.Id === action.id);
            const updatedAutomationList = update(automations, { $splice: [[updateIndex, 1, action.payload]] })
            return {
                ...state, automationList: updatedAutomationList
            };
        }
        case automationActionTypes.DELETE_AUTOMATION: {
            const automations = state.automationList;
            const updateIndex = automations.findIndex(r => r.Id === action.id);
            const updatedAutomationList = update(automations, { $splice: [[updateIndex, 1]] })
            return {
                ...state, automationList: updatedAutomationList
            };
        }
        case automationActionTypes.PATCH_NEW_AUTOMATION: {
            return {
                ...state, newAutomation: action.payload
            };
        }
        case automationActionTypes.RESET_NEW_AUTOMATION: {
            return {
                ...state, newAutomation: initialState.newAutomation
            }
        }
        default:
            return { ...state };
    }
}

