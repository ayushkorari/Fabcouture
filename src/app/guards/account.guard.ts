import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment,
   CanLoad, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { USER_URL } from '../constant/urls';
import { POPUP_MESSAGES } from '../constant/messages';
import { UtilityService } from '../modules/shared/services/utility.service';
import { HttpService } from '../modules/shared/services/http.service';

@Injectable()
export class AccountGuard implements CanActivate, CanLoad {
  constructor(
    private _router: Router,
    private _utilityService: UtilityService,
    private _route: ActivatedRoute,
    private _http: HttpService
  ) {

  }
  navigate() {
    this._router.navigate(['']);
    return false;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!localStorage.getItem('userDetail')) {
          return true;
      }
  
      return this.navigate();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!localStorage.getItem('userDetail')) {
        return true;
    }
    return this.navigate();
   
  }
}
