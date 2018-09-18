import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoteComponent } from './vote/vote.component';
import { NotFoundComponent } from './not-found/not-found.component';


const appRoutes: Routes = [
  { path: 'vote', component: VoteComponent}, /// , canActivate: [AuthGuard]  },
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
