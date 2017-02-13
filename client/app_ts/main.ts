import {forwardRef} from '@angular/core';
import {UpgradeAdapter} from '@angular/upgrade';

import {PPUIModule} from './app.module';
import {LogoutComponent} from "./core/logout.component";
import {ProviderMultiAddingComponent} from "./provider/provider-multi-adding.component";

declare var angular: any;

const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(forwardRef(() => PPUIModule));

// Downgrade component(s) from Angular 2 to Angular 1

angular.module('configInitialization')
    .directive('c2sLogout', upgradeAdapter.downgradeNg2Component(LogoutComponent));

angular.module('app.provider')
    .directive('c2sProviderMultiAdding', upgradeAdapter.downgradeNg2Component(ProviderMultiAddingComponent));


// Upgrade component(s) from Angular 1 to Angular 2

/*
 * Bootstrap the App
 */
upgradeAdapter.bootstrap(document.body, ['configInitialization']);