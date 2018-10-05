import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NewQuestion } from './models/new_question-model';

@Injectable({
  providedIn: 'root'
})
export class NewPollService {

   // Observable string sources
   private loopQuestionSource = new Subject<NewQuestion>();
   private nextQuestionSource = new Subject<string>();

   // Observable string streams
   questionLoopStarted$ = this.loopQuestionSource.asObservable();
   aQuestionCompleted$ = this.nextQuestionSource.asObservable();

   // Service message commands
   announceQuestionStart(nextQuestion: NewQuestion) {
     this.loopQuestionSource.next(nextQuestion);
   }

   confirmAQuestionDone() {
     this.nextQuestionSource.next();
   }
}
