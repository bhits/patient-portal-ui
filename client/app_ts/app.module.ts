import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {Http, XHRBackend, RequestOptions} from "@angular/http";

import {CoreModule} from "./core/core.module";
import {ProviderModule} from "./provider/provider.module";
import {HttpInterceptor} from "./core/http-interceptor.service";

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        CoreModule,
        ProviderModule
    ],
    providers: [
        {
            provide: Http,
            useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => new HttpInterceptor(backend, defaultOptions),
            deps: [ XHRBackend, RequestOptions ]
        }
    ]
})

export class PPUIModule {
}
