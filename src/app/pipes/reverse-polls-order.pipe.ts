import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reversePollsOrder'
})
export class ReversePollsOrderPipe implements PipeTransform {

  transform(polls: any, order?: any): any {
    return polls.reverse();
  }
}
