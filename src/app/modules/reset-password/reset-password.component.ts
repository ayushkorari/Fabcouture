
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResetPasswordService } from './service/reset-password.service';
import { Route, ActivatedRoute } from '@angular/router';


@Component({

  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [ResetPasswordService]
})

export class ResetPasswordComponent implements OnInit {
  socialLoginSub: any;
  socialSignupSub: any;
  hidePassword = true;
  hideConfirmPassword = true;
  token: any;

  constructor(
    private _resetService: ResetPasswordService,
    private _route:ActivatedRoute
  ) {
    this.resetForm = this._resetService.getResetForm();
    this.token = this._route.snapshot.params.token;
  }
  resetForm: FormGroup;


  ngOnInit() {

  }

  resetPassword() {
    this._resetService.resetPassword({ resetPassword:this.resetForm.value.password, resetToken: this.token }).subscribe(
      (response:any) => {
        
      }
    )
  }



}

