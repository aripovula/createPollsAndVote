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

  // because selected checklists are discarded when uses navigates away it is not part of the model
  selectedCLs = [{id: 0, isSelected: false}, {id: 1, isSelected: false}];

  multipleChoiceOption = 'oneormore';
  multipleChoiceOptionQnty = 2;

  constructor(private router: Router) {}

  ngOnInit() { }

  onQntyChange() {
    if (this.model.q_options.length < this.model.questionsQnty) {
      const toAdd = this.model.questionsQnty - this.model.q_options.length;
      for (let step = 0; step < toAdd ; step++) {
        this.addOption();
      }
      // const newOptions = [];
      // for (let step = 0; step < this.model.q_options.length ; step++) {
      //   newOptions.push(new NewOption(this.model.q_options[step].id, this.model.q_options[step].type,
      //     this.model.q_options[step].text, this.model.q_options[step].imageSize));
      // }
      // const newModel = new NewQuestion(this.model.id, this.model.multipleChoice,
      //   this.model.q_text, this.model.questionsQnty, newOptions);
      // this.model = newModel;

    } else if (this.model.q_options.length > this.model.questionsQnty) {
      const qnty = this.model.questionsQnty;
      for (let step = this.model.q_options.length; step > qnty; step--) {
        const e = {id: this.model.q_options[step - 1].id};
        this.removeOption(e);
      }
    }
  }

  removeOption(e) {
    console.log('e=', e.id);
    const parsed_e_id = parseInt(e.id, 10);
    this.model.q_options = this.model.q_options.filter(option => !(option.id === parsed_e_id));
    this.selectedCLs = this.selectedCLs.filter(cl => !(cl.id === parsed_e_id));
    this.updateQnty();
  }

  // function above receives e from html file. Function below uses above function only for last one
  removeLastOption() {
    const e = {id: this.model.q_options[this.model.q_options.length - 1].id};
    this.removeOption(e);
  }

  addOption() {
    const oid = this.assignID();
    this.model.q_options.push(new NewOption( oid, 'text', '', 1));
    this.selectedCLs.push({id: oid, isSelected: false});
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

  onSelectedChange(e) {
    // const toTrue = -1;
    // const parsed_e = parseInt(e, 10);
    // console.log('isSelected = ', e.update.value);
    console.log('isSelected = ', e);
    // console.log('this.selectedCLs Before = ', this.selectedCLs);
    // for (let step = 0; step < this.selectedCLs.length; step++) {
    //   this.selectedCLs[step].isSelected = false;
    //   console.log('step.toString === e -> ', this.selectedCLs[step].id, parsed_e, this.selectedCLs[step].id === parsed_e);

    //   if (this.selectedCLs[step].id === parsed_e) { toTrue = step; }
    // }
    // this.selectedCLs[toTrue].isSelected = true;
    console.log('this.selectedCLs After = ', this.selectedCLs);
  }

  onMultipleOptionChange(e) {
    console.log(e);
  }

  deductMultiOption() {
    this.multipleChoiceOptionQnty--;
  }

  onMultiOptionQntyChange(e) {
    this.multipleChoiceOptionQnty = e;
  }

  addMultiOption() {
    this.multipleChoiceOptionQnty++;
  }

  updateMultiOptionsQnty() {
    (<HTMLInputElement>document.getElementById('multipleChoiceOptionQnty')).value = '' + this.multipleChoiceOptionQnty;
  }

  onSelectTypeChange() {
    console.log('in onSelectTypeChange');
    for (let step = 0; step < this.selectedCLs.length; step++) {
      this.selectedCLs[step].isSelected = false;
    }
    console.log('this.selectedCLs = ', this.selectedCLs);
  }

  onSubmit() {
    console.log('in onSubmit');
    console.log(this.model);
    this.router.navigate(['/question']);
    // const newPoll = new NewPoll(1, '', 1);
  }
}
