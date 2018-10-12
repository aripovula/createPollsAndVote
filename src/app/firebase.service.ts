import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as firebase from 'firebase';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  database = firebase.database();

  constructor() { }

  saveNewPollToDB(poll, uid) {
    firebase.database().ref('polls/' + uid).set(poll);
  }

  deletePollFromDB(uid) {
    const adaRef = firebase.database().ref('polls/' + uid);
    adaRef.remove()
      .then(function () {
        console.log('Remove succeeded.');
      })
      .catch(function (error) {
        console.log('Remove failed: ' + error.message);
      });
  }

  saveNewQuestionToDB(question, uid) {
    firebase.database().ref('questions/' + uid).set(question);
  }

  deleteQuestionFromDB(uid) {
    const adaRef = firebase.database().ref('questions/' + uid);
    adaRef.remove()
      .then(function () {
        console.log('Remove succeeded.');
      })
      .catch(function (error) {
        console.log('Remove failed: ' + error.message);
      });
  }

}
