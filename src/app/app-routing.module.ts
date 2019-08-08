import { NewPollComponent } from './new_poll-module/new-poll/new-poll.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './app-module-folders/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { NewQuestionComponent } from './new_poll-module/new-question/new-question.component';
import { QuestionsListComponent } from './app-module-folders/questions-list/questions-list.component';
import { NotFoundComponent } from './app-module-folders/not-found/not-found.component';
import { PollsListComponent } from './app-module-folders/polls-list/polls-list.component';
import { DisplayResultComponent } from './vote-module/display-result/display-result.component';
import { LoopVoteQuestionsComponent } from './vote-module/loop-vote-questions/loop-vote-questions.component';
import { LogoutComponent } from './app-module-folders/logout/logout.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: PollsListComponent, canActivate: [AuthGuard] },
  // { path: 'newpoll', component: NewPollComponent, canActivate: [AuthGuard] },
  { path: 'viewquestions/:poll_id', component: QuestionsListComponent, canActivate: [AuthGuard] },
  { path: 'editquestion/:question_id', component: NewQuestionComponent, canActivate: [AuthGuard] },
  { path: 'vote/:poll_id', component: LoopVoteQuestionsComponent, canActivate: [AuthGuard] },
  { path: 'result/:poll_id', component: DisplayResultComponent, canActivate: [AuthGuard] },
  { path: 'result/:poll_id/:isAlreadyVoted', component: DisplayResultComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
