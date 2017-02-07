import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";


import {CoreModule} from "./core/core.module";
import {ProviderModule} from "./provider/provider.module";

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        CoreModule,
        ProviderModule
    ],
    providers: []
})

export class PPUIModule {
}
