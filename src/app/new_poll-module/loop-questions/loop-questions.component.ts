import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { NewPollService } from './../new-poll.service';
import { NewPoll } from './../models/new_poll-model';
import { NewQuestion } from '../models/new_question-model';
import { NewOption } from '../models/new_option-model';


@Component({
  selector: 'app-loop-questions',
  templateUrl: './loop-questions.component.html',
  styleUrls: ['./loop-questions.component.css'],
  providers: [NewPollService]
})
export class LoopQuestionsComponent implements OnInit, OnDestroy {
  q_number = 1;
  q_qnty;
  poll_id;

  constructor(private route: ActivatedRoute, private router: Router, private newPollService: NewPollService) {
    newPollService.aQuestionCompleted$.subscribe(
      () => {
        this.q_number++;
        if (this.q_number > this.q_qnty) { this.router.navigate(['/home']); }
        this.goToNextQuestion();
      });
  }

  ngOnInit() {
    this.q_qnty = this.route.snapshot.paramMap.get('qnty');
    this.poll_id = this.route.snapshot.paramMap.get('poll_id');
    console.log('poll_id = ', this.poll_id);
  }

  goToNextQuestion() {
    const nextQuestion = new NewQuestion(null, this.q_number, this.poll_id, 'false', null, 2, '1', [
      new NewOption(0, 'text', '', '', '', '', '', '', '', '', ''),
      new NewOption(1, 'text', '', '', '', '', '', '', '', '', '')
    ]);
    this.newPollService.announceQuestionStart(nextQuestion);
  }

  ngOnDestroy() {
  }

}
