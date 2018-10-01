import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { VoteComponent } from './vote-module/vote/vote.component';
import { NotFoundComponent } from './app-module-folders/not-found/not-found.component';
import { PollsListComponent } from './app-module-folders/polls-list/polls-list.component';
import { NewPollComponent } from './new_poll-module/new-poll/new-poll.component';
import { NewQuestionComponent } from './new_poll-module/new-question/new-question.component';
import { LoopQuestionsComponent } from './new_poll-module/loop-questions/loop-questions.component';


const appRoutes: Routes = [
  { path: 'home', component: PollsListComponent}, /// , canActivate: [AuthGuard]  },
  { path: 'newpoll', component: NewPollComponent}, /// , canActivate: [AuthGuard]  },
  { path: 'vote1', component: VoteComponent}, /// , canActivate: [AuthGuard]  },
  { path: 'vote2', component: VoteComponent}, /// , canActivate: [AuthGuard]  },
  { path: 'question', component: NewQuestionComponent}, /// , canActivate: [AuthGuard]  },
  { path: 'questions', component: LoopQuestionsComponent}, /// , canActivate: [AuthGuard]  },
    // { path: 'signout', component: SigninComponent},
    { path: 'not-found', component: NotFoundComponent},
    { path: '**', redirectTo: '/not-found' }
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
      ],
      exports: [RouterModule]
})

export class AppRoutingModule {

}
