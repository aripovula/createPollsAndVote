import { Action } from '@ngrx/store';

// import { User } from '../models/user.model';
import { NewPoll } from './../new_poll-module/models/new_poll-model';

export const ADD_POLL = 'ADD_POLL';
export const SET_POLLS = 'SET_POLLS';
export const REMOVE_POLL = 'REMOVE_POLL';
export const UPDATE_POLL = 'UPDATE_POLL';


export class AddPoll implements Action {
    readonly type = ADD_POLL;
    constructor (public payload: NewPoll) {}
}

export class SetPolls implements Action {
    readonly type = SET_POLLS;
    constructor (public payload: Array<NewPoll>) {}
}

export class RemovePoll implements Action {
    readonly type = REMOVE_POLL;
    // takes poll ID only
    constructor (public id: string) {}
}

export class UpdatePoll implements Action {
    readonly type = UPDATE_POLL;
    constructor (public payload: NewPoll, public id: string) {}
}

// export type AuthActions = AddUser;
export type PollsActions = AddPoll | SetPolls | RemovePoll | UpdatePoll;
