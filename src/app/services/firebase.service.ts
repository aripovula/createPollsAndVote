import { VotesOnPoll } from './../vote-module/vote-models/votes-on-poll-model';
import { AVote } from './../vote-module/vote-models/a-vote-model';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { Store } from '@ngrx/store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { NewPoll } from './../new_poll-module/models/new_poll-model';
import { NewQuestion } from './../new_poll-module/models/new_question-model';
import { AppState } from './../ngrx-store/app-reducers';
import * as authState from './../ngrx-store/auth-reducer';
import * as AuthActions from './../ngrx-store/auth-action';
import * as pollsState from './../ngrx-store/polls-reducer';
import * as PollsActions from './../ngrx-store/polls-action';
import * as questionsState from './../ngrx-store/questions-reducer';
import * as QuestionsActions from './../ngrx-store/questions-action';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  database = firebase.database();
  polls: Array<NewPoll>;
  questions: Array<NewQuestion>;
  isSpinnerShown = false;
  user_id: string;
  user_name: string;

  constructor(
    private store: Store<AppState>,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router
  ) { }

  // STRICT RULE - ALL DEALINGS WITH FIREBASE SHOULD BE A FUNCTION IN FIREBASE_SERVICE AND
  // ALL FUNCTIONS DEALING WITH FIREBASE SHOULD DIRECTLY / IMMEDIATELY UPDATE NGRX STORE

  fetchPollsAndSaveToStore() {
    const polls = new Array();
    this.showLoadingSpinner();
    const that = this;
    if (this.user_id == null) { this.getUserIDandName(); }
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
    if (this.user_id == null) { this.getUserIDandName(); }
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
    const allVotes: Array<VotesOnPoll> = [];
    const that = this;
    if (this.user_id == null) { this.getUserIDandName(); }
    return new Promise((resolve, reject) => {
      firebase.database().ref('voted_questions/' + poll_id).once('value')
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

          // const data2 = data[0];
          // const votesQnty = Object.keys(data2).length;
          // console.log('data in 2nd next =', data);
          // console.log('votesQnty in 2nd next =', votesQnty);
          // for (let x = 0; x < votesQnty; x++) {
          //   // https://stackoverflow.com/questions/983267/how-to-access-the-first-property-of-an-object-in-javascript
          //   const VoteItem = data2[Object.keys(data2)[x]];
          //   console.log('ano item = ', VoteItem);

          //   allVotes.push(VoteItem);
          // }
          // console.log('allVotes fireb q-list = ', allVotes);
          // console.log('allVotes len fireb q-list = ', allVotes.length);

          that.hideLoadingSpinner();
          resolve(data);
        });
    });
  }

  saveVotedQuestionToDB(question, poll_id) {
    if (this.user_id == null) { this.getUserIDandName(); }
    console.log('question = ', question);
    console.log('poll_id = ', poll_id);
    console.log('user_id = ', this.user_id);
    firebase.database().ref('voted_questions/' + poll_id + '/' + this.user_id).set(question)
      .then(() => {
        // this.store.dispatch(new QuestionsActions.AddQuestion(question));
      });
  }

  getUserIDandName() {
    this.store.select('auth').subscribe(data => {
      this.user_id = data.userId;
      this.user_name = data.userName;
    });
  }

  //  ****
  // AUTHENTICATION
  //  ****

  checkLoginStatus() {
    const currentUser = firebase.auth().currentUser;
    this.user_id = currentUser.uid;
    this.user_name = currentUser.email;
    console.log('firebase.auth().currentUser = ', currentUser);
    return currentUser;
  }

  signUpAUser(email: string, password: string) {
    const that = this;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log('Sign up success', response);
        this.user_id = response.user.uid;
        this.user_name = response.user.email;
        that.store.dispatch(new AuthActions.SetUser({uid: response.user.uid, username: response.user.email}));
        this.router.navigate(['/home']);
      })
      .catch(
        error => {
          console.log('error, sending to signIn', error);
        }
      );
  }

  signInAUser(email: string, password: string) {
    const that = this;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log('Log in success', response);
        this.user_id = response.user.uid;
        this.user_name = response.user.email;
        that.store.dispatch(new AuthActions.SetUser({uid: response.user.uid, username: response.user.email}));
        this.router.navigate(['/home']);
      })
      .catch(
        error => {
          console.log(error);
        this.signUpAUser(email, password);
      }
      );
  }

  signOut() {
    const that = this;
    firebase.auth().signOut()
    .then(() => {
      that.store.dispatch(new AuthActions.RemoveUser());
    });
  }

  getToken() {
    return firebase.auth().currentUser.getIdToken();
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
