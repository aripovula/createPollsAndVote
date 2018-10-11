import { ActionReducerMap } from '@ngrx/store';

import * as authReducers from './auth-reducer';
import * as pollsReducers from './polls-reducer';
import * as questionsReducers from './questions-reducer';

export interface AppState {
    auth: authReducers.AuthState;
    polls: pollsReducers.PollsState;
    questions: questionsReducers.QuestionsState;
  }

export const appReducers: ActionReducerMap<AppState> = {
    auth: authReducers.authReducer,
    polls: pollsReducers.pollsReducer,
    questions: questionsReducers.questionsReducer
};
