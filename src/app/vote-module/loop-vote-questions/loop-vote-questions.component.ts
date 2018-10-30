import { VotesOnPoll } from './../vote-models/votes-on-poll-model';
import { NewPoll } from './../../new_poll-module/models/new_poll-model';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';

import { FirebaseService } from './../../services/firebase.service';
import { NewOption } from '../../new_poll-module/models/new_option-model';
import { NewQuestion } from './../../new_poll-module/models/new_question-model';
import { VoteService } from './../vote-service';
import { AppState } from '../../ngrx-store/app-reducers';
import * as pollsState from '../../ngrx-store/polls-reducer';
import * as PollsActions from '../../ngrx-store/polls-action';

// DONE: you already voted - here are the results, if voted halfway - show current stage
// DONE: do not show expired polls
// DONE: identify my polls and offer to edit or un-publish - no edit/delete/un-publish for others
// DONE: added by is shown incorrectly
// if at least one vote of OTHER user exists on the poll do not allow to change poll
// DONE: visibility of poll by username or domain name
// DONE: sign in with a new username
// checklistsSelectedComplyWithMultiOptionsConditions double check error when changing multi option counter
// double check error when options counter reaches zero
// DONE: double check validations

@Component({
  selector: 'app-loop-vote-questions',
  templateUrl: './loop-vote-questions.component.html',
  styleUrls: ['./loop-vote-questions.component.css'],
  providers: [VoteService]
})
export class LoopVoteQuestionsComponent implements OnInit {

  q_number = 0;
  q_qnty;
  poll_id;
  poll_name;
  questions: Array<NewQuestion>;
  questionsOfPoll: Array<NewQuestion>;
  votedQuestionModel;
  isAlreadyVoted = false;

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private voteService: VoteService) {
    voteService.aVoteQuestionCompleted$.subscribe(
      (votedModel) => {
        console.log('votedModel in loop = ', votedModel);
        this.pushToVotedQuestionModel(votedModel);
        this.q_number++;
        console.log('q_number, qnty = ', this.q_number, this.q_qnty);
        if (this.q_number >= this.q_qnty) {
          this.firebaseService.saveVotedQuestionToDB(this.votedQuestionModel, this.votedQuestionModel.aVote.pollID);
          this.router.navigate(['/result', this.poll_id]);
        } else {
          console.log('before sending to goToNextQuestion');
          this.goToNextQuestion();
        }
      });
  }

  ngOnInit() {
    this.poll_id = this.route.snapshot.paramMap.get('poll_id');
    this.votedQuestionModel = {
      aVote: {
        pollID: this.poll_id,
        voterID: this.firebaseService.user_id,
        voterName: this.firebaseService.user_name,
        voteNameDisclosureType: null,
        questions: []
      }
    };
    console.log('votedQuestionModel = ', this.votedQuestionModel);

    let polls;
    this.store.select('polls').subscribe(data => { polls = data.polls; });
    console.log('polls = ', polls);

    if (polls == null) {
      return this.firebaseService.fetchPollsAndSaveToStore()
        .then((data: Array<NewPoll>) => {
          polls = data;
          this.getPollName(polls);
        });
    } else {
      this.getPollName(polls);
    }

  }

  pushToVotedQuestionModel(votedModel) {
    this.votedQuestionModel.aVote.questions.push({
      questionID: votedModel.questionID,
      questionsQnty: votedModel.questionsQnty,
      type: votedModel.type,
      CLs: votedModel.CLs,
      Radio: votedModel.Radio
    });
    console.log('votedQuestionModel = ', this.votedQuestionModel);
    this.firebaseService.saveVotedQuestionToDB(this.votedQuestionModel, this.votedQuestionModel.aVote.pollID);
  }

  getPollName(polls) {
    for (const poll of polls) {
      if (poll.id === this.poll_id) {
        this.poll_name = poll.name;
        this.votedQuestionModel.aVote.voteNameDisclosureType = poll.nameDiscloseOption;
      }
    }
    this.goToNextQuestion();
  }

  goToNextQuestion() {
    console.log('poll_id = ', this.poll_id);
    if (this.questions == null) {
      return this.firebaseService.fetchQuestionsAndSaveToStore()
        .then((data: Array<NewQuestion>) => {
          this.questions = data;
          console.log('data = ', data);
          this.sortQuestions();
          this.announceStart();
        });
    } else if (this.questions != null && this.questionsOfPoll == null) {
      this.sortQuestions();
      this.announceStart();
    } else {
      this.announceStart();
    }
  }

  sortQuestions() {
    this.questionsOfPoll = [];
    for (const question of this.questions) {
      if (question.questionOfPollWithId === this.poll_id) {
        this.questionsOfPoll.push(question);
      }
    }
    this.q_qnty = this.questionsOfPoll.length;
  }

  announceStart() {
    if (this.q_number === 0) {
      return this.firebaseService.fetchVotedQuestionsByPollIDandUserID(this.poll_id)
        .then((data: Array<VotesOnPoll>) => {
          const alreadyVotedQuestionsByUser = (data != null && data[0] != null) ? data[0].aVote.questions.length : 0;
          if (alreadyVotedQuestionsByUser > 0) {
            this.isAlreadyVoted = true;
            console.log('this.isAlreadyVoted = ', this.isAlreadyVoted);
            if (alreadyVotedQuestionsByUser >= this.q_qnty) {
              this.router.navigate(['/result', this.poll_id, 1]);
              console.log('all questions voted, sent to results');
            } else {
              // add already voted questions info back to current model
              for (const votedModel of data[0].aVote.questions) {
                console.log('votedModel of data= ', votedModel);
                if (votedModel.CLs == null) { votedModel.CLs = []; }
                this.votedQuestionModel.aVote.questions.push({
                  questionID: votedModel.questionID,
                  questionsQnty: votedModel.questionsQnty,
                  type: votedModel.type,
                  CLs: votedModel.CLs,
                  Radio: votedModel.Radio
                });
              }
              // change current questions number to first unresponded one
              this.q_number = alreadyVotedQuestionsByUser;
              console.log('this.q_number changed to ', this.q_number);
              this.announceStart2();            }
          } else {
            this.announceStart2();          }
        });
    } else {
      this.announceStart2();
    }
  }

  announceStart2() {
    console.log('q_number = ', this.q_number);
    const nextQuestion = this.questionsOfPoll[this.q_number];
    console.log('nextQuestion = ', nextQuestion);
    this.voteService.announceVoteQuestionStart(nextQuestion);
  }

  onModalClose() {
    this.isAlreadyVoted = false;
  }
}
