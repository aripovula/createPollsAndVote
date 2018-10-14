import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { FirebaseService } from './../firebase.service';
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
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    this.poll_id = this.route.snapshot.paramMap.get('poll_id');

    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://edv8edmxxj.execute-api.us-east-2.amazonaws.com/development/find-your-match');
    // xhr.onreadystatechange = function(event) {
    //   console.log(event.target);
    // };
    // xhr.send();

    this.firebaseService.fetchQuestionsAndSaveToStore();
    this.store.select('questions').subscribe(data => { this.questions = data.questions; });
    this.getPollNameToDisplay();
  }

  getPollNameToDisplay() {
    this.store.select('polls').subscribe(
      data => {
        console.log('data 4 polls = ', data);
        // if polls data is already stored in NgRX Store get it from there.
        if (data.polls == null) {
          return this.firebaseService.fetchPollsAndSaveToStore()
            .then((thePolls) => {
              this.filterToFindNeededPoll(thePolls, this.poll_id);
            });
        } else {
          // if not - fetch it again, store in NgRX Store and get needed one
          this.filterToFindNeededPoll(data.polls, this.poll_id);
        }
      }
    );
  }

  filterToFindNeededPoll(polls, id) {
    const one_poll = polls.filter(poll => (poll.id === this.poll_id));
    console.log('one_poll =', one_poll);
    if (one_poll != null && one_poll[0] != null) {
      this.poll_name = one_poll[0].name;
      console.log('poll_name = ', this.poll_name);
    }
  }

  onDeleteQuestionClicked(id) {
    this.firebaseService.deleteQuestionFromDBandDeleteFromStore(id);
    // this.store.dispatch(new QuestionsActions.RemoveQuestion(id));
    // location.reload();
    // this.router.navigate(['/viewquestions', this.poll_id]);
  }
}
