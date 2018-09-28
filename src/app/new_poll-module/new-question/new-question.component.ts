import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

import { NewQuestion } from './../models/new_question-model';
import { NewOption } from './../models/new_option-model';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})

export class NewQuestionComponent implements OnInit {

  model = new NewQuestion(1, 'false', null, 2, '1', [
    new NewOption(0, 'text', '', '', '', '', '', '', '', ''),
    new NewOption(1, 'text', '', '', '', '', '', '', '', '')
  ]);

  // because selected checklists are discarded when uses navigates away it is not part of the model
  addedChecklists = [{id: 0, isSelected: false}, {id: 1, isSelected: false}];

  objects = [{type: 'text', name: 'text'}, {type: 'imagelocal', name: 'image - local file'},
  {type: 'imageurl', name: 'image URL'}, {type: 'videourl', name: 'YouTube video URL'},
  {type: 'date', name: 'specific date'}, {type: 'dates', name: 'date range'},
  {type: 'time', name: 'specific time'}, {type: 'times', name: 'time range'}];

  sizes = [ 100, 150, 250 ];
  sizesW = [ 178, 266, 444 ];

  radioButtonClicked = false;

  multipleChoiceOption = 'oneormore';
  multipleChoiceOptionQnty = 2;
  selectedCLs = 0;
  CLsValid = false;
  localImage = [];
  uploaderHidden = [];
  safeURL = [];
  safeURLimage = [];

  constructor(
    private router: Router,
    private _sanitizer: DomSanitizer) {}



  ngOnInit() { }

  byId(item1: any, item2: any) {
    return item1.id === item2.id;
  }

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
    this.addedChecklists = this.addedChecklists.filter(cl => !(cl.id === parsed_e_id));
    this.updateQnty();
  }

  // function above receives e from html file. Function below uses above function only for last one
  removeLastOption() {
    const e = {id: this.model.q_options[this.model.q_options.length - 1].id};
    this.removeOption(e);
  }

  addOption() {
    const oid = this.assignID();
    this.model.q_options.push(new NewOption( oid, 'text', '', '', '', '', '', '', '', ''));
    this.addedChecklists.push({id: oid, isSelected: false});
    this.updateQnty();
  }

  assignID() {
    if (this.model.q_options.length > 0) {return this.model.q_options[this.model.q_options.length - 1].id + 1; }
    return;
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
    // console.log('this.addedChecklists Before = ', this.addedChecklists);
    // for (let step = 0; step < this.addedChecklists.length; step++) {
    //   this.addedChecklists[step].isSelected = false;
    //   console.log('step.toString === e -> ', this.addedChecklists[step].id, parsed_e, this.addedChecklists[step].id === parsed_e);

    //   if (this.addedChecklists[step].id === parsed_e) { toTrue = step; }
    // }
    // this.addedChecklists[toTrue].isSelected = true;
    this.selectedCLs = 0;
    for (let step = 0; step < this.addedChecklists.length; step++) {
      if (this.addedChecklists[step].isSelected === true) { this.selectedCLs++; }
    }
    this.checklistsSelectedComplyWithMultiOptionsConditions();
    console.log('selected = ' + this.selectedCLs);

    console.log('this.addedChecklists After = ', this.addedChecklists);
  }

  onSelectedChangeRadio(e) {
    console.log('in onSelectedChangeRadio', e);
    this.CLsValid = true;
  }

  onMultipleOptionChange(e) {
    console.log(e);
    this.CLsValid = false;
    for (let step = 0; step < this.addedChecklists.length; step++) {
      this.addedChecklists[step].isSelected = false;
    }
  }

  deductMultiOption() {
    this.multipleChoiceOptionQnty--;
    this.checklistsSelectedComplyWithMultiOptionsConditions();
  }

  onMultiOptionQntyChange(e) {
    this.multipleChoiceOptionQnty = e;
    this.checklistsSelectedComplyWithMultiOptionsConditions();
  }

  addMultiOption() {
    this.multipleChoiceOptionQnty++;
    this.checklistsSelectedComplyWithMultiOptionsConditions();
  }

  checklistsSelectedComplyWithMultiOptionsConditions() {
    this.CLsValid = false;
    if (this.multipleChoiceOption === 'oneormore') {
      if (this.selectedCLs > 0) { this.CLsValid = true; }
    } else if (this.multipleChoiceOption === 'exactly') {
      if (this.selectedCLs === this.multipleChoiceOptionQnty) { this.CLsValid = true; }
    } else if (this.multipleChoiceOption === 'lessthan' && this.selectedCLs > 0) {
      if (this.selectedCLs < this.multipleChoiceOptionQnty) { this.CLsValid = true; }
    } else if (this.multipleChoiceOption === 'morethan') {
      if (this.selectedCLs > this.multipleChoiceOptionQnty) { this.CLsValid = true; }
    }
  }

  updateMultiOptionsQnty() {
    (<HTMLInputElement>document.getElementById('multipleChoiceOptionQnty')).value = '' + this.multipleChoiceOptionQnty;
  }

  onSelectTypeChange() {
    console.log('in onSelectTypeChange');
    this.CLsValid = false;
    for (let step = 0; step < this.addedChecklists.length; step++) {
      this.addedChecklists[step].isSelected = false;
    }
    console.log('this.addedChecklists = ', this.addedChecklists);
  }

  onUploadFinished(ind: number, file: any) {
    console.log('onUploadFinished ind = ', ind);
    this.uploaderHidden[ind] = true;
    this.model.q_options[ind].imageFile = file.src;
  }

  onRemoved(file: any) {
    console.log('onRemoved');
    console.log(file);
  }

  onUploadStateChanged(state: boolean) {
    console.log('onUploadStateChanged');
    console.log(state);
  }

  onImageSizeChange(e) {
    this.model.imageSize = e;
    console.log('size= ', this.model.imageSize);
  }

  onImageChangeRequest(e) {
    this.uploaderHidden[e] = false;
  }

  onImageURLChanged(ind) {
    this.safeURLimage[ind] = this._sanitizer.bypassSecurityTrustResourceUrl(this.model.q_options[ind].imageURL);
  }

  onVideoURLChanged(ind) {
    this.model.q_options[ind].videoURL =
      this.model.q_options[ind].videoURL.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
    this.safeURL[ind] = this._sanitizer.bypassSecurityTrustResourceUrl(this.model.q_options[ind].videoURL);
  }

  onSubmit() {
    console.log('in onSubmit');
    console.log(this.model);
    this.router.navigate(['/question']);
    // const newPoll = new NewPoll(1, '', 1);
  }
}
