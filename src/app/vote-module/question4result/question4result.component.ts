import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import { FirebaseService } from './../../firebase.service';
import { NewQuestion } from './../../new_poll-module/models/new_question-model';
import { NewOption } from './../../new_poll-module/models/new_option-model';
import { VoteOptionItemComponent } from './../vote-option-item/vote-option-item.component';
import { AppState } from '../../ngrx-store/app-reducers';
import * as questionsState from '../../ngrx-store/questions-reducer';
import * as QuestionsActions from '../../ngrx-store/questions-action';


@Component({
  selector: 'app-question4result',
  templateUrl: './question4result.component.html',
  styleUrls: ['./question4result.component.css']
})
export class Question4resultComponent implements OnInit {

  @Input() question_id: string;
  safeURL = [];
  safeURLimage = [];
  safeWebURL = [];
  WebURL = [];
  model: NewQuestion = null;

  constructor(
    private _sanitizer: DomSanitizer,
    private store: Store<AppState>,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    if (this.question_id != null) {
      this.store.select('questions').subscribe(
        data => {
          if (data != null && data.questions != null) {this.getQuestionWithPassedId(data.questions); }
        }
      );

      if (this.model == null) {
        return this.firebaseService.fetchQuestionsAndSaveToStore()
          .then((data: Array<NewQuestion>) => {
            console.log('4 data from FireB=', data);
            if (data != null) {
              this.getQuestionWithPassedId(data);
            }
          });
      }
    }
  }

  getQuestionWithPassedId(data: Array<NewQuestion>) {
    console.log('data before = ', data);
    const data2 = data.filter(({ id }) => id === this.question_id);
    console.log('data = ', data);
    console.log('data2 = ', data2);
    this.model = data2[0];
    console.log('model = ', this.model);

    for (const option of this.model.q_options) {
      if (option.type === 'imageurl') { this.onImageURLChanged(option.id); }
      if (option.type === 'videourl') { this.onVideoURLChanged(option.id); }
      if (option.type === 'weburl') { this.onWebURLChanged(option.id); }
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
  }

  onVideoURLChanged(ind) {
    this.model.q_options[ind].videoURL =
      this.model.q_options[ind].videoURL.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
    this.safeURL[ind] = this._sanitizer.bypassSecurityTrustResourceUrl(this.model.q_options[ind].videoURL);
  }

}
