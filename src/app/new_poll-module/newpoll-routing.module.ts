import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewPollComponent } from './new-poll/new-poll.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { LoopQuestionsComponent } from './loop-questions/loop-questions.component';

const newpollRoutes: Routes = [
    { path: 'questions/:qnty/:poll_id', component: LoopQuestionsComponent}, /// , canActivate: [AuthGuard]  },
    { path: 'newpoll', component: NewPollComponent}, /// , canActivate: [AuthGuard]  },
    { path: 'question', component: NewQuestionComponent}, /// , canActivate: [AuthGuard]  },

];

@NgModule({
  imports: [
    RouterModule.forChild(newpollRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class NewpollRoutingModule { }
