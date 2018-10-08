import { NewPoll } from './../new_poll-module/models/new_poll-model';
import { Action } from '@ngrx/store';

import * as PollsActions from './polls-action';
// import { ADD_USER, REMOVE_USER } from '../ngrx-actions/auth.action';

export interface PollsState {
  polls: Array<NewPoll>;
}

const initialState: PollsState = {
    polls: []
  };

export function pollsReducer(state: PollsState = initialState, action: PollsActions.PollsActions) {
  switch (action.type) {

    case PollsActions.ADD_POLL:
      console.log('in PollsActions.ADD_POLL');
      return {
        ...state,
        ...action.payload
      };

    case PollsActions.REMOVE_POLL:
        return {
            ...state,
            ...state.polls.filter(({ id }) => id !== action.id)
        };

    case PollsActions.UPDATE_POLL:
    return {
        ...state,
        ...state.polls.map((poll) => {
        if (poll.id === action.id) {
          return {
            ...poll,
            ...action.payload
          };
        } else {
          return poll;
        }
      })
    };

    case PollsActions.SET_POLLS:
      console.log('in PollsActions.payload = ', action.payload);
      console.log('in PollsActions.SET_POLL = ', state.polls);
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
