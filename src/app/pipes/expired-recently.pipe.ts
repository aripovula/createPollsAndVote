import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'expiredRecently'
})
export class ExpiredRecentlyPipe implements PipeTransform {

  transform(array: any, args: string): Array<string> {
    if (array == null || array.length === 0 ) { return array; }
    const newArray = [];
    for (let step = 0; step < array.length; step++) {
      const now = moment().valueOf() * 1;
      const _24hoursAgo = moment().subtract(1, 'days').valueOf() * 1;
      const expires = moment(array[step].expiresTimeStamp).valueOf() * 1;

      if (expires < now && _24hoursAgo < expires) { newArray.push(array[step]); }
    }
    return newArray;
  }

}
