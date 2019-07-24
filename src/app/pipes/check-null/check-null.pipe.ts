import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'checkNull'
})
export class CheckNullPipe implements PipeTransform {
    constructor(private datePipe: DatePipe) {
    }
  transform(value: any, args?: any): any {
    return (value!==undefined&&value!==null)?value:'-'
  }

}