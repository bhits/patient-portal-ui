/**
 * Created by tomson.ngassa on 12/14/2015.
 */


(function () {

    'use strict';

    angular
        .module('app.security')
        .constant('oauthConfig', {
            getAccessTokenUrl: '',
            base64BasicKey: '',
            revokeTokenUrl: '',
            loginPath: '/login',
            loginSuccessPath: '',
            interceptorIgnorePattern: / /,
            loginErrorMessage: '',
            loginFunction: null,
            forgotPasswordURL: null,
            logoutSuccessMessage: '',
            storageType: 'session',
            useRouting: true,
            unsecuredPaths: []
        })
        .config(SecurityConfig);

    /* @ngInject */
    function SecurityConfig($stateProvider, oauthConfig) {

        $stateProvider
            .state('fe.login', {
                url: "/login",
                data: {pageTitle: 'Login'},
                templateUrl: "app/security/securityLogin.html",
                controllerAs: "loginVm",
                controller: 'LoginController'
            });

        oauthConfig.getAccessTokenUrl = 'https://localhost:8443/uaa/oauth/token';

        /*clientSecret*/
        oauthConfig.base64BasicKey = 'cGF0aWVudC1wb3J0YWwtdWk6Y2hhbmdlaXQ=';

        //oauthConfig.revokeTokenUrl = 'http://www.mysite.com/token';
        oauthConfig.loginSuccessPath = '/fe/index/home';
        oauthConfig.interceptorIgnorePattern = /oauth\/token/;
        oauthConfig.loginErrorMessage = 'error_description';
        oauthConfig.logoutSuccessMessage = 'logoutSuccess';
        oauthConfig.storageType = 'session';
        oauthConfig.useRouting = true;
        //oauthConfig.forgotPasswordURL = 'http://localhost/#/forgot-password';
        //oauthConfig.unsecuredPaths.push('/forgot-password');
        //oauthConfig.unsecuredPaths.push('/unsecured');
    }

})();