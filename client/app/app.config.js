(function () {
    'use strict';

    angular.module('app')
        .constant("idleConfigParams", {"idle": 780, "timeout": 120, "keepalive": 240})
        .config(appConfig);

    /* @ngInject */
    function appConfig($urlRouterProvider, $locationProvider, $httpProvider, KeepaliveProvider, IdleProvider, idleConfigParams, $translateProvider, tmhDynamicLocaleProvider) {

        // enable html5 mode
        $locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise("/fe/login");

        $httpProvider.interceptors.push('authInterceptorService');

        // Configure Idle settings
        IdleProvider.idle(idleConfigParams.idle);
        IdleProvider.timeout(idleConfigParams.timeout);
        KeepaliveProvider.interval(idleConfigParams.keepalive);

        // realize i18n for PP-UI : ADD BY Wentao
        //get dynamic local value
        var language = window.localStorage.lang || 'en';
        $translateProvider.preferredLanguage(language);
        $translateProvider.useSanitizeValueStrategy('escape');
        tmhDynamicLocaleProvider.localeLocationPattern('node_modules/angular-i18n/angular-locale_{{locale}}.js');

        /* get dynamic local value - solution 2
         var language = window.localStorage.lang || 'en';
        $translateProvider.preferredLanguage(language);*/

        $translateProvider.registerAvailableLanguageKeys(['en', 'zh', 'es'], {
            'en-*': 'en',
            'zh-*': 'zh',
            'es-*': 'es'
        });

        $translateProvider.useStaticFilesLoader({
            prefix: 'app/languagesLib/',
            suffix: '.json'
        });

    }
})();