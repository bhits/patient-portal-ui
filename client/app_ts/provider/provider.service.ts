
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';


import {Provider} from "./provider";

@Injectable()
export class ProviderService {
    private pcm_url = "/pcm/patients/providers";

    constructor(private http: Http) {
    }

    addProviders(params:string[]): Observable<Response> {
        //TODO get configuratoin dynamically
        return this.http.post(this.pcm_url, JSON.stringify({npiList:params}));
    }

    getNPIs(providers: Provider[]): string[]{
        let npis = [];
        if(providers){
           providers.forEach((provider) => npis.push(provider.npi));
        }
        return npis;
    }
}