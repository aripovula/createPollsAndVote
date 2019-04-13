import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewPollComponent } from './new-poll/new-poll.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { LoopQuestionsComponent } from './loop-questions/loop-questions.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';

const newpollRoutes: Routes = [
  { path: 'editpoll/:poll_id', component: NewPollComponent, canActivate: [AuthGuard]  },
  { path: 'questions/:qnty/:poll_id', component: LoopQuestionsComponent, canActivate: [AuthGuard]  },
  { path: 'addquestion/:qnty/:poll_id/:seqnumber', component: LoopQuestionsComponent, canActivate: [AuthGuard]  },
  { path: 'newpoll', component: NewPollComponent, canActivate: [AuthGuard]  },
  // { path: 'question', component: NewQuestionComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [
    RouterModule.forChild(newpollRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class NewpollRoutingModule { }
