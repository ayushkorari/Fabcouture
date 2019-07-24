import { Injectable } from '@angular/core';
import { UtilityService } from '../../shared/services/utility.service';
import { HttpService } from '../../shared/services/http.service';
import { USER_URL } from '../../../constant/urls';
import { Observable } from 'rxjs';
import { POPUP_MESSAGES } from '../../../constant/messages';

@Injectable()
export class SingleProductService {
  constructor(
    private _utilityService: UtilityService,
    private _http: HttpService
  ) {
  }

  isMobileDevice() {
    return this._utilityService.isMobileDevice();
  }
  addToWishlist(id) {
    return this._utilityService.addToWishlist(id);
  }
  addToCart(data) {
    return this._utilityService.addToCart(data);
  }
  removeFromWishlist(data) {
    return new Observable((observer) => {
      this._http.patch(USER_URL.removeFromWishlist, data).subscribe(
        (response:any) => {
          if (response['statusCode'] === 200) {
            if(data.moveToCart) {
              this._utilityService.showAlert(POPUP_MESSAGES.productAddedToCart);
              this._utilityService.cartUpdate.next({totalCartProducts:response.data.totalCartCount})
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
}
