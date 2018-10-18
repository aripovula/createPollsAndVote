import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { VoteComponent } from './vote-module/vote/vote.component';
import { NewQuestionComponent } from './new_poll-module/new-question/new-question.component';
import { QuestionsListComponent } from './app-module-folders/questions-list/questions-list.component';
import { NotFoundComponent } from './app-module-folders/not-found/not-found.component';
import { PollsListComponent } from './app-module-folders/polls-list/polls-list.component';
import { DisplayResultComponent } from './vote-module/display-result/display-result.component';


const appRoutes: Routes = [
  { path: 'home', component: PollsListComponent}, /// , canActivate: [AuthGuard]  },
  { path: 'viewquestions/:poll_id', component: QuestionsListComponent}, /// , canActivate: [AuthGuard]  },
  { path: 'editquestion/:question_id', component: NewQuestionComponent}, /// , canActivate: [AuthGuard]  },
  { path: 'vote1', component: VoteComponent}, /// , canActivate: [AuthGuard]  },
  { path: 'vote2', component: VoteComponent}, /// , canActivate: [AuthGuard]  },
  { path: 'result', component: DisplayResultComponent},

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
