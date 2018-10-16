import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
// import { Router } from '@angular/router';

import { NewPoll } from '../../new_poll-module/models/new_poll-model';
import { NewQuestion } from './../../new_poll-module/models/new_question-model';
import { FirebaseService } from './../../firebase.service';
import { AppState } from '../../ngrx-store/app-reducers';
// import * as authState from '../../ngrx-store/auth-reducer';
// import * as AuthActions from './../../ngrx-store/auth-action';
import * as pollsState from '../../ngrx-store/polls-reducer';
import * as PollsActions from '../../ngrx-store/polls-action';


@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.css']
})
export class PollsListComponent implements OnInit {
  polls: Array<NewPoll>;
  questions: Array<NewQuestion>;
  isModalDisplayed = false;
  pollIdToDelete: string;
  pollNameToDelete: string;

  constructor(
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
    // private router: Router
  ) { }

  ngOnInit() {
    this.firebaseService.fetchPollsAndSaveToStore();
    this.store.select('polls').subscribe(data => { this.polls = data.polls; console.log('polls in p-list = ', this.polls);
    });
    this.store.select('questions').subscribe(data => {
      this.questions = data.questions;
      if (this.questions == null) { this.firebaseService.fetchQuestionsAndSaveToStore(); }
     });
  }

  onDeletePollClicked(uid) {
    this.pollIdToDelete = uid;
    const one_poll = this.polls.filter(poll => (poll.id === uid));
    this.pollNameToDelete = one_poll[0].name;
    this.isModalDisplayed = true;
  }

  onDeleteConfirm() {
    this.isModalDisplayed = false;

    return this.firebaseService.delete_Poll_And_Related_Questions_From_DB_and_Store(this.pollIdToDelete)
      .then(() => {
        console.log('this.questions in Delete = ', this.questions);

        for (const question of this.questions) {
          if (question.questionOfPollWithId === this.pollIdToDelete) {
            return this.firebaseService.deleteQuestionFromDBandDeleteFromStore(question.id);
          }
        }
      })
      ;
  }

  onDeleteCancel() {
    this.isModalDisplayed = false;
  }

  onClonePollClicked(uid) {
    const idOfNewPoll = UUID.UUID();
    const arrayWithOnePoll = this.polls.filter(poll => (poll.id === uid));
    const onePoll: NewPoll = arrayWithOnePoll[0];
    let pollToClone: NewPoll;

    // according to StackOv. thread below JSON.parse(JSON.stringify(..) is one of best ways to DEEP clone an object
    // from https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
    pollToClone = JSON.parse(JSON.stringify(onePoll));
    pollToClone.id = idOfNewPoll;
    pollToClone.createdTimeStamp = moment().valueOf();
    if (pollToClone.expiresTimeStamp < pollToClone.createdTimeStamp) {pollToClone.expiresTimeStamp = pollToClone.createdTimeStamp; }
    if (!pollToClone.name.includes(' ( cloned - edit as you need )')) {
      pollToClone.name = pollToClone.name + ' ( cloned - edit as you need )';
    }
    this.firebaseService.saveNewPollToDB(pollToClone, idOfNewPoll);

    for (const question of this.questions) {
      if (question.questionOfPollWithId === uid) {
        const idOfNewQuestion = UUID.UUID();
        const questionToClone = JSON.parse(JSON.stringify(question));
        questionToClone.id = idOfNewQuestion;
        questionToClone.questionOfPollWithId = pollToClone.id;
        this.firebaseService.saveNewQuestionToDB(questionToClone, idOfNewQuestion);

        // question.q_text = question.q_text + ' - Copy';
        // console.log(question.q_text);
        // console.log(questionToClone.q_text);
        // question.q_options[0].text = question.q_options[0].text + ' - Copy';
        // console.log(question.q_options[0].text);
        // console.log(questionToClone.q_options[0].text);
      }
    }
  }
}
