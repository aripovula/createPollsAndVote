import { Action } from '@ngrx/store';

import * as QuestionsActions from './questions-action';
// import { ADD_USER, REMOVE_USER } from '../ngrx-actions/auth.action';

export interface QuestionsState {
  questions: any;
}

const initialState: QuestionsState = {
  questions: null
};

export function questionsReducer(state = initialState, action: QuestionsActions.QuestionsActions) {
  switch (action.type) {

    case QuestionsActions.ADD_QUESTION:
      console.log('in QuestionsActions.ADD_QUESTION');
      return {
        ...state,
        questions: [...state.questions, action.payload]
      };

    case QuestionsActions.REMOVE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(({ id }) => id !== action.id)
      };

    case QuestionsActions.UPDATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map((poll) => {
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

    case QuestionsActions.SET_QUESTIONS:
      console.log('in QuestionsActions.payload = ', action.payload);
      console.log('in QuestionsActions.SET_QUESTION = ', state);
      return {
        ...state,
        questions: action.payload
      };

    default:
      return state;
  }
}
