import {
    NgModule,
    forwardRef,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    FormsModule,
} from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";
import {UpgradeAdapter} from '@angular/upgrade';
import {HttpModule} from "@angular/http";

declare var angular: any;
import {LogoutComponent} from './components/logout.component';

// This allows both Angular 1 & Angular 2 code to be used together in the same application;
// it'll be removed once all remaining Angular 1 code has been replaced with Angular 2.
const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(
    forwardRef(() => PPUIModule));

angular.module('configInitial')
    .directive('c2sLogout',
        upgradeAdapter.downgradeNg2Component(LogoutComponent));

@NgModule({
    declarations: [LogoutComponent],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: []
})
class PPUIModule {
}

/*
 * Bootstrap the App
 */
upgradeAdapter.bootstrap(document.body, ['configInitial']);