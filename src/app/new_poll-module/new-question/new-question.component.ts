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

  model = new NewQuestion(1, 'false', null, 2, [new NewOption(0, 'text', '', 1), new NewOption(1, 'text', '', 1)]);

  constructor(private router: Router) {}

  ngOnInit() { }

  onQntyChange() {
    this.model.q_options = [];
    for (let step = 0; step < this.model.questionsQnty; step++) {
      const oid = this.assignID();
      this.model.q_options.push(new NewOption(oid, 'text', '', 1));
    }
    this.updateQnty();
  }

  removeOption(e) {
    console.log('e=', e.id);
    const parsed_e_id = parseInt(e.id, 10);
    this.model.q_options = this.model.q_options.filter(option => !(option.id === parsed_e_id));
    this.updateQnty();
  }

  removeLastOption() {
    const newOptions = [];
    for (let step = 0; step < this.model.q_options.length - 1; step++) {
        newOptions.push(this.model.q_options[step]);
    }
    this.model.q_options = newOptions;
    this.updateQnty();
  }

  addOption() {
    const oid = this.assignID();
    this.model.q_options.push(new NewOption( oid, 'text', '', 1));
    this.updateQnty();
  }

  assignID() {
    return this.model.q_options[this.model.q_options.length - 1].id + 1;
  }

  updateQnty() {
    this.model.questionsQnty = this.model.q_options.length;
    (<HTMLInputElement>document.getElementById('questionsQnty')).value = '' + this.model.questionsQnty;

    console.log('this.model.q_options = ', this.model.q_options);
    console.log('qnty = ', this.model.questionsQnty);
  }

  onSubmit() {
    console.log('in onSubmit');
    console.log(this.model);
    this.router.navigate(['/question']);
    // const newPoll = new NewPoll(1, '', 1);
  }
}
