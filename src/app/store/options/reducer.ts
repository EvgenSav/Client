import { OptionsActions, optionsActionTypes } from './actions';
import { IOption } from '../../models/Option';

export interface IOptionsState {
    deviceTypeOptions: IOption[]
}
const initialState: IOptionsState = {
    deviceTypeOptions: []
}


export const optionsReducer = (state = initialState, action: OptionsActions): IOptionsState => {
    switch (action.type) {
        case optionsActionTypes.LOAD_GENERAL_OPTIONS: {
            return {
                ...state, deviceTypeOptions: action.payload['deviceTypeOptions'] as IOption[]
            };
        }
        default:
            return { ...state };
    }
}

