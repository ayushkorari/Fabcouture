import { Injectable } from '@angular/core';
import { UtilityService } from '../../shared/services/utility.service';
import { HttpService } from '../../shared/services/http.service';
import { USER_URL } from '../../../constant/urls';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Injectable()
export class ProductPageService {
  constructor(
    private _utilityService: UtilityService,
    private _http: HttpService,
    private _formBuilder: FormBuilder
  ) {
  }

  isMobileDevice() {
    return this._utilityService.isMobileDevice();
  }
  getProductList(data) {
    return new Observable((observer) => {
      this._http.get(USER_URL.products, data).subscribe(
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
  getCategoryList(data) {
    return new Observable((observer) => {
      this._http.get(USER_URL.categoryList, data).subscribe(
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
  getColorList(data) {
    return new Observable((observer) => {
      this._http.get(USER_URL.colourList, data).subscribe(
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
  getCollectionList(data) {
    return new Observable((observer) => {
      this._http.get(USER_URL.collectionList, data).subscribe(
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
