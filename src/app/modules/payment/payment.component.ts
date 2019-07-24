import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../address/service/address.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [AddressService]
})
export class PaymentComponent implements OnInit {

  selectedAddressStyles = {
    "color": '#2cd2b1',
    "background-color": '#f4fdfb',
    "border": "1px solid #2cd2b1"
  };
  subscribers: any[] = [];
  subscriberCount: number = 0;
  orderMessage: string = '';
  address: any;
  products: any[] = [];
  data: any;
  totalAmount: number = 0;
  totalDiscount: number = 0;
  couponDiscount: number = 0;
  delieveryCharge: number = 0;
  selectedAddress: number = -1;
  someProductsUnavailable: boolean = false;
  editing: boolean = false;
  orderedProducts: any[] = [];
  addresses: any;
  addressId: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _addressService: AddressService
  ) {
    this.reactiveForm = new FormGroup({
      recaptchaReactive: new FormControl(null, Validators.required)
    });
  }
  response: any;
  options: any;


  ngOnInit() {
    this.addressId = this.route.snapshot.queryParams.addressId;
    this.getData();
  }
  async getData() {
    try {
      await Promise.all([this.getAddressList(),this.getCartProducts()]);
      this.initiateRazorpay();
    } catch(err) {

    }
  }
  getAddressList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._addressService.getAddresses()
        .subscribe(
          (response: any) => {
            console.log(response);
            this.addresses = response.data;
            this.address = this.addresses.filter(x => x._id === this.addressId)[0];
            console.log(this.address)
            resolve();
          }, err => {
            reject()
          }
        )
    })
  }
  getCartProducts() {
    return new Promise((resolve, reject) => {
      this._addressService.getCartProducts()
        .subscribe(
          (response: any) => {
            console.log(response);
            this.products = response.data;
            this.calculateAmount();
            resolve()
          }, err => {
            reject()
          }
        )
    })

  }
  calculateAmount() {
    this.totalAmount = this.products.map(x => x.price).reduce((a, b) => {
      return a + b;
    })
  }
  initiateRazorpay() {
    this.options = {
      "key": "rzp_test_idVM88iEqHSt60",
      "amount": this.totalAmount*100,
      "name": this.address.name,
      "description": "Shopping Order",
      "image": "https://cdn1.storehippo.com/s/5a6ef16301bd210c588e3577/ms.settings/5256837ccc4abf1d39000001/5ad47d887166d3c06e350538-480x480.png",
      "handler": data => this.capturePayment(data),
      "prefill": {
        "name": this.address.name,
        "email": 'ayush@yopmail.com',
        "contact": this.address.phoneNo

      },
      "theme": {
        "color": "#3f51b5"
      }
    };
    this.rzp1 = new window["Razorpay"](this.options).once('ready', function () {

    })
  }
  capturePayment(response) {
    console.log(response);
    let data = {
      "orderId": new Date().getTime().toString(),
      "paymentMethod": "RAZOR_PAY",
      "paymentId": response.razorpay_payment_id
    };
    this.placeOrder(data);
  }
  placeOrder(data) {
    let products = this.products.map(product=> {
      return { productId:product._id,quantity:product.quantity,sellerId:product.seller }
    });
    this._addressService.placeOrder({
      products:products,addressId:this.addressId,paymentDetails:data
    })
    .subscribe();
  }
  public reactiveForm: FormGroup;
  rzp1: any;

  displayRazorpay(e) { 

    this.rzp1.open();
    e.preventDefault();
 
  }

  calculateCouponDiscount(coupon: any) {


    let discount = (coupon.discount_percent) ? ((this.totalAmount - this.totalDiscount) * coupon.discount_percent / 100) : coupon.discount;
    return Math.min(coupon.maxDiscount, discount)
  }

  ngOnDestroy() {
  }
}
