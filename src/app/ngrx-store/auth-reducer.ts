import { Action } from '@ngrx/store';

import * as AuthActions from './auth-action';

export interface AuthState {
  userId: string;
  userName: string;
  isLoggedIn: boolean;
  loginPoll: string;
}

const initialState: AuthState = {
  userId: null,
  userName: null,
  isLoggedIn: false,
  loginPoll: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SET_USER:
      console.log('in AuthActions.SET_USER');
      return {
        ...state,
        userId: action.payload.uid,
        userName: action.payload.username,
        isLoggedIn: true,
        loginPoll: action.payload.loginPoll
      };

    case AuthActions.REMOVE_USER:
      console.log('in AuthActions.REMOVE_USER');
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        userName: null,
        loginPoll: null
      };

    // case AuthActions.SET_LOGIN_POLL:
    //   console.log('in AuthActions.SET_LOGIN_POLL', action.payload);
    //   return {
    //     ...state,
    //     loginPoll: action.payload
    //   };

    //   case AuthActions.REMOVE_LOGIN_POLL:
    //   console.log('in AuthActions.REMOVE_LOGIN_POLL');
    //   return {
    //     ...state,
    //     loginPoll: null
    //   };

    default:
      return state;
  }
}
