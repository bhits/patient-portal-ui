/**
 * Created by tomson.ngassa on 12/16/2015.
 */

'use strict';

(function () {

    angular
        .module('app')
        .config(appConfig);

        /* @ngInject */
        function appConfig($urlRouterProvider, $locationProvider, $httpProvider, KeepaliveProvider, IdleProvider, idleConfigParams) {

            // enable html5 mode
            $locationProvider.html5Mode(true).hashPrefix('!');

            $urlRouterProvider.otherwise("/fe/login");

            $httpProvider.interceptors.push('AuthInterceptorService');

            // Configure Idle settingss
            IdleProvider.idle(idleConfigParams.idle); // in seconds
            IdleProvider.timeout(idleConfigParams.timeout); // in seconds
            KeepaliveProvider.interval(idleConfigParams.keepalive); // in seconds
        }

})();