
import { IDevice } from '../../models/Device';
import update from 'immutability-helper';
import { IBindRequest } from '../../models/BindRequest';
import { BindRequestActions, bindingActionTypes } from './actions';
import { getBindRequestList } from './selectors';

export interface IBindingState {
    bindRequestList: IBindRequest[]
}
const initialState: IBindingState = {
    bindRequestList: []
}


export const bindingReducer = (state = initialState, action: BindRequestActions): IBindingState => {
    switch (action.type) {
        case bindingActionTypes.LOAD_BIND_REQUESTS: {
            return {
                ...state, bindRequestList: action.payload
            };
        }
        case bindingActionTypes.ADD_NEW_BIND_REQUEST: {
            const requests = state.bindRequestList;
            const updatedRequestList = update(requests, { $push: [action.payload] })
            return {
                ...state, bindRequestList: updatedRequestList
            };
        }
        case bindingActionTypes.PATCH_BIND_REQUEST: {
            const requests = state.bindRequestList;
            const updateIndex = requests.findIndex(r => r.Id === action.id);
            const updatedRequestList = update(requests, { $splice: [[updateIndex, 1, action.payload]] })
            return {
                ...state, bindRequestList: updatedRequestList
            };
        }
        default:
            return { ...state };
    }
}

