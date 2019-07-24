import { Injectable } from '@angular/core';
import { UtilityService } from '../../shared/services/utility.service';
import { HttpService } from '../../shared/services/http.service';
import { USER_URL } from '../../../constant/urls';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class HomeService {
    constructor(
        private _utilityService: UtilityService,
        private _http:HttpService
    ) {
    }  
    
    isMobileDevice() {
        return this._utilityService.isMobileDevice();
    }
    getHomePageProducts(data) {
        return new Observable((observer) => {
            this._http.get(USER_URL.home, data).subscribe(
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
    getBanners() {
        return new Observable((observer) => {
            this._http.get(USER_URL.bannerList).subscribe(
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
