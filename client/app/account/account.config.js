/**
 * Created by jiahao.li on 3/17/2016.
 */

(function () {

    'use strict';

    angular
        .module('app.account')
        .constant('accountConfig', {
            verificationPath: '/fe/account/verification',
            createPasswordPath: '/fe/account/createPassword',
            activationSuccessPath: '/fe/account/activationSuccess'
        })
        .config(AccountConfig);

    /* @ngInject */
    function AccountConfig($stateProvider) {

        $stateProvider
            .state('fe.login', {
                url: "/login",
                data: {pageTitle: 'Login'},
                templateUrl: "app/account/controllers/securityLogin.html",
                controllerAs: "loginVm",
                controller: 'LoginController'
            })
            .state('fe.account', {
                abstract: true,
                url: '/account',
                data: {pageTitle: 'Account'},
                templateUrl: ''
            })
            .state('fe.account.verification', {
                url: '/verification',
                data: {pageTitle: 'Account Verification'},
                templateUrl: 'app/account/controllers/userAccountVerification.html'
            })
            .state('fe.account.createPassword', {
                url: "/createPassword",
                data: {pageTitle: 'Create Password'},
                templateUrl: "app/account/controllers/createPassword.html"
            })
            .state('fe.account.activationSuccess', {
                url: "/activationSuccess",
                data: {pageTitle: 'Account Success'},
                templateUrl: "app/account/controllers/activationSuccess.html"
            });
    }
})();
