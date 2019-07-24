import { Injectable } from '@angular/core';
import { UtilityService } from '../../../shared/services/utility.service';
import { HttpService } from '../../../shared/services/http.service';
import { USER_URL } from '../../../../constant/urls';
import { Observable } from 'rxjs';

@Injectable()
export class WishlistService {
    constructor(
        private _utilityService: UtilityService,
        private _http: HttpService
    ) {
    }

    isMobileDevice() {
        return this._utilityService.isMobileDevice();
    }
    getWishlistProducts() {
        return new Observable((observer) => {
            this._http.get(USER_URL.wishlist).subscribe(
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
}
