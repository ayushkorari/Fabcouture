import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatePricePipe } from './calculate-price.pipe';

@NgModule({
  imports: [
    CommonModule
  ], 
  declarations: [CalculatePricePipe],
  exports:[CalculatePricePipe]
}) 
export class CalculatePriceModule { }
