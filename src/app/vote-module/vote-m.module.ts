import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { VoteComponent } from './vote/vote.component';
import { DisplayResultComponent } from './display-result/display-result.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [
    VoteComponent,
    DisplayResultComponent
  ]
})
export class VoteMModule { }
