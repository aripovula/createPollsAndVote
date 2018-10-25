import { Action } from '@ngrx/store';

import * as AuthActions from './auth-action';

export interface AuthState {
  userId: string;
  userName: string;
  token: string;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  userId: null,
  userName: null,
  token: null,
  isLoggedIn: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SET_USER:
      console.log('in AuthActions.SET_USER');
      return {
        ...state,
        userId: action.payload.uid,
        userName: action.payload.username,
        isLoggedIn: true
      };

    case AuthActions.REMOVE_USER:
      console.log('in AuthActions.REMOVE_USER');
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        userName: null,
        token: null
      };

    case AuthActions.SET_TOKEN:
      console.log('in AuthActions.SET_TOKEN', action.payload);
      return {
        ...state,
        token: action.payload
      };

    case AuthActions.SET_USER_ID:
      console.log('in AuthActions. state =', state);
      return {
        ...state,
        userId: action.payload
      };

    default:
      return state;
  }
}
