import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewQuestionComponent } from './new-question/new-question.component';
import { LoopQuestionsComponent } from './loop-questions/loop-questions.component';

const newpollRoutes: Routes = [
    { path: 'questions/:qnty', component: LoopQuestionsComponent}, /// , canActivate: [AuthGuard]  },
  { path: 'quest2', component: NewQuestionComponent }
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
