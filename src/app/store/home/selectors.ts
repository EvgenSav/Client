import { IHomeState } from './reducer';
import { IAppState } from '../reducer';
import { createSelector } from '@ngrx/store';

const homeState = (state: IAppState) => state.home;

export const getRooms = createSelector(
    homeState,
    (state: IHomeState) => state.rooms
);