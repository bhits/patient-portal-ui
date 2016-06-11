/**
 * Created by Jiahao.Li on 6/10/2016.
 */

(function () {
    'use strict';

    angular
        .module("app.account")
        .controller('ForgotPasswordController', ForgotPasswordController);

    /* @ngInject */
    function ForgotPasswordController($state, authenticationService) {
        var vm = this;
        vm.forgotPassword = forgotPassword;
        vm.cancel = cancel;
        vm.canSubmit = canSubmit;

        function prepareInfo() {
            return {
                username: vm.user.email
            };
        }

        function manipulateSuccess(response) {
        }

        function manipulateError(error) {
        }

        function forgotPassword() {
            authenticationService.forgotPassword(prepareInfo(), manipulateSuccess, manipulateError);
        }

        function cancel() {
            $state.go("fe.login");
        }

        function canSubmit(loginForm) {
            return loginForm.$dirty && loginForm.$valid;
        }
    }
})();