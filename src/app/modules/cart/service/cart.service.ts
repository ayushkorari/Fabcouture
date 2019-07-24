import { Injectable } from '@angular/core';
import { UtilityService } from '../../shared/services/utility.service';
import { HttpService } from '../../shared/services/http.service';
import { USER_URL } from '../../../constant/urls';
import { Observable } from 'rxjs';
import { POPUP_MESSAGES } from '../../../constant/messages';
import { Router } from '@angular/router';

@Injectable()
export class CartService {
    constructor(
        private _utilityService: UtilityService,
        private _http: HttpService,
        private _router:Router
    ) {
    }

    isMobileDevice() {
        return this._utilityService.isMobileDevice();
    }
    getCartProducts() {
        return new Observable((observer) => {
            this._http.get(USER_URL.cartList).subscribe(
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
    addToCart(data) {
        return this._utilityService.addToCart(data);
    }
    checkDelivery(pincode) {
        return this._http.post(USER_URL.checkDelivery, { pincode },false)
    }
    showAlert(message) {
        this._utilityService.showAlert(message);
    }
    updateCart(data) {
        return new Observable((observer) => {
            this._http.patch(USER_URL.updateCart, data).subscribe(
                response => {
                    if (response['statusCode'] === 200) {
                        if (data.quantity === 0) {
                            if (data['moveToWishlist']) {
                                this._utilityService.showAlert(POPUP_MESSAGES.productAddedToWishlist);
                            }
                            this._utilityService.cartUpdate.next({ totalCartProducts: 1, remove: true })
                        }
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
    addToWishlist(id) {
        return this._utilityService.addToWishlist(id);
    }
    getLocalStorage() {
        return this._utilityService.getLocalStorage();
    }
    raiseQuery(body) {
        let data = {
            title: '',
            message: '',
            yes: 'Submit',
            isHideCancel: false,
            no: 'Cancel',
            reasonText: 'Please Enter Your Query',
            showTextBox: true
        }
        return new Observable((observer) => {

            this._utilityService.openDialog(data).subscribe(res => {
                if (res != undefined && res != null) {

                    this._http.post(USER_URL.raiseQuery, { text: res[0].note,...body }).subscribe(
                        response => {
                            if (response['statusCode'] === 200 || response['statusCode'] === 201) {
                                this._utilityService.showAlert('Your query has been raised successfully');
                                observer.next(response);
                            } else {
                                observer.next(null);
                            }
                        }, error => {
                            observer.next(null);
                        }
                    )
                }
                else {
                    observer.next(null);
                }
            });
        });

    }
}
