import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { NewpollMModule } from './newpoll-module/newpoll-m.module';
import { VoteMModule } from './vote-module/vote-m.module';
import { AppComponent } from './app.component';
import { VoteComponent } from './vote-module/vote/vote.component';
import { NotFoundComponent } from './app-module-folders/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { PollsListComponent } from './app-module-folders/polls-list/polls-list.component';
import { NewPollComponent } from './newpoll-module/new-poll/new-poll.component';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    NotFoundComponent,
    PollsListComponent,
    NewPollComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
