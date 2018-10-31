import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'isNotExpired'
})
export class IsNotExpiredPipe implements PipeTransform {

  transform(array: any, args: string): Array<string> {
    if (array == null || array.length === 0 ) { return array; }
    const newArray = [];
    for (let step = 0; step < array.length; step++) {
      const now = moment().valueOf() * 1;
      const expires = moment(array[step].expiresTimeStamp).valueOf() * 1;
      console.log(' now, expires, not experired = ', now, expires, expires > now);

      if (expires > now) { newArray.push(array[step]); }
    }
    return newArray;
  }
}
