import { Injectable } from '@angular/core';
import { UtilityService } from '../../../shared/services/utility.service';
import { HttpService } from '../../../shared/services/http.service';
import { USER_URL } from '../../../../constant/urls';
import { map, catchError } from 'rxjs/operators';
import { COMMON_MESSAGES } from '../../../../constant/messages';
import { throwError } from 'rxjs';


@Injectable()
export class ProfileService {
    constructor(
        private _utilityService: UtilityService,
        private _http: HttpService
    ) {
    }

    isMobileDevice() {
        return this._utilityService.isMobileDevice();
    }
    getProfileDetail() {
        return this._http.get(USER_URL.userProfile);
    }

    updateProfile(data) {
        return this._http.patch(USER_URL.profileUpdate, data);
    }

    showAlert(message) {
        this._utilityService.showAlert(message);
    }

    updateDetail(storage) {
        this._utilityService.userDetail.next(storage);
    }
}
