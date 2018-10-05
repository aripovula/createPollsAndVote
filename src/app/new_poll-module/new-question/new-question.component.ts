import { Component, ViewChild, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { NewPollService } from './../new-poll.service';
import { NewQuestion } from './../models/new_question-model';
import { NewOption } from './../models/new_option-model';
import { OptionItemComponent } from './../option-item/option-item.component';
import { PreviewQuestionComponent } from '../preview-question/preview-question.component';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})

export class NewQuestionComponent implements OnDestroy {

  @ViewChild('questionForm') myForm;

  @ViewChild(PreviewQuestionComponent)
  private previewComponent: PreviewQuestionComponent;

  model = new NewQuestion(1, 'false', null, 2, '1', [
    new NewOption(0, 'text', '', '', '', '', '', '', '', '', ''),
    new NewOption(1, 'text', '', '', '', '', '', '', '', '', '')
  ]);

  // because selected checklists are discarded when uses navigates away it is not part of the model
  addedChecklists = [{ id: 0, isSelected: false }, { id: 1, isSelected: false }];

  objects = [{ type: 'text', name: 'text' }, { type: 'imagelocal', name: 'image - local file' },
  { type: 'imageurl', name: 'image URL' }, { type: 'videourl', name: 'YouTube video URL' },
  { type: 'weburl', name: 'website URL' },
  { type: 'date', name: 'specific date' }, { type: 'dates', name: 'date range' },
  { type: 'time', name: 'specific time' }, { type: 'times', name: 'time range' }];

  sizes = [100, 150, 250];
  sizesW = [178, 266, 444];

  multipleChoiceOption = 'oneormore';
  multipleChoiceOptionQnty = 2;
  shouldCLsValidBeSetToFalse = false;

  localImage = [];
  uploaderHidden = [];
  safeURL = [];
  safeURLimage = [];
  safeWebURL = [];
  WebURL = [];
  validMessage = '';
  validMessageRadio = '';

  subscription: Subscription;

  constructor(
    private router: Router,
    private _sanitizer: DomSanitizer,
    private newPollService: NewPollService) {
      console.log('StartEd');
      this.subscription = newPollService.questionLoopStarted$.subscribe(
        nextQuestion => {
          this.myForm.resetForm();
          this.model = nextQuestion;
          console.log('got new Qu');
        }
    );
    }

  AfterViewInit() {

  }

  byId(item1: any, item2: any) {
    return item1.id === item2.id;
  }

  onQntyChange() {
    if (this.model.questionsQnty > 0) {
      if (this.model.q_options.length < this.model.questionsQnty) {
        const toAdd = this.model.questionsQnty - this.model.q_options.length;
        for (let step = 0; step < toAdd; step++) {
          this.addOption();
        }
      } else if (this.model.q_options.length > this.model.questionsQnty) {
        const qnty = this.model.questionsQnty;
        for (let step = this.model.q_options.length; step > qnty; step--) {
          const e = { id: this.model.q_options[step - 1].id };
          this.removeOption(e);
        }
      }
    }
  }

  removeOption(e) {
    // console.log('e=', e.id);
    const parsed_e_id = parseInt(e.id, 10);
    this.model.q_options = this.model.q_options.filter(option => !(option.id === parsed_e_id));
    this.addedChecklists = this.addedChecklists.filter(cl => !(cl.id === parsed_e_id));
    this.updateQnty();
  }

  // function above receives e from html file. Function below uses above function only for last one
  removeLastOption() {
    const e = { id: this.model.q_options[this.model.q_options.length - 1].id };
    this.removeOption(e);
  }

  addOption() {
    const oid = this.assignID();
    this.model.q_options.push(new NewOption(oid, 'text', '', '', '', '', '', '', '', '', ''));
    this.addedChecklists.push({ id: oid, isSelected: false });
    this.updateQnty();
  }

  assignID() {
    if (this.model.q_options.length > 0) { return this.model.q_options[this.model.q_options.length - 1].id + 1; }
    return;
  }

  updateQnty() {
    this.model.questionsQnty = this.model.q_options.length;
    (<HTMLInputElement>document.getElementById('questionsQnty')).value = '' + this.model.questionsQnty;

    // console.log('this.model.q_options = ', this.model.q_options);
    // console.log('qnty = ', this.model.questionsQnty);
  }

  deductMultiOption() {
    this.multipleChoiceOptionQnty--;
  }

  onMultiOptionQntyChange(e) {
    this.multipleChoiceOptionQnty = e;
    this.previewComponent.checklistsSelectedComplyWithMultiOptionsConditions();
  }

  addMultiOption() {
    this.multipleChoiceOptionQnty++;
    this.previewComponent.checklistsSelectedComplyWithMultiOptionsConditions();
  }

  onMultipleOptionChange(e) {
    console.log(e);
    this.shouldCLsValidBeSetToFalse = true;
    this.validMessageReset();
    for (let step = 0; step < this.addedChecklists.length; step++) {
      this.addedChecklists[step].isSelected = false;
    }
  }

  updateMultiOptionsQnty() {
    (<HTMLInputElement>document.getElementById('multipleChoiceOptionQnty')).value = '' + this.multipleChoiceOptionQnty;
  }

  onSelectTypeChange() {
    // console.log('in onSelectTypeChange');
    this.shouldCLsValidBeSetToFalse = true;
    this.validMessageReset();
    for (let step = 0; step < this.addedChecklists.length; step++) {
      this.addedChecklists[step].isSelected = false;
    }
    // console.log('this.addedChecklists = ', this.addedChecklists);
  }

  validMessageReset() {
    this.validMessageRadio = '';
    this.validMessage = '';
  }

  onUploadFinished(ind: number, file: any) {
    // console.log('onUploadFinished ind = ', ind);
    this.uploaderHidden[ind] = true;
    this.model.q_options[ind].imageFile = file.src;
  }

  // onRemoved(file: any) {
  //   console.log('onRemoved');
  //   console.log(file);
  // }

  // onUploadStateChanged(state: boolean) {
  //   console.log('onUploadStateChanged');
  //   console.log(state);
  // }

  onImageSizeChange(e) {
    this.model.imageSize = e;
    // console.log('size= ', this.model.imageSize);
  }

  onImageChangeRequest(e) {
    this.uploaderHidden[e] = false;
  }

  onImageURLChanged(ind) {
    this.safeURLimage[ind] = this._sanitizer.bypassSecurityTrustResourceUrl(this.model.q_options[ind].imageURL);
  }

  onWebURLChanged(ind) {
    if (this.model.q_options[ind].webURL.includes('https://') || this.model.q_options[ind].webURL.includes('http://')) {
      this.WebURL[ind] = this.model.q_options[ind].webURL;
    } else {
      this.WebURL[ind] = 'https://' + this.model.q_options[ind].webURL;
    }
    // this.safeWebURL[ind] = this._sanitizer.bypassSecurityTrustResourceUrl('http://' + this.model.q_options[ind].webURL);
  }

  onVideoURLChanged(ind) {
    this.model.q_options[ind].videoURL =
      this.model.q_options[ind].videoURL.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
    this.safeURL[ind] = this._sanitizer.bypassSecurityTrustResourceUrl(this.model.q_options[ind].videoURL);
  }

  onButtonIsValid(event) {
    console.log('button valid', event);
    if (event) {
      if (this.model.multipleChoice === 'true') {
        this.validMessage = ' \u2713 (uses @Output )';
        this.validMessageRadio = '';
      } else {
        this.validMessageRadio = ' \u2713 (uses @Output )';
        this.validMessage = '';
      }
    } else if (!event) {
      this.validMessage = '';
      this.validMessageRadio = '';
    }
  }

  onSubmit() {
    console.log('in onSubmit');
    console.log(this.model);
    this.router.navigate(['/question']);
    // const newPoll = new NewPoll(1, '', 1);
  }

  confirm() {
    this.newPollService.confirmAQuestionDone();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
