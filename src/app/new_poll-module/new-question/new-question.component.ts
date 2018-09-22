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

  // id, multipleChoice, q_text, questionsQnty, q_options
  model = new NewQuestion(1, 'false', null, 2, [ new NewOption('text', '', 'false'), new NewOption('text', '', 'false')]);

  constructor(private router: Router) {
  }

  ngOnInit() { }

  onQntyChange() {
    this.model.q_options = [];
    for (let step = 0; step < this.model.questionsQnty; step++) {
      this.model.q_options.push(new NewOption('text', '', 'false'));
    }
    console.log('this.model.q_options = ', this.model.q_options);
    console.log('qnty = ', this.model.questionsQnty);
    this.model.questionsQnty = this.model.q_options.length;
    (<HTMLInputElement>document.getElementById('questionsQnty')).value = '' + this.model.questionsQnty;
  }

  addOption() {
    this.model.q_options.push(new NewOption('text', '', 'false'));
    this.model.questionsQnty = this.model.q_options.length;
    (<HTMLInputElement>document.getElementById('questionsQnty')).value = '' + this.model.questionsQnty;
  }

  onSubmit() {
    console.log('in onSubmit');
    console.log(this.model);
    this.router.navigate(['/question']);
    // const newPoll = new NewPoll(1, '', 1);
  }
}
