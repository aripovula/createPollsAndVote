import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { VoteComponent } from './vote-m/vote/vote.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PollsListComponent } from './polls-list/polls-list.component';
import { NewPollComponent } from './newpoll-m/new-poll/new-poll.component';


const appRoutes: Routes = [
  { path: 'home', component: PollsListComponent}, /// , canActivate: [AuthGuard]  },
  { path: 'newpoll', component: NewPollComponent}, /// , canActivate: [AuthGuard]  },
  { path: 'vote1', component: VoteComponent}, /// , canActivate: [AuthGuard]  },
  { path: 'vote2', component: VoteComponent}, /// , canActivate: [AuthGuard]  },
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
