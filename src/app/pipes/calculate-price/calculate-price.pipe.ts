import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../models/product.interface';

@Pipe({
  name: 'calculate'
})
export class CalculatePricePipe implements PipeTransform {

  transform(product: Product, args?: any): any {
    let allPrices = product.price.map(data=>data.adminPrice);
    if(product.price[0].userType==='USER') {
      if(Math.max(...allPrices)===Math.min(...allPrices)) {
        return Math.max(...allPrices);
      } else {
        return Math.min(...allPrices)+' - '+Math.max(...allPrices)
      }
    }
    return Math.max(...allPrices);
  }

}
