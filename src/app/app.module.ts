import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

import { NewpollMModule } from './new_poll-module/newpoll-m.module';
import { VoteMModule } from './vote-module/vote-m.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './app-module-folders/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { PollsListComponent } from './app-module-folders/polls-list/polls-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    PollsListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NewpollMModule,
    VoteMModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
