import { ActionReducerMap } from '@ngrx/store';

import * as pollsReducers from './polls-reducer';

export interface AppState {
    polls: pollsReducers.PollsState;
  }

export const appReducers: ActionReducerMap<AppState> = {
    polls: pollsReducers.pollsReducer
};
