import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page.component';
import { SharedModule } from '../shared/shared.module';
import { MatCheckboxModule, MatSlideToggleModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { routing } from './product-page.routing';
import { SingleProductModule } from '../single-product/single-product.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SingleProductModule,
    routing,
    ReactiveFormsModule
  ],
  declarations: [ProductPageComponent]
})
export class ProductPageModule { }
 