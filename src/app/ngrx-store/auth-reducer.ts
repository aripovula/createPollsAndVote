import { Action } from '@ngrx/store';

import * as AuthActions from './auth-action';

export interface AuthState {
  userId: string;
  token: string;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  userId: null,
  token: null,
  isLoggedIn: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SET_USER:
      console.log('in AuthActions.ADD_USER');
      return {
        ...state,
        userId: action.payload,
        isLoggedIn: true
      };

    case AuthActions.REMOVE_USER:
      console.log('in AuthActions.REMOVE_USER');
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
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
