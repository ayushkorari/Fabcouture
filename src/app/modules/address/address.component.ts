import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from './service/address.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [AddressService],
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
export class AddressComponent implements OnInit {

  pincodeSpinner: boolean;
  billingPincodeSpinner: boolean;
  addresses: any[] = [];
  products: any[] = [];
  data: any;
  showMenu: boolean = false;
  addressForm: FormGroup;
  totalAmount: number = 0;
  totalDiscount: number = 0;
  couponDiscount: number = 0;
  delieveryCharge: number = 0;
  selectedAddress;
  someProductsUnavailable: boolean = false;
  editing: boolean = false;
  subscribers: any[] = [];
  subscriberCount: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _addressService: AddressService,
    private _cd: ChangeDetectorRef
  ) {

    this.createForm();
    this.toggleBillingAddress();

  }

  addressToEdit: any;
  private searchPin = new Subject<string>();
  private searchBillingPin = new Subject<string>();

  selectedAddressStyles = {
    "color": '#2cd2b1',
    "background-color": '#f4fdfb',
    "border": "1px solid #2cd2b1"
  };
  addressStyles = {
    "color": 'gray',
    "background-color": 'white',
    "border": "1px solid lightgray"
  };
  searchByPin(pincode, isBilling = false) {
    if (isBilling) {
      let billingAddress = <FormGroup>this.addressForm.controls.billingAddress;
      if (billingAddress.controls.pinCode.valid && pincode.length == 6) {
        this.searchBillingPin.next(pincode);
      }
    } else if (this.addressForm.controls.pinCode.valid && pincode.length == 6) {
      this.searchPin.next(pincode);
    }
  }
  createForm() {
    this.addressForm = new FormGroup({
      pinCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]),
      line1: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      line2: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('', [Validators.required, Validators.pattern("[1-9]{1}[0-9]{9}")]),
      type: new FormControl('', [Validators.required]),
      isDefault: new FormControl(false, []),
      hasSameBillingAddress: new FormControl(true, [])
    });
  }
  getBillingAddress() {
    return new FormGroup({
      pinCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]),
      line1: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      line2: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('', [Validators.required, Validators.pattern("[1-9]{1}[0-9]{9}")])
    })
  }

  toggleBillingAddress() {
    this.addressForm.controls.hasSameBillingAddress.valueChanges.subscribe(
      data => {
        if (!data && !this.addressForm.controls.billingAddress) {
          this.addressForm.addControl('billingAddress', this.getBillingAddress());
        }
        if (data && this.addressForm.controls.billingAddress) {
          this.addressForm.removeControl('billingAddress');
        }
      }
    )
  }
  public handleAddressChange(address: any) {
    console.log(address)
    let res = address["formatted_address"].split(",");
    let pin = res[res.length - 2].slice(res[res.length - 2].length - 6);
    if ( this.addressForm.controls.pinCode.value&&pin.trim() != this.addressForm.controls.pinCode.value) {
      alert("Pincode of this address is not matched with provided pincode")
      this.addressForm.controls.line2.setValue("");
    }
  }

  handleBillingAddress(address: any) {
    console.log(address)
    let res = address["formatted_address"].split(",");
    let pin = res[res.length - 2].slice(res[res.length - 2].length - 6);
    let billingAddress = <FormGroup>this.addressForm.controls.billingAddress;
    if (billingAddress.controls.pinCode.value && pin.trim() != billingAddress.controls.pinCode.value) {
      alert("Pincode of this address is not matched with provided pincode")
      billingAddress.controls.line2.setValue("");
    }
  }
  addBillingAddress() {
    // this.addressForm.addControl('')
  }
  getCartProducts() {
    this._addressService.getCartProducts()
      .subscribe(
        (response: any) => {
          console.log(response);
          this.products = response.data;
          this.calculateAmount();
        }
      )
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition(data => {
      this.subscribers[this.subscriberCount++] = this._addressService.getAddressByLocation(data.coords.latitude + "," + data.coords.longitude).subscribe(
        (data: any) => {
          if (data) {
            this.addressForm.controls.line2.setValue(data.address);
            this.addressForm.controls.pinCode.setValue(data.pincode);
            this.addressForm.controls.state.setValue(data.state);
            this.addressForm.controls.line1.setValue(data.locality);
            this.addressForm.controls.city.setValue(data.district);
          }
        }

      );

    });
  }
  changeSelectedAddress(i, alert = true) {
    this.subscribers[this.subscriberCount++] = this._addressService.calculateDistance(this.addresses[i].pinCode).subscribe((data: any) => {
      if (data) {
        this.calculate(data, i, alert);
      }
    })
  }
  calculate(data, i, alert) {
    var service = new window["google"].maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: ["28.604727999999998,77.372862"],
        destinations: [data],
        travelMode: window["google"].maps.TravelMode.DRIVING,
        unitSystem: window["google"].maps.UnitSystem.IMPERIAL
      },
      (res, status) => {
        let distance = Math.floor(res.rows[0].elements[0].distance.value / 1000);
        if (distance <= 50) {
          if ((this.totalAmount - this.totalDiscount - this.couponDiscount) >= 500)
            this.delieveryCharge = 0;
          else
            this.delieveryCharge = 50;
        }
        else if (distance > 50 && distance <= 100) {
          if ((this.totalAmount - this.totalDiscount - this.couponDiscount) >= 2000)
            this.delieveryCharge = 0;
          else
            this.delieveryCharge = 50;
        }
        else if (distance > 100 && distance <= 200) {
          this.delieveryCharge = 100;
        }
        if (Math.floor(res.rows[0].elements[0].distance.value / 1000) > 200) {
          if (alert)
            window.alert("This Order is not delieverable to given address");

        }
        else {

          this.selectedAddress = { ...this.addresses[i] };
          this._cd.detectChanges();
        }

      })
  }
  calculateCouponDiscount(coupon: any) {

    let discount = (coupon.discount_percent) ? ((this.totalAmount - this.totalDiscount) * coupon.discount_percent / 100) : coupon.discount;
    return Math.min(coupon.maxDiscount, discount)
  }
  resetAddress() {
    this.showMenu = false;
    this.editing = false;
    this.addressForm.controls.state.setValue('')
    this.addressForm.controls.city.setValue('')
    this.addressForm.reset();
    this.searchPin.next("aa")
    this.addressToEdit = null;
  }
  goToPaymentPage() {
    if (this.selectedAddress) {
      this.router.navigate(['/payment'], { queryParams: { addressId: this.selectedAddress._id } });
    }
  }
  removeAddress(i) {
    this._addressService.removeAddress(this.addresses[i]._id)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.addresses = response.data;
        }
      )
  }

  editAddress(data: any) {
    this.createForm();
    let address = { ...data };
    delete address['_id'];
    this.editing = true;
    console.log(data);
    if (address.billingAddress) {
      address.hasSameBillingAddress = false;
      this.addressForm.addControl('billingAddress', this.getBillingAddress());
    }
    this.addressForm.patchValue({ ...address });
    this.addressToEdit = data;
    this.showMenu = true;
    this.toggleBillingAddress();
  }
  addNewAddress() {

    this.searchPin.next("aa")
    let data = {...this.addressForm.value};
    delete data.hasSameBillingAddress;
    this._addressService.addNewAddress(data)
      .subscribe(
        (response: any) => {
          if (response) {
            console.log(response);
            this.showMenu = false;
            this.addressForm.reset();
            this.addresses = response.data;
          }
        }
      )
  }
  saveEditedAddress() {
    let data = {...this.addressForm.value};
    delete data.hasSameBillingAddress;
    this._addressService.updateAddress({ ...data, addressId: this.addressToEdit._id })
      .subscribe(
        (response: any) => {
          if (response) {
            console.log(response);
            this.showMenu = false;
            this.addressForm.reset();
            this.addresses = response.data;
          }
        }
      )
  }
  getAddressList() {
    this._addressService.getAddresses()
      .subscribe(
        (response: any) => {
          console.log(response);
          this.addresses = response.data;
        }
      )
  }
  calculateAmount() {
    this.totalAmount = this.products.map(x => x.price).reduce((a, b) => {
      return a + b;
    })
  }
  ngOnInit() {
    this.getAddressList();
    this.getCartProducts();
    this.searchPin.pipe(
      debounceTime(300), distinctUntilChanged()
    )
      .subscribe(data => {

        if (data && data.length == 6) {
          this.pincodeSpinner = true;
          this.subscribers[this.subscriberCount++] = this._addressService.getAddressByPincode(data).subscribe((data: any) => {
            this.addressForm.controls.pinCode.setValue(data.pincode);
            this.addressForm.controls.state.setValue(data.state);
            this.addressForm.controls.line1.setValue(data.locality);
            this.addressForm.controls.city.setValue(data.district);
            this.pincodeSpinner = false;

          }, err => {
            alert("wrong pincode")
            this.pincodeSpinner = false;
          })
        }
      });
    this.searchBillingPin.pipe(
      debounceTime(300), distinctUntilChanged()
    )
      .subscribe(data => {

        if (data && data.length == 6) {
          this.billingPincodeSpinner = true;
          this.subscribers[this.subscriberCount++] = this._addressService.getAddressByPincode(data).subscribe((data: any) => {
            let billingAddress = <FormGroup>this.addressForm.controls.billingAddress;
            if (billingAddress) {
              billingAddress.controls.pinCode.setValue(data.pincode);
              billingAddress.controls.state.setValue(data.state);
              billingAddress.controls.line1.setValue(data.locality);
              billingAddress.controls.city.setValue(data.district);
            }
            this.billingPincodeSpinner = false;

          }, err => {
            alert("wrong pincode")
            this.billingPincodeSpinner = false;
          })
        }
      });


  }
  ngOnDestroy() {
    for (let i = 0; i < this.subscribers.length; i++) {
      this.subscribers[i].unsubscribe();
    }
  }

}
