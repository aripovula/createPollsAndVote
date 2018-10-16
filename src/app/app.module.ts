import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { StoreModule } from '@ngrx/store';

import { NewpollMModule } from './new_poll-module/newpoll-m.module';
import { VoteMModule } from './vote-module/vote-m.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './app-module-folders/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { PollsListComponent } from './app-module-folders/polls-list/polls-list.component';
import { appReducers } from './ngrx-store/app-reducers';
import { QuestionsFilterPipe } from './pipes/questions-filter.pipe';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { CountQuestionsPipe } from './pipes/count-questions.pipe';
import { ReversePollsOrderPipe } from './pipes/reverse-polls-order.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    PollsListComponent,
    QuestionsFilterPipe,
    QuestionsListComponent,
    CountQuestionsPipe,
    ReversePollsOrderPipe,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    VoteMModule,
    NewpollMModule,
    AppRoutingModule,
    MomentModule,
    StoreModule.forRoot(appReducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
