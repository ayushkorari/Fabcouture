import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { UtilityService } from '../modules/shared/services/utility.service';
import { LoaderService } from '../modules/shared/services/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
   private router:Router,
   private _utilityService:UtilityService,
   private _loaderService:LoaderService   
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let headers = {
      'Content-Type': 'application/json'
    };
    const userDetail = this._utilityService.getLocalStorage();
    console.log(userDetail)
    if(userDetail) {
      headers['authorization'] = 'bearer ' + userDetail.accessToken;
    }
    request = request.clone({
      setHeaders: headers
    });
    return next.handle(request).pipe(
      tap(
      (data) =>{
        if(data instanceof HttpResponse) {
          this._loaderService.loader.next(false);
          console.log(data);
        }
        
      },
      (err: any) => {
        this._loaderService.loader.next(false);
        console.log(err)
        if (err instanceof HttpErrorResponse) {
          
          console.log(err.error.responseType);
          console.log('req url :: ' + request.url);
          this._utilityService.errorAlert(err);
          if (err.status === 401||err.error.responseType=='UNAUTHORIZED') {
            this._utilityService.clearStorage();
            this.router.navigate(['']);
          }
        }
      }
    ));
  }
}