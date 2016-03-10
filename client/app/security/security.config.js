(function () {

    'use strict';

    angular
        .module('app.security')
        .constant('oauthConfig', {
            loginPath: '/fe/login',
            loginSuccessPath: '/fe/index/home'
        })
        .config(SecurityConfig);

    /* @ngInject */
    function SecurityConfig($stateProvider) {

        $stateProvider
            .state('fe.login', {
                url: "/login",
                data: {pageTitle: 'Login'},
                templateUrl: "app/security/securityLogin.html",
                controllerAs: "loginVm",
                controller: 'LoginController'
            });
    }
})();