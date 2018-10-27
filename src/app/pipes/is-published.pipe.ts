import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isPublished'
})
export class IsPublishedPipe implements PipeTransform {

  transform(array: any, args: string): Array<string> {
    if (array == null || array.length === 0 ) { return array; }
    const newArray = [];
    for (const poll of array) {
      if (poll.isPublished) { newArray.push(poll); }
    }
    return newArray;
  }
}
