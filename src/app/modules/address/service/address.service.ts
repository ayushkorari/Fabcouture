import { Injectable } from '@angular/core';
import { UtilityService } from '../../shared/services/utility.service';
import { HttpService } from '../../shared/services/http.service';
import { USER_URL } from '../../../constant/urls';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Http, } from '@angular/http';
import { POPUP_MESSAGES } from '../../../constant/messages';
@Injectable()
export class AddressService {
    constructor(
        private _utilityService: UtilityService,
        private _http: Http,
        private _router: Router,
        private _httpService:HttpService
    ) {
    }

    isMobileDevice() {
        return this._utilityService.isMobileDevice();
    }
    getLocalStorage() {
        return this._utilityService.getLocalStorage();
    }
    getCartProducts() {
        return new Observable((observer) => {
            this._httpService.get(USER_URL.cartList).subscribe(
                response => {
                    if (response['statusCode'] === 200) {
                        observer.next(response);
                    } else {
                        observer.next(null);
                    }
                }, error => {
                    observer.next(null);
                }
            )
        });
    }
    getAddresses() {
        return new Observable((observer) => {
            this._httpService.get(USER_URL.addressList).subscribe(
                response => {
                    if (response['statusCode'] === 200) {
                        observer.next(response);
                    } else {
                        observer.next(null);
                    }
                }, error => {
                    observer.next(null);
                }
            )
        });
    }
    addNewAddress(address) {
        return new Observable((observer) => {
            this._httpService.post(USER_URL.addAddress,address).subscribe(
                response => {
                    if (response['statusCode'] === 200) {
                        this._utilityService.showAlert(POPUP_MESSAGES.addressAdded);
                        observer.next(response);
                    } else {
                        observer.next(null);
                    }
                }, error => {
                    observer.next(null);
                }
            )
        });
    } 
    updateAddress(address) {
        return new Observable((observer) => {
            this._httpService.patch(USER_URL.updateAddress,address).subscribe(
                response => {
                    if (response['statusCode'] === 200) {
                        this._utilityService.showAlert(POPUP_MESSAGES.addressUpdated);
                        observer.next(response);
                    } else {
                        observer.next(null);
                    }
                }, error => {
                    observer.next(null);
                }
            )
        });
    }
    removeAddress(addressId) {
        return new Observable((observer) => {
            this._httpService.post(USER_URL.removeAddress,{ addressId }).subscribe(
                response => {
                    if (response['statusCode'] === 200) {
                        this._utilityService.showAlert(POPUP_MESSAGES.addressRemoved);
                        observer.next(response);
                    } else {
                        observer.next(null);
                    }
                }, error => {
                    observer.next(null);
                }
            )
        });
    }
    placeOrder(data) {
        return new Observable((observer) => {
            this._httpService.post(USER_URL.createOrder, data).subscribe(
                response => {
                    if (response['statusCode'] === 200) {
                        this._utilityService.showAlert(POPUP_MESSAGES.orderPlaced)
                        this._utilityService.cartUpdate.next({totalCartProducts:data.products.length,remove:true});
                        this._router.navigate(['/user/orders'])
                        observer.next(response);
                    } else {
                        observer.next(null);
                    }
                }, error => {
                    observer.next(null);
                }
            )
        });
    }
    getAddressByLocation(data) {
        return new Observable((observer) => {
            this._http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + data + "&key=AIzaSyAQAm_7N_IQ8ItgJFiAFuHOnRnnNRP4P4w")
                .subscribe(
                    data => {
                        console.log(JSON.parse(data["_body"]),JSON.parse(data["_body"])["results"][0]["formatted_address"])

                        let str = JSON.parse(data["_body"])["results"][0]["formatted_address"];
                        let addressList = [];
                        JSON.parse(data["_body"])["results"].forEach(
                            item => {
                                addressList = addressList.concat(item.address_components);
                            }
                        )
                        
                        console.log(addressList)
                        let temp = addressList.filter(data => data.types.indexOf("administrative_area_level_2") >= 0)[0];
                        let district = temp?temp.long_name:'';
                        temp = addressList.filter(data => data.types.indexOf("postal_code") >= 0)[0];
                        let pin = temp?temp.long_name:'';
                        temp = addressList.filter(data => data.types.indexOf("administrative_area_level_3")||data.types.indexOf("locality") >= 0)[0];
                        let locality = temp?temp.long_name:'';
                        temp = addressList.filter(data => data.types.indexOf("administrative_area_level_1") >= 0)[0];    
                        let state = temp?temp.long_name:'';
                        observer.next({ district: district, pincode: pin, locality: locality, state: state, address: str });

                    },
                    err => {
                        console.log(err)
                        observer.next(null)
                    }
                )
        });

    }
    getAddressByPincode(pincode) {
        return new Observable((observer) => {
            this._http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + pincode + "&key=AIzaSyAQAm_7N_IQ8ItgJFiAFuHOnRnnNRP4P4w")
                .subscribe(
                    data => {
                        console.log(JSON.parse(data["_body"]))
                        this.getAddressByLocation(JSON.parse(data["_body"])["results"][0].geometry.location.lat + ',' + JSON.parse(data["_body"])["results"][0].geometry.location.lng)
                            .subscribe(
                                data => {
                                    observer.next(data);
                                }
                            )
                    },
                    err => {
                        observer.next(null);
                    }
                )
        });

    }

    calculateDistance(pincode) {
        return new Observable((observer) => {
            this._http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + pincode + "&key=AIzaSyAQAm_7N_IQ8ItgJFiAFuHOnRnnNRP4P4w")
                .subscribe(
                    data => {
                        console.log(data)
                        let latLng = JSON.parse(data["_body"])["results"][0].geometry.location.lat + ',' + JSON.parse(data["_body"])["results"][0].geometry.location.lng;
                        observer.next(latLng);

                    },
                    err => {
                        observer.next(null)
                    }
                )
        });
    }
    checkDelivery(pincode) {
        return this._httpService.post(USER_URL.checkDelivery, { pincode })
    }
}
