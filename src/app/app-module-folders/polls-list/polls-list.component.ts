import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
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
  ) {}

  ngOnInit() {
    this.firebaseService.fetchPollsAndSaveToStore();
    this.store.select('polls').subscribe(data => {this.polls = data.polls; });
  }

  onDeletePollClicked(uid) {
    this.pollIdToDelete = uid;
    const one_poll = this.polls.filter(poll => (poll.id === uid));
    this.pollNameToDelete = one_poll[0].name;
    this.isModalDisplayed = true;
  }

  onConfirm() {
    this.isModalDisplayed = false;
    this.store.select('questions').subscribe(data => { this.questions = data.questions; });

    return this.firebaseService.delete_Poll_And_Related_Questions_From_DB_and_Store(this.pollIdToDelete)
    .then(() => {
      for (const question of this.questions) {
        if (question.questionOfPollWithId === this.pollIdToDelete) {
          return this.firebaseService.deleteQuestionFromDBandDeleteFromStore(question.id);
        }
      }
    })
    ;
  }

  onCancel() {
    this.isModalDisplayed = false;
  }

}
