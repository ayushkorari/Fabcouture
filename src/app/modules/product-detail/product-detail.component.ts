import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { ProductDetailService } from './service/product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductDetailService],
  animations: [
    trigger('filters', [

      transition('void => *', [
        state('in', style({ transform: 'translateX(0)' })),
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('modal', [

      transition('void => *', [
        state('in', style({ transform: 'translateY(0)' })),
        style({ transform: 'translateY(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})

export class ProductDetailComponent implements OnInit {

  similarProducts = [];
  addressForm: FormGroup;
  quantityForm: FormGroup;
  private searchPin = new Subject<string>();
  pincodeSpinner = false;
  showImageMenu = false;
  productDetailSub;
  addToCartSub;
  addToWishlistSub;
  pincodeAvailabilty = "";
  subscribeRoute: any;
  selectedImage: number = 0;
  _id: string;
  product: any;
  priceType = {
    PER_PIECE:'Per Piece',
    PER_METER:'Per Meter'
  }
  decimalQuantity = false;
  recommendedProducts = [];
  optionVariants = [];
  pincodeSub: any;

  constructor(
    private route: ActivatedRoute,
    private _productDetailService: ProductDetailService
  ) {
    this.quantityForm = this._productDetailService.getQuantityForm();
    this.addressForm = this._productDetailService.getAddressForm();
  }
  ngOnInit() {
    this._id = this.route.snapshot.params.id;
    this.getProductDetail();
  }

  getProductDetail() {
    this.productDetailSub = this._productDetailService.getProductDetail(this._id)
      .subscribe(
        (response: any) => {
          if (response && response.data.data[0]) {
            this.product = {...response.data.data[0]};
            this.allowDecimalQuanity();
            this.similarProducts = response.data.data[0].metafields.upSelling;
            this.recommendedProducts = response.data.data[0].metafields.crossSelling;
            this.optionVariants = response.data.data[0].optionVariant;
            console.log(this.similarProducts,this.recommendedProducts,this.optionVariants);
          }
        } 
      )
  }
  checkDelivery() {
    this.pincodeSpinner = true;
    if( this.pincodeSub) {
      this.pincodeSub.unsubscribe();
    }
    this.pincodeSub = this._productDetailService.checkDelivery(this.addressForm.controls.pincode.value).subscribe(
      (data:any) => {
        if(!data.data.cod) {
          this._productDetailService.showAlert('Product is unavailable at this location')
        } 
        else if(data.data.cod==='COD') {
          this._productDetailService.showAlert('Product is available at this location')
        } else {
          this._productDetailService.showAlert('Product is available at this location but cod is not allowed')
        }
        this.pincodeSpinner = false;
      },err => {
        this.pincodeSpinner = false;
      }
    )
  }
  allowDecimalQuanity() {
    this.decimalQuantity = this.product.metafields && this.product.metafields.decimalQuantity;
  }

  changeQuantity(add = true) {
    const counter = this.decimalQuantity ? 0.1 : 1;
    let quantity = this.quantityForm.value.quantity || 0;
    quantity = +quantity;
    console.log(quantity, counter);
    if (add) {
      quantity = (quantity * 10 + counter * 10) / 10;
    } else {
      quantity = Math.max(((quantity * 10 - counter * 10) / 10), 0);
    }
    console.log(quantity);
    this.quantityForm.controls.quantity.setValue(quantity)
  }

  addToCart() {
    if(this.quantityForm.valid)
    this._productDetailService.addToCart({ productId: this._id, quantity: +this.quantityForm.value.quantity,seller:this.product.seller._id })
    .subscribe(
      (response:any) => {
        console.log(response);
      }
    )
  }
  addToWishlist() {
    this._productDetailService.addToWishlist(this._id)
    .subscribe();
  }
  checkPin() {
    if (this.addressForm.controls.pincode.valid && this.addressForm.controls.pincode.value.length == 6) {

      this.searchPin.next(this.addressForm.controls.pincode.value)

    }
  }
  isMobileDevice() {
    return this._productDetailService.isMobileDevice();
  }

  ngOnDestroy() {
    if (this.productDetailSub) {
      this.productDetailSub.unsubscribe();
    }
  }
  raiseQuery() {
    let data = { 
      "products": [
        {
          "productId": this.product._id,
          "quantity": 1,
          "sellerId": this.product.seller._id
        }
      ]
    }
    this._productDetailService.raiseQuery(data).subscribe();
  }
}
