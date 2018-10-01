import { OptionItemComponent } from './option-item/option-item.component';
import { LoopQuestionsComponent } from './loop-questions/loop-questions.component';
import { NewPollComponent } from './new-poll/new-poll.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ImageUploadModule } from 'angular2-image-upload';

import { NewQuestionComponent } from './new-question/new-question.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ImageUploadModule.forRoot(),
  ],
  declarations: [
    NewPollComponent,
    NewQuestionComponent,
    LoopQuestionsComponent,
    OptionItemComponent,
  ]
})
export class NewpollMModule { }
