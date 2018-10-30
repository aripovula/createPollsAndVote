import { Action } from '@ngrx/store';
// import { User } from '../models/user.model';

export const SET_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
// export const SET_USER_ID = 'SET_USER_ID';
// export const SET_LOGIN_POLL = 'SET_LOGIN_POLL';
// export const REMOVE_LOGIN_POLL = 'REMOVE_LOGIN_POLL';

export class SetUser implements Action {
    readonly type = SET_USER;
    constructor (public payload: {uid: string, username: string, loginPoll: string}) {}
}

export class RemoveUser implements Action {
    readonly type = REMOVE_USER;
}

// export class SetLoginPoll implements Action {
//     readonly type = SET_LOGIN_POLL;
//     constructor (public payload: string) {}
// }

// export class RemoveLoginPoll implements Action {
//     readonly type = REMOVE_LOGIN_POLL;
// }

// export type AuthActions = AddUser;
export type AuthActions = SetUser | RemoveUser ; // | SetLoginPoll | RemoveLoginPoll;
