
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from './service/login.service';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {
  socialLoginSub: any;
  socialSignupSub: any;

  constructor(
    private _loginSerive: LoginService,
    private authService: AuthService
  ) {
    this.loginForm = this._loginSerive.getLoginForm();
    this.registrationForm = this._loginSerive.getSignupForm();
  }
  subscribers: any[] = [];
  subscriberCount: number = 0;
  totalAddedProductsToCart = 0;
  answer: string;
  answerDisplay: string;
  showSpinner: Boolean = false;
  hide = true;
  hidePassword = true;
  hideConfirmPassword = true;
  mobile_pattern = "[1-9]{1}[0-9]{9}";
  forgetPassword = false;
  loginForm: FormGroup;
  registrationForm: FormGroup;

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.listenToSocialLogin();
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.listenToSocialLogin();
  }
  signOut(): void {
    this.authService.signOut();
  }

  listenToSocialLogin() {
    if (this.socialSignupSub) {
      this.socialSignupSub.unsubscribe();
    }
    if (this.socialLoginSub) {
      this.socialLoginSub.unsubscribe();
    }
    this.socialLoginSub = this.authService.authState.subscribe((user) => {
      console.log(user);
      let data = {
        "socialKey": user.id,
        "name": user.name,
        "email": user.email,
        "profilePicURL": user.photoUrl,
        "deviceType": "WEB",
        "deviceId": "string",
        "deviceToken": "string"
      };
      this.socialLogin(data);
    });
  }
  listenToSocialSignup() {
    if (this.socialSignupSub) {
      this.socialSignupSub.unsubscribe();
    }
    if (this.socialLoginSub) {
      this.socialLoginSub.unsubscribe();
    }
    this.socialSignupSub = this.authService.authState.subscribe((user) => {
      console.log(user);
    });
  }
  socialLogin(data) {
    this._loginSerive.socialLogin(data).subscribe();
  }
  register() {
    const deviceDetail = {
      "countryCode": "+91",
      "deviceType": "ANDROID",
      "deviceId": "1234567",
      "deviceToken": "1234567"
    }
    const data = { ...this.registrationForm.value };
    delete data['confirmPassword'];
    this._loginSerive.signUp({ ...deviceDetail, ...data })
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response) {
            this.registrationForm.reset();
          }
        }
      )
  }

  sendEmail() {
    this._loginSerive.forgotPassword({ email: this.loginForm.controls.email.value, phase: 2 }).subscribe();
  }

  add_Product_To_User_Cart_After_Login(cart: any[]) {


  }

  login() {
    const deviceDetail = {
      "deviceType": "ANDROID",
      "deviceId": "1234567",
      "deviceToken": "1234567"
    }
    const data = { ...this.loginForm.value };
    this._loginSerive.login({ ...deviceDetail, ...data })
      .subscribe()
  }

  resetTabs() {
    this.loginForm.reset();
    this.registrationForm.reset();
    this.forgetPassword = false;
    this.hide = this.hidePassword = this.hideConfirmPassword = true;
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }



}

