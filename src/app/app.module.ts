import { NewpollMModule } from './newpoll-m/newpoll-m.module';
import { VoteMModule } from './vote-m/vote-m.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { VoteComponent } from './vote-m/vote/vote.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { PollsListComponent } from './polls-list/polls-list.component';
import { NewPollComponent } from './newpoll-m/new-poll/new-poll.component';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    NotFoundComponent,
    PollsListComponent,
    NewPollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
