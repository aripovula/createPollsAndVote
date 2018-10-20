import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

import { DisplayResultComponent } from './display-result/display-result.component';
import { LoopVoteQuestionsComponent } from './loop-vote-questions/loop-vote-questions.component';
import { DisplayVoteQuestionsComponent } from './display-vote-questions/display-vote-questions.component';
import { VoteOptionItemComponent } from './vote-option-item/vote-option-item.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule
  ],
  declarations: [
    DisplayResultComponent,
    LoopVoteQuestionsComponent,
    DisplayVoteQuestionsComponent,
    VoteOptionItemComponent
  ]
})
export class VoteMModule { }
