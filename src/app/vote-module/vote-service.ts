import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { NewQuestion } from './../new_poll-module/models/new_question-model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

   // Observable string sources
   private loopVoteQuestionSource = new Subject<NewQuestion>();
   private nextVoteQuestionSource = new Subject<string>();

   // Observable string streams
   voteQuestionLoopStarted$ = this.loopVoteQuestionSource.asObservable();
   aVoteQuestionCompleted$ = this.nextVoteQuestionSource.asObservable();

   // Service message commands
   announceVoteQuestionStart(nextVoteQuestion: NewQuestion) {
     this.loopVoteQuestionSource.next(nextVoteQuestion);
   }

   confirmAVoteQuestionDone() {
     this.nextVoteQuestionSource.next();
   }
}
