import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";

import {ShareModule} from "./shared/share.module";
import {CoreModule} from "./core/core.module";
import {ProviderModule} from "./provider/provider.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ShareModule,
        CoreModule,
        ProviderModule
    ],
    providers: []
})

export class PPUIModule {
}
