import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import * as firebase from 'firebase';
import { UUID } from 'angular2-uuid';
import { Store } from '@ngrx/store';

import { NewPoll } from './new_poll-module/models/new_poll-model';
import { NewQuestion } from './new_poll-module/models/new_question-model';
import { AppState } from './ngrx-store/app-reducers';
import * as authState from './ngrx-store/auth-reducer';
import * as AuthActions from './ngrx-store/auth-action';
import * as pollsState from './ngrx-store/polls-reducer';
import * as PollsActions from './ngrx-store/polls-action';
import * as questionsState from './ngrx-store/questions-reducer';
import * as QuestionsActions from './ngrx-store/questions-action';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  database = firebase.database();
  polls: Array<NewPoll>;
  questions: Array<NewQuestion>;

  constructor(private store: Store<AppState>) { }

  // STRICT RULE - ALL DEALINGS WITH FIREBASE SHOULD BE A FUNCTION IN FIREBASE_SERVICE AND
  // ALL FUNCTIONS DEALING WITH FIREBASE SHOULD DIRECTLY / IMMEDIATELY UPDATE NGRX STORE

  fetchPollsAndSaveToStore() {
    const polls = new Array();
    return new Promise((resolve, reject) => {
      firebase.database().ref('/polls/').orderByChild('createdTimeStamp').once('value').then((snapshot) => {
        snapshot.forEach((item) => {
          polls.push(item.val());
        });
        this.store.dispatch(new PollsActions.SetPolls(polls));
        resolve(polls);
      });
    });
  }

  fetchQuestionsAndSaveToStore() {
    const questions = new Array();
    return new Promise((resolve, reject) => {
      firebase.database().ref('/questions/').orderByChild('sequenceNumber').once('value')
        .then((snapshot) => {
          snapshot.forEach((item) => {
            questions.push(item.val());
          });
          // console.log('questions fireb q-list = ', questions);
          // console.log('questions len fireb q-list = ', questions.length);
          return questions;
        })
        .then((data) => {
          // console.log('questions 2 fireb q-list = ', data);
          // console.log('questions 2 len fireb q-list = ', data.length);
          this.store.dispatch(new QuestionsActions.SetQuestions(data));
          resolve(data);
        });
    });
  }

  saveNewPollToDB(poll, uid) {
    return firebase.database().ref('polls/' + uid).set(poll)
    .then(() => {
      this.store.dispatch(new PollsActions.AddPoll(poll));
    });
  }

  delete_Poll_And_Related_Questions_From_DB_and_Store(uid) {
    const that = this;
    return new Promise((resolve, reject) => {
    firebase.database().ref('polls/' + uid).remove()
      .then(function () {
        console.log('Remove succeeded.');
        that.store.dispatch(new PollsActions.RemovePoll(uid));
        resolve();
      })
      .catch(function (error) {
        console.log('Remove failed: ' + error.message);
        reject();
      });
    });
  }

  saveNewQuestionToDB(question, uid) {
    firebase.database().ref('questions/' + uid).set(question)
    .then(() => {
      this.store.dispatch(new QuestionsActions.AddQuestion(question));
    });
  }

  deleteQuestionFromDBandDeleteFromStore(uid) {
    const that = this;
    const adaRef = firebase.database().ref('questions/' + uid);
    adaRef.remove()
      .then(function () {
        console.log('Remove succeeded.');
        that.store.dispatch(new QuestionsActions.RemoveQuestion(uid));
      })
      .catch(function (error) {
        console.log('Remove failed: ' + error.message);
      });
  }

}
