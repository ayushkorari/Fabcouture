import { Injectable } from '@angular/core';
import { UtilityService } from '../../shared/services/utility.service';
import { HttpService } from '../../shared/services/http.service';
import { USER_URL } from '../../../constant/urls';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Injectable()
export class ProductDetailService {
    constructor(
        private _utilityService: UtilityService,
        private _http: HttpService,
        private _formBuilder: FormBuilder
    ) {
    }
    showAlert(message) {
        this._utilityService.showAlert(message)
    }
    isMobileDevice() {
        return this._utilityService.isMobileDevice();
    }
    getProductDetail(id) {

        return new Observable((observer) => {
            this._http.get(USER_URL.products, { page: 0, limit: 10, id: id }).subscribe(
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
    addToWishlist(id) {
        return this._utilityService.addToWishlist(id);
    }
    getQuantityForm() {
        return this._formBuilder.group({
            quantity: this._utilityService.getPriceFormControl(true)
        })
    }
    getAddressForm() {
        return this._formBuilder.group({
            pincode: this._utilityService.getNameFormControl()
        })
    }

    checkDelivery(pincode) {
        return this._http.post(USER_URL.checkDelivery, { pincode },false)
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
