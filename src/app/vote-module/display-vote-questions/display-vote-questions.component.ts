import { SelectedCLs } from './../vote-models/selected-cls-model';
import { NewQuestion } from './../../new_poll-module/models/new_question-model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { VoteService } from './../vote-service';

@Component({
  selector: 'app-display-vote-questions',
  templateUrl: './display-vote-questions.component.html',
  styleUrls: ['./display-vote-questions.component.css']
})
export class DisplayVoteQuestionsComponent implements OnDestroy {
  addedVoteChecklists: Array<SelectedCLs> = [{ id: 0, isQSelected: false }, { id: 1, isQSelected: false }];
  isSelectionValid = false;
  safeURL = [];
  safeURLimage = [];
  safeWebURL = [];
  WebURL = [];
  // inputHidden = [];
  vRadioButtonClicked = null;
  model: NewQuestion;
  votedModel = { pollId: null, questionID: null, type: null, CLs: null, Radio: null };
  subscription: Subscription;

  selectedCLs;

  constructor(
    private voteService: VoteService,
    private router: Router,
    private _sanitizer: DomSanitizer) {
    this.subscription = voteService.voteQuestionLoopStarted$.subscribe(
      nextQuestion => {
        this.isSelectionValid = false;
        this.vRadioButtonClicked = false;
        this.model = nextQuestion;
        console.log('loop display next question = ', this.model);
        this.prepareQuestion();
      }
    );
  }

  prepareQuestion() {
    for (const option of this.model.q_options) {
      if (option.type === 'imageurl') { this.onImageURLChanged(option.id); }
      if (option.type === 'videourl') { this.onVideoURLChanged(option.id); }
      if (option.type === 'weburl') { this.onWebURLChanged(option.id); }
    }
    if (this.model.multipleChoice === 'true') {
      this.addedVoteChecklists = [];
      for (let step = 0; step < this.model.q_options.length; step++) {
        this.addedVoteChecklists.push({ id: step, isQSelected: false });
      }
    }
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

  onQSelectedChange() {
    let count = 0;
    const type = this.model.multipleChoiceOption;
    const target = this.model.multipleChoiceOptionQnty;
    this.isSelectionValid = false;

    if (this.model.multipleChoice === 'true') {
      for (const addedVoteChecklist of this.addedVoteChecklists) {
        if (addedVoteChecklist.isQSelected) { count++; }
      }
      if (type === 'oneormore' && count > 0) { this.isSelectionValid = true; }
      if (type === 'exactly' && count === target) { this.isSelectionValid = true; }
      if (type === 'lessthan' && count < target) { this.isSelectionValid = true; }
      if (type === 'morethan' && count > target) { this.isSelectionValid = true; }
    }
    console.log(this.addedVoteChecklists);
    console.log(this.isSelectionValid);
  }

  onQSelectedChangeRadio(e) {
    this.isSelectionValid = false;
    if (this.model.multipleChoice === 'false') {
      this.isSelectionValid = true;
      // this.vRadioButtonClicked = parseInt(e, 10);
    }

    console.log('in onSelectedChangeRadio', e);
    console.log(this.vRadioButtonClicked);
  }

  confirm() {
    // this.firebaseService.saveNewQuestionToDB(this.model, uid);
    const type = this.model.multipleChoice === 'true' ? 1 : 0;
    const CLs = this.model.multipleChoice === 'true' ? this.addedVoteChecklists : [];
    this.votedModel = {
      pollId: this.model.questionOfPollWithId,
      questionID: this.model.id,
      type,
      CLs,
      Radio: this.vRadioButtonClicked
    };
    console.log(this.votedModel);

    this.voteService.confirmAVoteQuestionDone(this.votedModel);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
