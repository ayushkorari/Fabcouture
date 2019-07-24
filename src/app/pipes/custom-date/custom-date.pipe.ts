import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    constructor(private datePipe: DatePipe) {
    }
  transform(value: any, args?: any): any {
    return value?this.datePipe.transform(value,'dd/MM/yyyy'):'-'
  }

}