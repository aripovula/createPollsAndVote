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

  saveNewQuestionToDB(question) {
    firebase.database().ref('questions/' + UUID.UUID()).set(question);
  }

}
