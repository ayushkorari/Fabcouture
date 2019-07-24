import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CartService } from './service/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService],
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
export class CartComponent implements OnInit {

  subscribers: any[] = [];
  subscriberCount: number = 0;
  validCoupons: any[] = [];
  invalidCoupons: any[] = [];
  selectedCoupon: any;
  selectedCouponIndex: number;
  couponDiscount: number = 0;
  products: any[] = [];
  totalAmount: number = 0;
  totalDiscount: number = 0;
  productQuantities: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  someProductsUnavailable: boolean = false;
  showCouponMenu: boolean = false;
  couponSpinner: boolean = false;
  firstTimeCouponLoading: boolean = true;
  noCouponFound: string = '';
  delieveryCharge: number = 100;
  addressForm: FormGroup;
  pincodeAvailabilty: string = '';
  pincodeSpinner: boolean = false;
  calculatedDelieveryCharge: number = 0;
  private searchPin = new Subject<string>();
  decimalQuantity: any;
  constructor(
    private router: Router,
    private _cartService: CartService
  ) {
    this.addressForm = new FormGroup({
      pincode: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)])
    });
  }

  ngOnInit() {
    this.getCartProducts();
  }

  getCartProducts() {
    this._cartService.getCartProducts()
      .subscribe(
        (response: any) => {
          console.log(response);
          this.products = response.data;
        }
      )
  }
  changeQuantity(index, add = true) {
    const counter = this.decimalQuantity ? 0.1 : 1;
    let quantity = this.products[index].quantity || 0;
    quantity = +quantity;
    console.log(quantity, counter);
    if (add) {
      quantity = (quantity * 10 + counter * 10) / 10;
    } else {
      quantity = Math.max(((quantity * 10 - counter * 10) / 10), 0);
    }
    console.log(quantity);
    this.products[index].quantity = quantity;
    this.updateCartProducts(this.products[index])
  }

  //  distanceByPincode = this.searchPin.de(300).distinctUntilChanged() 
  //  .switchMap(data =>
  //  {

  //    if(data&&data.length==6)
  //    {
  //        this.pincodeSpinner = true;
  //        this.subscribers[this.subscriberCount++] =  this.userService.calculateDistance(data).subscribe(data=>
  //          {
  //              this.calculate(data)

  //          }
  //         ,err =>
  //         {
  //                alert("Invalid Pincode")
  //                this.pincodeSpinner = false;
  //         })
  //    }
  //    return data ;
  //  }).subscribe();
  calculate(data) {
    //  var service = new window["google"].maps.DistanceMatrixService();
    //  service.getDistanceMatrix(
    //  {
    //    origins: ["26.5393,80.4878"],
    //    destinations: [data],
    //    travelMode: window["google"].maps.TravelMode.DRIVING,
    //    unitSystem: window["google"].maps.UnitSystem.IMPERIAL
    //  },
    //  (res,status)=>
    //  {
    //   let distance = Math.floor(res.rows[0].elements[0].distance.value/1000);
    //   if(distance<=50)
    //   {
    //     if((this.totalAmount-this.totalDiscount-this.couponDiscount)>=500)
    //     this.calculatedDelieveryCharge = 0;
    //     else
    //     this.calculatedDelieveryCharge = 50;
    //   }
    //   else if(distance>50&&distance<=100)
    //   {
    //    if((this.totalAmount-this.totalDiscount-this.couponDiscount)>=2000)
    //    this.calculatedDelieveryCharge = 0;
    //    else
    //    this.calculatedDelieveryCharge = 50;
    //   }
    //   else  if(distance>100&&distance<=HomePageService.maxDistance)
    //   {
    //    this.calculatedDelieveryCharge = 100;
    //   }
    //    if(Math.floor(res.rows[0].elements[0].distance.value/1000)>HomePageService.maxDistance)
    //    {
    //      this.pincodeAvailabilty = "not available"
    //    }
    //    else
    //    {
    //      this.pincodeAvailabilty = "available"
    //    }

    //    if(this.calculatedDelieveryCharge)
    //    this.delieveryCharge = this.calculatedDelieveryCharge;
    //    this.pincodeSpinner = false;
    //    this.ref.detectChanges();
    //  })
  }

  goToAddressPage() {
    if (!this.someProductsUnavailable) {
      this.router.navigate(['address'])
    }
  }
  applyCoupon(apply: boolean) {
    // if(this.selectedCouponIndex>=0&&this.selectedCoupon!=this.validCoupons[this.selectedCouponIndex].couponCode)
    // {
    //   this.selectedCoupon = this.validCoupons[this.selectedCouponIndex].couponCode


    // if(apply&&localStorage.getItem("token"))
    // {
    //   console.log(JSON.stringify({coupon:this.validCoupons[this.selectedCouponIndex].couponCode}))
    //   this.subscribers[this.subscriberCount++] = this.userService.applyCoupon(this.security.encrypt(JSON.stringify({coupon:this.validCoupons[this.selectedCouponIndex].couponCode}))).subscribe(
    //     data=>
    //     {
    //       let coupon = this.validCoupons[this.selectedCouponIndex];
    //       let discount = (coupon.discount_percent)?((this.totalAmount-this.totalDiscount)*coupon.discount_percent/100):coupon.discount;
    //       this.couponDiscount = Math.min(coupon.maxDiscount,discount)
    //       this.showCouponMenu = false;
    //       this.homePageService.openSnackbar("Coupon Applied")
    //       if((this.totalAmount-this.totalDiscount-this.couponDiscount)<1999)
    //       this.delieveryCharge = 100;
    //     },
    //     err =>
    //     {
    //       console.log(err)
    //       this.showCouponMenu = false;
    //     }
    //   )
    // }
    // else
    // {
    //   let coupon = this.validCoupons[this.selectedCouponIndex];
    //   let discount = (coupon.discount_percent)?((this.totalAmount-this.totalDiscount)*coupon.discount_percent/100):coupon.discount;
    //   this.couponDiscount = Math.min(coupon.maxDiscount,discount)
    //   this.showCouponMenu = false;
    //   if((this.totalAmount-this.totalDiscount-this.couponDiscount)<1999)
    //   this.delieveryCharge = 100;
    // }
    // }
    // else
    // {
    //   this.showCouponMenu = false;
    // }
  }
  cancelCoupon() {
    console.log(this.selectedCoupon)
    this.showCouponMenu = false;
    if (this.validCoupons.length > 0) {
      let coupons = this.validCoupons.map(data => data.couponCode)
      this.selectedCouponIndex = coupons.indexOf(this.selectedCoupon)
    }
  }
  findCoupons(coupon?: any) {
    // if(this.firstTimeCouponLoading)
    // {

    //   let products = this.products.filter(item=>item.available_products)
    //   products = products.map(data=>data.product_info.category)
    //   this.firstTimeCouponLoading = false;
    //   this.couponSpinner = true ;
    //   this.subscribers[this.subscriberCount++] = this.userService.findCoupons(this.security.encrypt(JSON.stringify(products))).subscribe(
    //     data =>
    //     {
    //         this.validCoupons = data.valid;
    //         this.invalidCoupons = data.invalid;
    //         this.couponSpinner = false ;
    //         console.log(this.validCoupons)
    //         if(this.validCoupons.length==0&&this.invalidCoupons.length==0)
    //         {
    //           this.noCouponFound = 'No Coupons Available';
    //         }
    //         else
    //         {
    //           this.noCouponFound = '';
    //         }
    //         if(coupon)
    //         {
    //           for(let i=0;i<this.validCoupons.length;i++)
    //           {
    //             if(this.validCoupons[i].couponCode==coupon)
    //             {
    //               this.selectedCouponIndex = i;

    //               this.applyCoupon(false);
    //             }
    //           }

    //         }
    //     }
    //   )

    // }

  }
  checkDelivery() {
    this.pincodeSpinner = true;
    this._cartService.checkDelivery(this.addressForm.controls.pincode.value).subscribe(
      (data:any) => {
        if(!data.data.cod) {
          this._cartService.showAlert('Product is unavailable at this location')
        } 
        else if(data.data.cod==='COD') {
          this._cartService.showAlert('Product is available at this location')
        } else {
          this._cartService.showAlert('Product is available at this location but cod is not allowed')
        }
        this.pincodeSpinner = false;
        console.log(data)
      }, err => {
        this.pincodeSpinner = false;
      }
    )
  }
  calculateCouponDiscount(coupon: any) {
    let total = this.totalAmount - this.totalDiscount;
    if (coupon.discount_percent) {
      return Math.min(Math.ceil((total * coupon.discount_percent) / 100), coupon.maxDiscount)
    }
    else {
      return Math.min(Math.ceil((total * coupon.discount_percent) / 100), coupon.maxDiscount)
    }
  }

  updateCartProducts(product: any, removeData?) {
    let data = { productId: product._id, quantity: (product.quantity || product.quantity === 0) ? +product.quantity : null, moveToWishlist: false };
    if (!removeData && !product.quantity) {
      return;
    }
    else {
      if (removeData) {
        data.quantity = 0;
        if (removeData.moveToWishlist) {
          data['moveToWishlist'] = true;
        }
      }
      this._cartService.updateCart(data)
        .subscribe(
          (response: any) => {
            if (response) {
              this.products = response.data.cartData;
            }
          }
        )
    }

  }

  isMobileDevice() {
    return false;
  }
  calculateAmount() {
    return this.products.map(x => x.price).reduce((a, b) => {
      return a + b;
    })
  }
  raiseQuery() {
    let data = {
      "products": this.products.map(item => {
        return  {
          "productId": item._id,
          "quantity": item.quantity,
          "sellerId": item.seller
        }
      })
    }
    this._cartService.raiseQuery(data).subscribe();
  }
} 
