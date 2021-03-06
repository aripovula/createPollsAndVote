import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UUID } from 'angular2-uuid';

import { VotesOnPoll } from './../../vote-module/vote-models/votes-on-poll-model';
import { FirebaseService } from './../../services/firebase.service';
import { NewPoll } from './../../new_poll-module/models/new_poll-model';
import { NewQuestion } from './../../new_poll-module/models/new_question-model';
import { AppState } from '../../ngrx-store/app-reducers';
import * as questionsState from '../../ngrx-store/questions-reducer';
import * as QuestionsActions from '../../ngrx-store/questions-action';


@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})

export class QuestionsListComponent implements OnInit {
  poll_id;
  poll_name;
  poll_author;
  polls: Array<NewPoll>;
  questions: Array<NewQuestion>;
  questionIdToDelete: string;
  questionNameToDelete: string;
  questionNameToCopyMove: string;
  isDeleteModalDisplayed = false;
  isCopyOrMoveClicked = false;
  copyOrMove;
  questionToCopyMove: NewQuestion;
  radioSelected = [];
  showAllQuestions = false;
  currentUserID: string;
  canEdit = false;
  isCanNotModalDisplayed = false;
  votesQntyOnPoll = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    this.firebaseService.checkLoginStatus();
    this.currentUserID = this.firebaseService.user_id;

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
      this.poll_author = one_poll[0].createdByUsername;
      this.canEdit = one_poll[0].createdBy === this.currentUserID;
      console.log('poll_name = ', this.poll_name);
    }
  }

  onEditQuestionClicked(uid) {
    this.firebaseService.fetchVotedQuestions(this.poll_id)
      .then((data: Array<VotesOnPoll>) => {
        this.votesQntyOnPoll = data.length;
        // if other users have voted prevent editing the question
        if (this.votesQntyOnPoll > 1 || this.votesQntyOnPoll === 1 &&
            data[0].aVote.voterID !== this.firebaseService.user_id) {
          this.isCanNotModalDisplayed = true;
        } else {
          this.router.navigate(['/editquestion', uid]);
        }
      });
  }

  onDeleteQuestionClicked(uid) {
    this.firebaseService.fetchVotedQuestions(this.poll_id)
      .then((data: Array<VotesOnPoll>) => {
        this.votesQntyOnPoll = data.length;
        if (this.votesQntyOnPoll > 0) {
          this.isCanNotModalDisplayed = true;
        } else {
          this.questionIdToDelete = uid;
          const one_question = this.questions.filter(question => (question.id === uid));
          this.questionNameToDelete = one_question[0].q_text;
          this.isDeleteModalDisplayed = true;
        }
      });
  }

  onDeleteConfirm() {
    this.isDeleteModalDisplayed = false;
    this.firebaseService.deleteQuestionFromDBandDeleteFromStore(this.questionIdToDelete)
      .then(() => this.firebaseService.hideLoadingSpinner());
  }

  onDeleteCancel() {
    this.isDeleteModalDisplayed = false;
  }

  onCanNotModalClose() {
    this.isCanNotModalDisplayed = false;
  }

  cancelShowAllQuestionsAndGoToAPoll(pollID) {
    this.poll_id = pollID;
    this.filterToFindNeededPoll(this.polls, pollID);
    this.showAllQuestions = false;
    this.router.navigate(['/viewquestions', pollID]);
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
    this.radioSelected = [];
  }

  onCopyMoveConfirm() {
    console.log('in onCopyMoveConfirm');
    console.log(this.radioSelected);
    for (let x = 0; x < this.polls.length; x++) {
      if (this.radioSelected[x] === x.toString()) {
        console.log('adding copy move poll = ', this.polls[x].name);
        let uid;
        if (this.copyOrMove === 'copy ') {
          uid = UUID.UUID();
          this.questionToCopyMove.id = uid;
          this.questionToCopyMove.questionOfPollWithId = this.polls[x].id;
          this.firebaseService.saveNewQuestionToDB(this.questionToCopyMove, uid);
        } else if (this.copyOrMove === 'move ') {
          uid = this.questionToCopyMove.id;
          this.questionToCopyMove.questionOfPollWithId = this.polls[x].id;
          this.firebaseService.updateQuestionsInDB(this.questionToCopyMove, uid);
        }
        this.router.navigate(['/home']);
      }
    }
  }
}
