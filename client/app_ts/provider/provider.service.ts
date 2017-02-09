
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {Provider} from "./provider";

@Injectable()
export class ProviderService {

    constructor(public http: Http) {
    }

    addProviders(params): Observable<Response> {

        let plsUrl = "http://localhost/pcm/patients/providers";
        return this.http.post(plsUrl, JSON.stringify({npiList:params}));
    }

    getNPIs(providers: Provider[]): string[]{
        let npis = [];
        if(providers){
           providers.forEach((provider) => npis.push(provider.npi));
        }
        return npis;
    }
}