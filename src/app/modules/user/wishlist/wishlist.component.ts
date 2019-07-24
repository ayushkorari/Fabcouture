import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { WishlistService } from './service/wishlist.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  providers: [WishlistService]
})
export class WishlistComponent implements OnInit {

  products: any[] = [];
  constructor(
    private router: Router,
    private _wishlistService: WishlistService
  ) {

  }
  ngOnInit() {
    this.getWishlist();
  }
  getWishlist() {
    this._wishlistService.getWishlistProducts()
      .subscribe(
        (response: any) => {
          this.products = response.data;
        }
      )
  }
  isMobileDevice() {
    return this._wishlistService.isMobileDevice();
  };
  removeProduct(index) {
    this.products.splice(index,1);
  }
  ngOnDestroy() {
  }
}
