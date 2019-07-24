import { Injectable } from '@angular/core';
import { UtilityService } from '../../shared/services/utility.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../shared/services/http.service';
import { USER_URL } from '../../../constant/urls';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { POPUP_MESSAGES } from '../../../constant/messages';

@Injectable()
export class LoginService {

  constructor(
    private _utilityService: UtilityService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _router: Router
  ) { }
  getLoginForm() {
    return this._formBuilder.group({
      email: this._utilityService.getEmailFormControl(),
      password: this._utilityService.getPasswordFormControl()
    })
  }
  getSignupForm() {
    return this._formBuilder.group({
      email: this._utilityService.getEmailFormControl(),
      password: this._utilityService.getPasswordFormControl(),
      confirmPassword: this._utilityService.getPasswordFormControl(),
      name: this._utilityService.getNameFormControl(),
      phoneNo: this._utilityService.getPhoneFormControl(),
      gender: this._utilityService.getNameFormControl()
    }, { validate: this._utilityService.matchPassword })
  }
  signUp(data) {
    return new Observable((observer) => {
      this._http.post(USER_URL.signUp, data).subscribe(
        response => {
          if (response['statusCode'] === 201) {
            this._utilityService.showAlert(POPUP_MESSAGES.signUpSuccess);
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

  forgotPassword(data) {
    return new Observable((observer) => {
      this._http.post(USER_URL.forgotPassword, data).subscribe(
        response => {
          this._utilityService.showAlert(POPUP_MESSAGES.passwordResetLink);
          observer.next(response);
        }, error => {
          observer.next(null);
        }
      )
    });
  }

  login(data) {
    return new Observable((observer) => {
      this._http.post(USER_URL.login, data).subscribe(
        (response: any) => {
          if (response['statusCode'] === 200) {
            this._utilityService.setLocalStorage(response.data);
            this._utilityService.userDetail.next(response.data);
            this._utilityService.cartUpdate.next({ totalCartProducts: response.data.totalCartCount })
            this._utilityService.showAlert(POPUP_MESSAGES.loginSuccess);
            this._router.navigate([this._utilityService.afterLoginUrl || '']);
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
  socialLogin(data) {
    return new Observable((observer) => {
      this._http.post(USER_URL.socialLogin, data).subscribe(
        (response: any) => {
          if (response['statusCode'] === 200) {
            // response.data = {...response.data.res.data,...response.accessToken};
            this._utilityService.setLocalStorage(response.data);
            this._utilityService.userDetail.next(response.data);
            this._utilityService.cartUpdate.next({ totalCartProducts: response.data.totalCartCount })
            this._utilityService.showAlert(POPUP_MESSAGES.loginSuccess);
            this._router.navigate([this._utilityService.afterLoginUrl || '']);
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
