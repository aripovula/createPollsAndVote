import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UUID } from 'angular2-uuid';

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
  questionIdToDelete: string;
  questionNameToDelete: string;
  questionNameToCopyMove: string;
  isDeleteModalDisplayed = false;
  isCopyOrMoveClicked = false;
  copyOrMove;
  questionToCopyMove: NewQuestion;
  addedChecklists = [];

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
    this.polls = polls;
    const one_poll = polls.filter(poll => (poll.id === this.poll_id));
    console.log('one_poll =', one_poll);
    if (one_poll != null && one_poll[0] != null) {
      this.poll_name = one_poll[0].name;
      console.log('poll_name = ', this.poll_name);
    }
  }

  onDeleteQuestionClicked(uid) {
    this.questionIdToDelete = uid;
    const one_question = this.questions.filter(question => (question.id === uid));
    this.questionNameToDelete = one_question[0].q_text;
    this.isDeleteModalDisplayed = true;
  }

  onDeleteConfirm() {
    this.isDeleteModalDisplayed = false;
    this.firebaseService.deleteQuestionFromDBandDeleteFromStore(this.questionIdToDelete);
  }

  onDeleteCancel() {
    this.isDeleteModalDisplayed = false;
  }

  onCopyQuestionClicked(uid) {
    this.copyOrMove = 'copy ';
    this.isCopyOrMoveClicked = true;
    const one_question = this.questions.filter(question => (question.id === uid));
    this.questionToCopyMove = one_question[0];
    this.questionNameToCopyMove = this.questionToCopyMove.q_text;
  }

  onMoveQuestionClicked(uid) {
    this.copyOrMove = 'move ';
    this.isCopyOrMoveClicked = true;
    const one_question = this.questions.filter(question => (question.id === uid));
    this.questionToCopyMove = one_question[0];
    this.questionNameToCopyMove = this.questionToCopyMove.q_text;
  }

  onCopyOrMoveCancelled() {
    this.isCopyOrMoveClicked = false;
    this.addedChecklists = [];
  }

  onCopyMoveConfirm() {
    console.log('in onCopyMoveConfirm');
    console.log(this.addedChecklists);
    for (let x = 0; x < this.polls.length; x++) {
      if (this.addedChecklists[x]) {
        if (this.copyOrMove === 'copy ') {
          const uid = UUID.UUID();
          this.questionToCopyMove.id = uid;
          this.questionToCopyMove.questionOfPollWithId = this.polls[x].id;
          this.firebaseService.saveNewQuestionToDB(this.questionToCopyMove, uid);
        } else {

        }
        this.router.navigate(['/home']);
      }
    }
  }
}
