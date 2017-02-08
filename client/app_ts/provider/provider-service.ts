
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {Provider} from "./Provider";

@Injectable()
export class ProviderService {

    constructor(public http: Http) {

    }

    addProviders(params): Observable<Response> {

        let plsUrl = "http://localhost/pcm/patients/providers";

        let headers = new Headers({ 'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiIxNjdiZDk0OWI5MDU0OWZhYTg3NDFjZWM3ZjE2ZTk2NSIsInN1YiI6IjNmZTc3Nzc2LTYxNGQtNGIwZC04YTQ3LThlMjQ2YmQzNTA4YyIsInNjb3BlIjpbInBjbS5jb25zZW50X3Jldm9rZSIsInBjbS5hY3Rpdml0eV9yZWFkIiwidHJ5UG9saWN5LmNsaW5pY2FsRG9jdW1lbnRfcmVhZCIsInBoci5oaWVfd3JpdGUiLCJwY20ucHJvdmlkZXJfcmVhZCIsInBjbS5jbGluaWNhbERvY3VtZW50X3JlYWQiLCJwcFVJLmFjY2VzcyIsInBjbS5jb25zZW50X3JlYWQiLCJwY20uY29uc2VudF9zaWduIiwicGNtLmNvbnNlbnRfY3JlYXRlIiwicGNtLmNsaW5pY2FsRG9jdW1lbnRfY3JlYXRlIiwicGhyLnBhdGllbnRfcmVhZCIsIm9wZW5pZCIsInBjbS5wcm92aWRlcl9kZWxldGUiLCJwY20uY29uc2VudF91cGRhdGUiLCJwbHMucmVhZCIsInBjbS5jbGluaWNhbERvY3VtZW50X2RlbGV0ZSIsInBjbS5jb25zZW50X2RlbGV0ZSIsInBoci5oaWVfcmVhZCIsInBjbS5wcm92aWRlcl9jcmVhdGUiXSwiY2xpZW50X2lkIjoicGF0aWVudC1wb3J0YWwtdWkiLCJjaWQiOiJwYXRpZW50LXBvcnRhbC11aSIsImF6cCI6InBhdGllbnQtcG9ydGFsLXVpIiwiZ3JhbnRfdHlwZSI6InBhc3N3b3JkIiwidXNlcl9pZCI6IjNmZTc3Nzc2LTYxNGQtNGIwZC04YTQ3LThlMjQ2YmQzNTA4YyIsIm9yaWdpbiI6InVhYSIsInVzZXJfbmFtZSI6InRtbmdhc3NhQG1haWxpbmF0b3IuY29tIiwiZW1haWwiOiJ0bW5nYXNzYUBtYWlsaW5hdG9yLmNvbSIsImF1dGhfdGltZSI6MTQ4NjU2MTA0NiwicmV2X3NpZyI6IjU3MzI1YWU5IiwiaWF0IjoxNDg2NTYxMDQ2LCJleHAiOjE0ODY2MDQyNDYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC91YWEvb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsicGF0aWVudC1wb3J0YWwtdWkiLCJwY20iLCJ0cnlQb2xpY3kiLCJwaHIiLCJwcFVJIiwib3BlbmlkIiwicGxzIl19.fryHtIYR3O0aohDUgx3Bq2SNEW1VeF2u-nKu6V9X9C8XHBXZqfc6c7gpDmnzhktmOgP5Tb37CkXgoZ5zPzsfBl7r1wLCtCfA1Q4IWHX4jbKelTSU9fyx7ubBOFSg7yZvnO245DL-gwatLZUYyd07IBtcHE4BSxncf2nYnb8g1OCxeSlSgUChRkpZaYrVN-0ECCj4pz2-H4YekT6IN1vxvKBghWtkYFGicZMQbACjoyR88eYrA1Job6XQJR3KGpnEEdA8548nD4m3y2yQMRqx1QrXY9kWNFH6_WyZsakqwXr3NsmNoaFwM7uwNoD1YA2IVm8hZWsOZ2uZ7yf5E91M_A'
        });

        let options = new RequestOptions({ headers: headers });

        return this.http.post(plsUrl, JSON.stringify({npiList:params}), options);
    }

    getNPIs(providers: Provider[]): string[]{
        let npis = [];
        if(providers){
           providers.forEach((provider) => npis.push(provider.npi));
        }
        return npis;
    }
}