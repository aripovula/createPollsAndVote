import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ImageUploadModule } from 'angular2-image-upload';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewQuestionComponent } from './new-question/new-question.component';
import { PreviewQuestionComponent } from './preview-question/preview-question.component';
import { OptionItemComponent } from './option-item/option-item.component';
import { LoopQuestionsComponent } from './loop-questions/loop-questions.component';
import { NewPollComponent } from './new-poll/new-poll.component';
import { NewpollRoutingModule } from './newpoll-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ImageUploadModule.forRoot(),
    NewpollRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NewPollComponent,
    NewQuestionComponent,
    LoopQuestionsComponent,
    OptionItemComponent,
    PreviewQuestionComponent
  ]
})
export class NewpollMModule { }
