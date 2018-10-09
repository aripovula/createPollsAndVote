import { ActionReducerMap } from '@ngrx/store';

import * as authReducers from './auth-reducer';
import * as pollsReducers from './polls-reducer';

export interface AppState {
    auth: authReducers.AuthState;
    polls: pollsReducers.PollsState;
  }

export const appReducers: ActionReducerMap<AppState> = {
    auth: authReducers.authReducer,
    polls: pollsReducers.pollsReducer
};
