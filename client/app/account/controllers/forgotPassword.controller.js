/**
 * Created by Jiahao.Li on 6/10/2016.
 */

(function () {
    'use strict';

    angular
        .module("app.account")
        .controller('ForgotPasswordController', ForgotPasswordController);

    /* @ngInject */
    function ForgotPasswordController(utilityService, oauthConfig, authenticationService) {
        var vm = this;
        vm.forgotPassword = forgotPassword;
        vm.cancel = cancel;
        vm.canSubmit = canSubmit;

        function prepareInfo() {
            return {
                email: vm.user.email
            };
        }

        function Success(response) {
            utilityService.redirectTo(oauthConfig.loginPath);
        }

        function Error(error) {
            if (error.status === 422) {
                vm.emailPatternError = true;
            }
        }

        function forgotPassword() {
            authenticationService.forgotPassword(prepareInfo(), Success, Error);
        }

        function cancel() {
            utilityService.redirectTo(oauthConfig.loginPath);
        }

        function canSubmit(loginForm) {
            return loginForm.$dirty && loginForm.$valid;
        }
    }
})();