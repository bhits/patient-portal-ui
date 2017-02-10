
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';


import {Provider} from "./provider";

@Injectable()
export class ProviderService {

    constructor(public http: Http) {
    }

    addProviders(params): Observable<Response> {
        //TODO get configuratoin dynamically
        return this.http.post("/pcm/patients/providers", JSON.stringify({npiList:params}));
    }

    getNPIs(providers: Provider[]): string[]{
        let npis = [];
        if(providers){
           providers.forEach((provider) => npis.push(provider.npi));
        }
        return npis;
    }
}