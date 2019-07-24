import { Injectable } from '@angular/core';
import { UtilityService } from '../../shared/services/utility.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../shared/services/http.service';
import { USER_URL } from '../../../constant/urls';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { POPUP_MESSAGES } from '../../../constant/messages';

@Injectable()
export class ResetPasswordService {

  constructor(
    private _utilityService: UtilityService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _router: Router
  ) { }

  getResetForm() {
    return this._formBuilder.group({
      password: this._utilityService.getPasswordFormControl(),
      confirmPassword: this._utilityService.getPasswordFormControl()
    }, { validate: this._utilityService.matchPassword })
  }

  resetPassword(data) {
    return new Observable((observer) => {
      this._http.post(USER_URL.resetPassword, data).subscribe(
        (response:any) => {
          if (response['statusCode']===200) {
            this._utilityService.showAlert('Password changed successfully');
            this._router.navigate(['']);
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
