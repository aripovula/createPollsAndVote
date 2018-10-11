import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { NewPoll } from './../new_poll-module/models/new_poll-model';
import { NewQuestion } from './../new_poll-module/models/new_question-model';
import { AppState } from '../ngrx-store/app-reducers';
import * as questionsState from '../ngrx-store/questions-reducer';
import * as QuestionsActions from '../ngrx-store/questions-action';


@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {
  poll_id;
  poll_name;
  polls: Array<NewPoll>;
  questions: Array<NewQuestion>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    const that = this;

    firebase.database().ref('/questions/').orderByChild('sequenceNumber').once('value').then((snapshot) => {
      that.questions = new Array();
      snapshot.forEach((item) => {
        that.questions.push(item.val());
      });
    });

    that.store.dispatch(new QuestionsActions.SetQuestions(that.questions));
    that.poll_id = that.route.snapshot.paramMap.get('poll_id');
    console.log('questions = ', that.questions);

    that.store.select('polls').subscribe(
      data => {
        if (data.polls != null) {
          const one_poll = data.polls.filter(poll => (poll.id === this.poll_id));
          console.log('one_poll =', one_poll);
          if (one_poll != null && one_poll[0] != null) {
            this.poll_name = one_poll[0].name;
            console.log('poll_name = ', this.poll_name);
          }
        }
      });

    that.store.select('questions').subscribe(
      data => {
        if (data != null) {
          that.questions = data[0];
          console.log('data 2a = ', that.questions);
        }
      });

  }
}
