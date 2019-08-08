import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule, Routes } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
// import { AppRoutingModule } from '../app-routing.module';
import { PollsListComponent } from '../app-module-folders/polls-list/polls-list.component';
import { DisplayResultComponent } from './display-result/display-result.component';
import { LoopVoteQuestionsComponent } from './loop-vote-questions/loop-vote-questions.component';
import { DisplayVoteQuestionsComponent } from './display-vote-questions/display-vote-questions.component';
import { VoteOptionItemComponent } from './vote-option-item/vote-option-item.component';
import { Question4resultComponent } from './question4result/question4result.component';
import { MaskUsername2Pipe } from '../pipes/mask-username2.pipe';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';


const votepollRoutes: Routes = [
  { path: 'home', component: PollsListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(votepollRoutes),
  ],
  declarations: [
    DisplayResultComponent,
    LoopVoteQuestionsComponent,
    DisplayVoteQuestionsComponent,
    VoteOptionItemComponent,
    Question4resultComponent,
    MaskUsername2Pipe
  ]
})
export class VoteMModule { }
