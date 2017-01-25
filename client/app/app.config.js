(function () {
    'use strict';

    angular.module('app')
        .constant("idleConfigParams", {"idle": 780, "timeout": 120, "keepalive": 240})
        .config(appConfig);

    /* @ngInject */
    function appConfig($urlRouterProvider, $locationProvider, $httpProvider, KeepaliveProvider, IdleProvider, idleConfigParams, brandProvider, $translateProvider, tmhDynamicLocaleProvider) {

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

        // realize i18n for PP-UI : ADD BY Wentao
        //get dynamic local value
        var language = window.localStorage.lang || 'en';
        $translateProvider.preferredLanguage(language);
        tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');

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

        /*$httpProvider.defaults.headers.post['Accept-Language'] = 'es';
        $httpProvider.defaults.headers.get['Accept-Language'] = 'es';*/
        // translating by using language table
        /*$translateProvider.translations ("en", {
            HOME_LINK: "HOME",
            CONSENTS_LINK: "CONSENTS"
        });
        $translateProvider.translations ("zh", {
            HOME_LINK: "首页",
            CONSENTS_LINK: "CONSENTS表"
        });
        $translateProvider.preferredLanguage("zh");
        $translateProvider.fallbackLanguage("en");*/
    }
})();