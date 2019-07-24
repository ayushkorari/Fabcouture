import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../shared/services/security.service';
import { SingleProductService } from '../service/single-product.service';
import { Product } from '../../../models/product.interface';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
  providers: [SingleProductService]
})
export class SingleProductComponent implements OnInit {

  security: SecurityService;
  subscribers: any[] = [];
  subscriberCount: number = 0;
  constructor(
    private router: Router,
    private securityService: SecurityService,
    private _singleProductService: SingleProductService
  ) {
  }
  @Input() product: any;
  @Input() wishlist: boolean = false;
  @Output() removeProduct = new EventEmitter<any>();

  ngOnInit() {
  }

  moveToWishlist() {
    this._singleProductService.addToWishlist(this.product._id)
      .subscribe();
  }
  isMobileDevice() {
    this._singleProductService.isMobileDevice();
  }
  addToCart() {
    if (this.wishlist) {
      this.removeFromWishlist(true)
    } else { 
      console.log(this.product)
      this._singleProductService.addToCart({ productId: this.product._id, quantity: 1,seller:this.product.seller })
        .subscribe(
          (response: any) => {
            if (response && this.wishlist) {
              this.removeProduct.emit();
            }
          }
        )
    }
  }
  removeFromWishlist(moveToCart = false) {
    this._singleProductService.removeFromWishlist({ productId: this.product._id , moveToCart:moveToCart,seller:this.product.seller})
      .subscribe(
        (response: any) => {
          if (response) {
            this.removeProduct.emit();
          }
        }
      )
  }
  ngOnDestroy() {
  }
}
