import { Action } from '@ngrx/store';

// import { User } from '../models/user.model';
import { NewQuestion } from './../new_poll-module/models/new_question-model';

export const ADD_QUESTION = 'ADD_QUESTION';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';


export class AddQuestion implements Action {
    readonly type = ADD_QUESTION;
    constructor (public payload: NewQuestion) {}
}

export class SetQuestions implements Action {
    readonly type = SET_QUESTIONS;
    constructor (public payload: Array<NewQuestion>) {}
}

export class RemoveQuestion implements Action {
    readonly type = REMOVE_QUESTION;
    // takes poll ID only
    constructor (public id: string) {}
}

export class UpdateQuestion implements Action {
    readonly type = UPDATE_QUESTION;
    constructor (public payload: NewQuestion, public id: string) {}
}

// export type AuthActions = AddUser;
export type QuestionsActions = AddQuestion | SetQuestions | RemoveQuestion | UpdateQuestion;
