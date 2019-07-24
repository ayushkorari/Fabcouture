import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { POPUP_MESSAGES, SOMETHING_WENT_WRONG } from '../../../constant/messages';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { Validators, AbstractControl } from '@angular/forms';
import { PATTERN } from '../../../constant/patterns';
import { VALIDATION_CRITERIA } from '../../../constant/validation-criteria';
import { HttpService } from './http.service';
import { USER_URL } from '../../../constant/urls';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    constructor(
        private _dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _http: HttpService,
        private _router: Router
    ) {
    }

    public cartUpdate = new BehaviorSubject<any>(null);
    public userDetail = new Subject<any>();
    afterLoginUrl = '';
    clearStorage() {
        localStorage.removeItem('userDetail');
    }
    setLocalStorage(data) {
        localStorage.setItem('userDetail', JSON.stringify(data));
    }
    getLocalStorage() {
        try {
            return localStorage.getItem('userDetail') ? JSON.parse(localStorage.getItem('userDetail')) : null;
        } catch (err) {
            return null;
        }
    }
    isMobileDevice() {
        let testExp = new RegExp('Android|webOS|iPhone|iPad|' +
            'BlackBerry|Windows Phone|' +
            'Opera Mini|IEMobile|Mobile',
            'i');

        if (testExp.test(navigator.userAgent))
            return true;
        else
            return false;
    };

    showAlert(message) {

        this._snackBar.open(message, 'Close', {
            duration: 3000,
        });
    }
    trim(data) {
        for (const item in data) {
            if (typeof data[item] === 'string') {
                data[item] = data[item].trim();
            }
        }
        return data;
    }
    errorAlert(error) {
        let data = {
            title: '',
            message: (error && error.error && error.error.message) ? (error.error.message) : SOMETHING_WENT_WRONG,
            yes: POPUP_MESSAGES.close,
            isHideCancel: true
        }
        this.openDialog(data).subscribe(success => {

        });
    }
    openDialog(data) {
        const dialogRef = this._dialog.open(ConfirmationModalComponent, {
            width: '500px',
            data: data
        });
        return dialogRef.afterClosed();
    }
    matchPassword(form: AbstractControl) {
        let password = form.get('password').value;
        let confirmPassword = form.get('confirmPassword').value;
        if (password != confirmPassword) {
            form.get('confirmPassword').setErrors({ matchPassword: true })

        } else {
            if (form.get('confirmPassword').errors)
                delete form.get('confirmPassword').errors['matchPassword'];
        }
    }
    getPriceFormControl(required = false) {
        let validations = [
            Validators.min(0.1),
            Validators.pattern(PATTERN.price)
        ];
        if (required) {
            validations.splice(0, 0, Validators.required);
        }
        return [null, Validators.compose(validations)];
    }
    getNameFormControl(required = true) {
        let validations = [
            Validators.pattern(PATTERN.name),
            Validators.minLength(VALIDATION_CRITERIA.nameMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.nameMaxLength)];
        if (required) {
            validations.splice(0, 0, Validators.required);
        }
        return ['', Validators.compose(
            validations
        )];
    }
    getEmailFormControl() {
        return ['', Validators.compose([
            Validators.required,
            Validators.pattern(PATTERN.email),
            Validators.maxLength(VALIDATION_CRITERIA.emailMaxLength)]
        )];
    }
    getPasswordFormControl() {
        return ['', Validators.compose([
            Validators.required,
            Validators.pattern(PATTERN.password),
            Validators.minLength(VALIDATION_CRITERIA.passwordMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.passwordMaxLength)]
        )];
    }
    getPhoneFormControl() {
        return ['', Validators.compose([
            Validators.required,
            Validators.pattern(PATTERN.phone),
            Validators.minLength(VALIDATION_CRITERIA.phoneMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.phoneMaxLength)]
        )];
    }
    addToCart(data) {
        return new Observable((observer) => {
            this._http.post(USER_URL.addToCart, data).subscribe(
                (response:any) => {
                    if (response['statusCode'] === 200) {
                        this.showAlert(POPUP_MESSAGES.productAddedToCart);
                        this.cartUpdate.next({totalCartProducts:response.data.totalCartCount});
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
    addToWishlist(productId) {
        const url = this._router.url;
        return new Observable((observer) => {
            if (this.getLocalStorage()) {
                this._http.post(USER_URL.addToWishlist, { productId }).subscribe(
                    response => {
                        if (response['statusCode'] === 200) {
                            this.showAlert(POPUP_MESSAGES.productAddedToWishlist);
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
                this.afterLoginUrl = url;
                this._router.navigate(['/login']);
                observer.next(null);
            }
        });
    }
}
