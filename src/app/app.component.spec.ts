import { FirebaseService } from './services/firebase.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { StoreModule } from '@ngrx/store';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { NewpollMModule } from './new_poll-module/newpoll-m.module';
import { VoteMModule } from './vote-module/vote-m.module';
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
import { AppComponent } from './app.component';

import { TestBed, async } from '@angular/core/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        RouterTestingModule
      ],
      providers: [FirebaseService, AuthGuardService],
      // bootstrap: [AppComponent],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app for creating polls and voting'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app for creating polls and voting');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('YouPoll');
  }));
});
