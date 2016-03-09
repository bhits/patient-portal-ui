(function () {

    'use strict';

    angular
        .module('app.security')
        .constant('oauthConfig', {
            base64BasicKey: '',
            getAccessTokenUrl: '',
            getUserInfo: '',
            revokeTokenUrl: '',
            loginPath: '',
            loginSuccessPath: '',
            interceptorIgnorePattern: / /,
            loginErrorMessage: ''
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

        /*clientSecret*/
        oauthConfig.base64BasicKey = 'cGF0aWVudC1wb3J0YWwtdWk6Y2hhbmdlaXQ=';

        oauthConfig.getAccessTokenUrl = 'https://localhost:8443/uaa/oauth/token';
        oauthConfig.getUserInfo = 'https://localhost:8443/uaa/userinfo';
        //oauthConfig.revokeTokenUrl = 'http://www.mysite.com/token';
        oauthConfig.loginPath = '/fe/login';
        oauthConfig.loginSuccessPath = '/fe/index/home';
        oauthConfig.interceptorIgnorePattern = /oauth\/token/;
        oauthConfig.loginErrorMessage = 'Wrong username or password';
    }
})();