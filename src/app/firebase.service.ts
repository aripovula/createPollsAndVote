import { AVote } from './vote-module/vote-models/a-vote-model';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import * as firebase from 'firebase';
import { UUID } from 'angular2-uuid';
import { Store } from '@ngrx/store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
  isSpinnerShown = false;
  user_id = 'def';

  constructor(private store: Store<AppState>, private spinnerService: Ng4LoadingSpinnerService) { }

  // STRICT RULE - ALL DEALINGS WITH FIREBASE SHOULD BE A FUNCTION IN FIREBASE_SERVICE AND
  // ALL FUNCTIONS DEALING WITH FIREBASE SHOULD DIRECTLY / IMMEDIATELY UPDATE NGRX STORE

  fetchPollsAndSaveToStore() {
    const polls = new Array();
    this.showLoadingSpinner();
    const that = this;
    return new Promise((resolve, reject) => {
      firebase.database().ref('/polls/').orderByChild('createdTimeStamp').once('value').then((snapshot) => {
        snapshot.forEach((item) => {
          polls.push(item.val());
        });
        that.store.dispatch(new PollsActions.SetPolls(polls));
        that.hideLoadingSpinner();
        resolve(polls);
      });
    });
  }

  saveNewPollToDB(poll, uid) {
    this.showLoadingSpinner();
    return firebase.database().ref('polls/' + uid).set(poll)
      .then(() => {
        this.store.dispatch(new PollsActions.AddPoll(poll));
        this.hideLoadingSpinner();
      });
  }

  updatePollInDB(poll, uid) {
    this.showLoadingSpinner();
    return firebase.database().ref('polls/' + uid).update(poll)
      .then(() => {
        this.store.dispatch(new PollsActions.UpdatePoll(poll, uid));
        this.hideLoadingSpinner();
      });
  }

  delete_Poll_And_Related_Questions_From_DB_and_Store(uid) {
    const that = this;
    this.showLoadingSpinner();
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
          that.hideLoadingSpinner();
        });
    });
  }

  fetchQuestionsAndSaveToStore() {
    const questions = new Array();
    const that = this;
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
          that.store.dispatch(new QuestionsActions.SetQuestions(data));
          that.hideLoadingSpinner();
          resolve(data);
        });
    });
  }

  saveNewQuestionToDB(question, uid) {
    this.showLoadingSpinner();
    firebase.database().ref('questions/' + uid).set(question)
      .then(() => {
        this.store.dispatch(new QuestionsActions.AddQuestion(question));
        this.hideLoadingSpinner();
      });
  }

  updateQuestionsInDB(question, uid) {
    this.showLoadingSpinner();
    firebase.database().ref('questions/' + uid).update(question)
      .then(() => {
        this.store.dispatch(new QuestionsActions.UpdateQuestion(question, uid));
        this.hideLoadingSpinner();
      });
  }

  deleteQuestionFromDBandDeleteFromStore(uid) {
    this.showLoadingSpinner();
    const that = this;
    return new Promise((resolve, reject) => {
      const adaRef = firebase.database().ref('questions/' + uid);
      adaRef.remove()
        .then(function () {
          console.log('Remove succeeded.');
          that.store.dispatch(new QuestionsActions.RemoveQuestion(uid));
          resolve();
        })
        .catch(function (error) {
          console.log('Remove failed: ' + error.message);
          that.hideLoadingSpinner();
          reject();
        });
    });
  }

  fetchVotedQuestions(poll_id) {
    this.showLoadingSpinner();
    const votedQuestions = [];
    const allVotes: Array<AVote> = [];
    const that = this;
    return new Promise((resolve, reject) => {
      firebase.database().ref('voted_questions').once('value')
        .then((snapshot) => {
          snapshot.forEach((item) => {
            console.log('item.val() = ', item.val());
            votedQuestions.push(item.val());
          });
          console.log('questions fireb q-list = ', votedQuestions);
          console.log('questions len fireb q-list = ', votedQuestions.length);
          return votedQuestions;
        })
        .then((data) => {
          // https://stackoverflow.com/questions/126100/how-to-efficiently-count-the-number-of-keys-properties-of-an-object-in-javascrip

          const data2 = data[0];
          const votesQnty = Object.keys(data2).length;
          console.log('data in 2nd next =', data);
          console.log('votesQnty in 2nd next =', votesQnty);
          for (let x = 0; x < votesQnty; x++) {
            // https://stackoverflow.com/questions/983267/how-to-access-the-first-property-of-an-object-in-javascript
            const VoteItem = data2[Object.keys(data2)[x]];
            console.log('ano item = ', VoteItem);

            allVotes.push(VoteItem);
          }
          console.log('allVotes fireb q-list = ', allVotes);
          console.log('allVotes len fireb q-list = ', allVotes.length);

          that.hideLoadingSpinner();
          resolve(allVotes);
        });
    });
  }

  saveVotedQuestionToDB(question, poll_id) {
    // this.user_id = 'a' + Math.floor(Math.random() * (100 - 1 + 1) + 1);
    firebase.database().ref('voted_questions/' + poll_id + '/' + this.user_id).set(question)
      .then(() => {
        // this.store.dispatch(new QuestionsActions.AddQuestion(question));
      });
  }

  // own function is used in all above functions to make easier to change 3rd party spinner.
  showLoadingSpinner() {
    if (this.isSpinnerShown === false) { this.spinnerService.show(); }
  }

  hideLoadingSpinner() {
    this.spinnerService.hide();
    this.isSpinnerShown = false;
  }
}
