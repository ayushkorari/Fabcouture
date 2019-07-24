import { NgModule } from '@angular/core';
import { routing } from './wishlist.routing';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { SharedModule } from '../../shared/shared.module';
import { SingleProductModule } from '../../single-product/single-product.module';
@NgModule({
    imports: 
    [
        CommonModule,routing,SharedModule,SingleProductModule
    ],
    declarations:[WishlistComponent],
    exports: []
  })
  export class WishlistModule {
   
  }
  