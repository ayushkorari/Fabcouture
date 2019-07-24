import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProfileService } from './service/profile.service';
import { COMMON_MESSAGES } from '../../../constant/messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService],
  animations: [
    trigger('filters', [

      transition('void => *', [
        state('in', style({ transform: 'translateX(0)' })),
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('modal', [

      transition('void => *', [
        state('in', style({ transform: 'translateY(0)' })),
        style({ transform: 'translateY(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  passwordForm: FormGroup;
  hide = true;
  hidePassword = true;
  hideConfirmPassword = true;
  showMenu: boolean = false;
  action: string = '';
  subscribers: any[] = [];
  subscriberCount: number = 0;
  constructor(public formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private _profileService: ProfileService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.profileForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('', [Validators.required, Validators.pattern("[1-9]{1}[0-9]{9}")]),
      gender: new FormControl('', [Validators.required])
    });
    this.passwordForm = this.formBuilder.group({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^\S*$/)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^\S*$/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^\S*$/)]),
    }, { validator: this.passwordConfirming })
    this.profileForm.get('password').disable();
    this.profileForm.get('email').disable();
  }
  passwordConfirming(c: AbstractControl): { invalid: boolean | number } {
    let i = 0;
    if (c.get('oldPassword').value == c.get('newPassword').value) {
      ++i;
    }
    if (c.get('newPassword').value != c.get('confirmPassword').value) {
      i = i + 2
    }
    return { invalid: i == 0 ? false : i };
  }
  saveEditedProfile() {
    let data = {
      name:this.profileForm.get('name').value,
      phoneNo:this.profileForm.get('phoneNo').value,
      gender:this.profileForm.get('gender').value
    };
    this._profileService.updateProfile(data).subscribe(
      response => {
        let storage = JSON.parse(localStorage.getItem('userDetail'));
        storage = { ...storage, ...data };
        localStorage.setItem('userDetail', JSON.stringify(storage));
        this._profileService.showAlert(COMMON_MESSAGES.UPDATED('Profile'));
        this._profileService.updateDetail(storage);
        this.router.navigate(['/user/profile/view']);
      }
    )
  }
  cancelEditing() {
    this.router.navigate(['/profile/view']);
  }

  savePasswordChange() {
    console.log(this.passwordForm.value)
    let data = {
      oldPassword:this.passwordForm.value['oldPassword'],
      newPassword:this.passwordForm.value['newPassword']
    };
    this._profileService.updateProfile(data).subscribe(
      response => {
        this._profileService.showAlert(COMMON_MESSAGES.UPDATED('Password'));
        this.router.navigate(['/user/profile/view']);
      }
    )
  }
  cancelPasswordChange() {
    this.showMenu = false;
    this.passwordForm.reset();
    this.hide = this.hidePassword = this.hideConfirmPassword = true;
  }
  ngOnInit() {
    this.action = this.route.snapshot.params.action;
    this.getProfileDetail();
  }
  getProfileDetail() {
    this._profileService.getProfileDetail().subscribe(
      response => {
        console.log(response);
        let data = response.data;
        let formData = {
          email: data.email,
          password: '********',
          name: data.name,
          phoneNo: data.phoneNo,
          gender: data.gender
        };
        this.profileForm.patchValue(formData);
      }
    )
  }

}
