
import { Injectable } from '@angular/core';
import {ConnectionBackend, Headers, Http, Request, Response, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpInterceptor extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(url, options);
    }

    post(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(url, options, this.setHeaders());
    }

    private setHeaders():RequestOptions {
        let tokenKey = 'ngStorage-token';
        let token = sessionStorage.getItem(tokenKey);
        if(token){
            let access_token =  (JSON.parse(token))['access_token'];
            let headers = new Headers({'Authorization': 'Bearer ' + access_token, 'Content-Type': 'application/json'} );
            return new RequestOptions({ headers: headers });
        }
        return null;
    }
}