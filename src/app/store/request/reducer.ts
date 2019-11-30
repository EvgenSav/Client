
import update from 'immutability-helper';
import { IRequest, RequestTypeEnum, DeviceTypeEnum } from 'src/app/models/Request';
import { BindRequestActions, requestActionTypes } from './actions';

export interface IRequestState {
    requestList: IRequest[],
    newRequest: IRequest
}

const initialState: IRequestState = {
    requestList: [],
    newRequest: { Name: '', Type: RequestTypeEnum.Bind, DeviceType: DeviceTypeEnum.RemoteController }
}


export const requestReducer = (state = initialState, action: BindRequestActions): IRequestState => {
    switch (action.type) {
        case requestActionTypes.GET_REQUEST_LIST: {
            return {
                ...state, requestList: action.payload
            };
        }
        case requestActionTypes.ADD_REQUEST: {
            const requests = state.requestList;
            const updatedRequestList = update(requests, { $push: [action.payload] })
            return {
                ...state, requestList: updatedRequestList
            };
        }
        case requestActionTypes.PATCH_REQUEST: {
            const requests = state.requestList;
            const updateIndex = requests.findIndex(r => r.Id === action.id);
            const updatedRequestList = update(requests, { $splice: [[updateIndex, 1, action.payload]] })
            return {
                ...state, requestList: updatedRequestList
            };
        }
        case requestActionTypes.DELETE_REQUEST: {
            const requests = state.requestList;
            const updateIndex = requests.findIndex(r => r.Id === action.id);
            const updatedRequestList = update(requests, { $splice: [[updateIndex, 1]] })
            return {
                ...state, requestList: updatedRequestList
            };
        }
        case requestActionTypes.PATCH_NEW_REQUEST: {
            return {
                ...state, newRequest: action.payload
            };
        }
        case requestActionTypes.RESET_NEW_REQUEST: {
            return {
                ...state, newRequest: initialState.newRequest
            }
        }
        default:
            return { ...state };
    }
}

