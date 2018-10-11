import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questionsFilter'
})
export class QuestionsFilterPipe implements PipeTransform {

  transform(questions: any, poll_id: string): any {
    console.log('questions = ', questions);
    console.log('questions.len = ', questions.length);
    console.log(questions.questionOfPollWithId);
    // console.log(questions.questions[1]);

    console.log('poll_id = ', poll_id);

    if (questions === null ) {
      return questions;
    }
    const result = [];
    console.log('result.length = ', result.length);
    console.log('questions[0].length = ', questions.length);

    for (const question of questions) {
      console.log(question.questionOfPollWithId, poll_id, question.questionOfPollWithId === poll_id);

      if (question.questionOfPollWithId === poll_id ) {
        result.push(question);
      }
    }
    return result;
  }

}
