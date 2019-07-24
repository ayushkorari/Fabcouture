import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoaderService } from './loader.service';


@Injectable()
export class HttpService {
    private apiUrl: string;

    constructor(
        private http: HttpClient,
        private _loaderService: LoaderService
    ) {
        this.apiUrl = environment.url;
    }


    getwithurl(url, loader = true): Observable<any> {
        if (loader) {
            this._loaderService.loader.next(loader);
        }
        return this.http.get(this.apiUrl + url)
            .pipe(
                map((res: HttpResponse<any>) => {
                    return res;
                }),
                catchError((error: HttpErrorResponse) => {
                    throw (error);
                })
            );
    }
    getWithQueryParam(url: string, body?: any, loader = true) {
        if (loader) {
            this._loaderService.loader.next(loader);
        }
        let params = '';
        if (body) {
            for (let i = 0; i < body.length; i++) {
                if (i == 0) {
                    params = '?' + body[i].key + '=' + body[i].value;
                } else {
                    params += '&' + body[i].key + '=' + body[i].value;
                }
            }
        }
        return this.http.get(this.apiUrl + url + params)
            .pipe(
                map((res: HttpResponse<any>) => {
                    return res;
                }),
                catchError((error: HttpErrorResponse) => {
                    throw (error);
                })
            );
    }

    post(url, data, loader = true) {
        if (loader) {
            this._loaderService.loader.next(loader);
        }
        let postUrl;
        postUrl = this.apiUrl + url;
        return this.http.post(postUrl, data)
            .pipe(
                map((res: HttpResponse<any>) => {
                    return res;
                }),
                catchError((error: HttpErrorResponse) => {
                    throw (error);
                })
            );
    }

    put(url, data, loader = true) {
        if (loader) {
            this._loaderService.loader.next(loader);
        }
        let postUrl;
        postUrl = this.apiUrl + url;
        return this.http.put(postUrl, data)
            .pipe(
                map((res: HttpResponse<any>) => {
                    return res;
                }),
                catchError((error: HttpErrorResponse) => {
                    throw (error);
                })
            );
    }

    patch(url, data, loader = true) {
        if (loader) {
            this._loaderService.loader.next(loader);
        }
        let postUrl;
        postUrl = this.apiUrl + url;
        return this.http.patch(postUrl, data);
    }

    get(url, data?: any, loader = true): Observable<any> {
        let httpParams = data?{...data}:{};
        if (loader) {
            this._loaderService.loader.next(loader);
        }
        for (let item in httpParams) {
            if (httpParams[item] === '' || httpParams[item] === undefined || httpParams[item] === null || httpParams[item] === []) {
                delete httpParams[item];
            } else if (Array.isArray(httpParams[item])) {
                if (httpParams[item].length === 0) {
                    delete httpParams[item];
                } else {
                    httpParams[item] = JSON.stringify(httpParams[item]);
                }
            }
        }
        const header = {};
        if (httpParams) {
            header['params'] = httpParams;
        }
        const getUrl = this.apiUrl + url;
        return this.http.get(getUrl, header)
            .pipe(
                map((res: HttpResponse<any>) => {
                    return res;
                }),
                catchError((error: HttpErrorResponse) => {
                    throw (error);
                })
            );
    }
    handleError(error) {
        console.error(error);
    }
}
