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
  }

  goToNextQuestion() {
    const nextQuestion = new NewQuestion(1, 'false', null, 2, '1', [
      new NewOption(0, 'text', '', '', '', '', '', '', '', '', ''),
      new NewOption(1, 'text', '', '', '', '', '', '', '', '', '')
    ]);
    this.newPollService.announceQuestionStart(nextQuestion);
  }

  ngOnDestroy() {
  }

}
