import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductComponent } from './component/single-product.component';
import { SharedModule } from '../shared/shared.module';
import { CalculatePriceModule } from '../../pipes/calculate-price/calculate-price.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CalculatePriceModule
  ],
  declarations: [
    SingleProductComponent
  ],
  exports : [
    SingleProductComponent
  ]
})
export class SingleProductModule { }
