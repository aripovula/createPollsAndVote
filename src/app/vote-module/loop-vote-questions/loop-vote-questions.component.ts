import { NewPoll } from './../../new_poll-module/models/new_poll-model';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';

import { FirebaseService } from './../../firebase.service';
import { NewOption } from '../../new_poll-module/models/new_option-model';
import { NewQuestion } from './../../new_poll-module/models/new_question-model';
import { VoteService } from './../vote-service';
import { AppState } from '../../ngrx-store/app-reducers';
import * as pollsState from '../../ngrx-store/polls-reducer';
import * as PollsActions from '../../ngrx-store/polls-action';


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

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private voteService: VoteService) {
    voteService.aVoteQuestionCompleted$.subscribe(
      () => {
        this.q_number++;
        console.log('q_number, qnty = ', this.q_number, this.q_qnty);
        if (this.q_number >= this.q_qnty) {
          this.router.navigate(['/result']);
        } else {
          console.log('before sending to goToNextQuestion');
          this.goToNextQuestion();
        }
      });
  }

  ngOnInit() {
    this.poll_id = this.route.snapshot.paramMap.get('poll_id');
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

  getPollName(polls) {
    for (const poll of polls) { if (poll.id === this.poll_id) { this.poll_name = poll.name; }}
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
    console.log('q_number = ', this.q_number);
    const nextQuestion = this.questionsOfPoll[this.q_number];
    console.log('nextQuestion = ', nextQuestion);
    this.voteService.announceVoteQuestionStart(nextQuestion);
  }

}
