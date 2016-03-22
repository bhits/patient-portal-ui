/**
 * Created by jiahao.li on 3/17/2016.
 */

(function () {

    'use strict';

    angular
        .module('app.account')
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
            .state('fe.account.activation', {
                url: '/activation',
                data: {pageTitle: 'Activation'},
                controller: 'AccessActivationController',
                controllerAs: 'accessActivationVm',
                resolve: {
                    /* @ngInject */
                    allowVerification: function ($location, $q, emailTokenService, utilityService, accountConfig) {
                        var deferred = $q.defer();
                        var emailTokenStr = $location.hash();
                        var emailToken = emailTokenService.loadEmailToken(emailTokenStr);

                        emailTokenService.isValidEmailToken(emailToken, onAccessSuccess, onAccessError);

                        function onAccessSuccess(response) {
                            emailTokenService.setEmailToken(emailToken);
                            utilityService.redirectTo(accountConfig.verificationPath);
                        }

                        function onAccessError() {
                            utilityService.redirectTo(accountConfig.activationErrorPath);
                        }

                        return deferred.promise;
                    }
                }
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
                templateUrl: "app/account/controllers/activationSuccess.html",
                controllerAs: "activateVm",
                controller: 'ActivateController'
            })
            .state('fe.account.activationError', {
                url: "/activationError",
                data: {pageTitle: 'Activation Error'},
                templateUrl: "app/account/controllers/activationError.html"
            });
    }
})();
