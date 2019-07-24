import { Injectable } from '@angular/core';
import { UtilityService } from '../../shared/services/utility.service';
import { HttpService } from '../../shared/services/http.service';
import { USER_URL } from '../../../constant/urls';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { POPUP_MESSAGES } from '../../../constant/messages';
@Injectable()
export class PaymentService {
    constructor(
        private _utilityService: UtilityService,
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
}
