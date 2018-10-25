import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskUsername2'
})
export class MaskUsername2Pipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log('value =', value);
    let result;
    if (value != null) {
      const start = value.search('@');
      const end = value.search('.com');
      const subst = value.substring(start, end);
      result = value.replace(subst, ' ... ');
    } else {
      result = value;
    }
    return result;
  }

}
