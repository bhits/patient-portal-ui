(function () {
    'use strict';

    angular.module('app')
        .constant("idleConfigParams", {"idle": 780, "timeout": 120, "keepalive": 240})
        .config(appConfig);

    /* @ngInject */
    function appConfig($urlRouterProvider, $locationProvider, $httpProvider, KeepaliveProvider, IdleProvider, idleConfigParams, brandProvider) {

        //Set Brand Name
        brandProvider.setBrandName("Consent2Share");
        brandProvider.setBrandInitial("C2S");

        // enable html5 mode
        $locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise("/fe/login");

        $httpProvider.interceptors.push('authInterceptorService');

        // Configure Idle settings
        IdleProvider.idle(idleConfigParams.idle);
        IdleProvider.timeout(idleConfigParams.timeout);
        KeepaliveProvider.interval(idleConfigParams.keepalive);
    }
})();