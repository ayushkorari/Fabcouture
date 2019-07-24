import { NgModule, ModuleWithProviders } from '@angular/core';
import { routing } from './product-detail.routing';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { SharedModule } from '../shared/shared.module';
import { SingleProductModule } from '../single-product/single-product.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
@NgModule({
    imports: 
    [
        CommonModule,routing,SharedModule,SingleProductModule,ReactiveFormsModule,MatIconModule
    ],
    declarations:[ProductDetailComponent],
    exports: []
  })
  export class ProductDetailModule {
   
  }
  