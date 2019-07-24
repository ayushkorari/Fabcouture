import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
    constructor() {
    }
  transform(value: any[], args?: string): any {
    if(!value||!args||!args.trim()) {
        return value;
    } 
    return value.filter(
        item => item.name.toLowerCase().indexOf(args.trim().toLowerCase())>=0
    )
  }

}