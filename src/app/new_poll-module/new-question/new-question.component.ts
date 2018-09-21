import { NewOption } from './../models/new_option-model';
import { NewQuestion } from './../models/new_question-model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {

  modelOpt = new NewOption('time', '04:00 a.m.');

  // id, multipleChoice, q_text, questionsQnty, q_options
  model = new NewQuestion(1, 'false', null, null, [this.modelOpt, this.modelOpt]);

  constructor(private router: Router) {
  }

  ngOnInit() {}

  onQntyChange() {
    console.log('qnty = ', this.model.questionsQnty);
  }
  onSubmit() {
    console.log('in onSubmit');
    console.log(this.model);
    this.router.navigate(['/question']);
    // const newPoll = new NewPoll(1, '', 1);
  }
}
