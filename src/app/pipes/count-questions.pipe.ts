import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countQuestions'
})
export class CountQuestionsPipe implements PipeTransform {

  transform(questions: any, poll_id: string): any {

    if (questions === null ) {
      return questions;
    }
    let result = 0;
    for (const question of questions) {
      if (question.questionOfPollWithId === poll_id ) {
        result++;
      }
    }
    return result;
  }

}
