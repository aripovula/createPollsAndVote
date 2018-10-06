import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  database = firebase.database();

  constructor() { }

  saveQuestionToDB(question) {
    firebase.database().ref('questions/' + 1).set(question);
  }

}
