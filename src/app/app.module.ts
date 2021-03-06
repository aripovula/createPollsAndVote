import { FirebaseService } from './services/firebase.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { StoreModule } from '@ngrx/store';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewpollMModule } from './new_poll-module/newpoll-m.module';
import { VoteMModule } from './vote-module/vote-m.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './app-module-folders/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { PollsListComponent } from './app-module-folders/polls-list/polls-list.component';
import { appReducers } from './ngrx-store/app-reducers';
import { QuestionsFilterPipe } from './pipes/questions-filter.pipe';
import { QuestionsListComponent } from './app-module-folders/questions-list/questions-list.component';
import { CountQuestionsPipe } from './pipes/count-questions.pipe';
import { ReversePollsOrderPipe } from './pipes/reverse-polls-order.pipe';
import { GetPollNameForQuestionPipe } from './pipes/get-poll-name-for-question.pipe';
import { LoginComponent } from './app-module-folders/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LogoutComponent } from './app-module-folders/logout/logout.component';
import { MaskUsernamePipe } from './pipes/mask-username.pipe';
import { IsNotExpiredPipe } from './pipes/is-not-expired.pipe';
import { ExpiredRecentlyPipe } from './pipes/expired-recently.pipe';
import { IsPublishedPipe } from './pipes/is-published.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    PollsListComponent,
    QuestionsListComponent,
    QuestionsFilterPipe,
    CountQuestionsPipe,
    ReversePollsOrderPipe,
    GetPollNameForQuestionPipe,
    MaskUsernamePipe,
    LoginComponent,
    LogoutComponent,
    IsNotExpiredPipe,
    ExpiredRecentlyPipe,
    IsPublishedPipe,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    VoteMModule,
    NewpollMModule,
    AppRoutingModule,
    MomentModule,
    StoreModule.forRoot(appReducers),
    Ng4LoadingSpinnerModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [FirebaseService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
