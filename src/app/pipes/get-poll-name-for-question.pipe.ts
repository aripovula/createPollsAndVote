import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getPollNameForQuestion'
})
export class GetPollNameForQuestionPipe implements PipeTransform {

  transform(polls: any, args: any): any {
    console.log('polls = ', polls);
    console.log('args = ', args);

    let name;
    for (const poll of polls) {
      if (poll.id === args) {
        name = poll.name;
      }
    }
    return name;
  }

}
