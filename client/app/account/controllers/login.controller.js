'use strict';

(function () {

    angular
        .module("app.account")
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController(envService, utilityService, accountConfig) {
        var vm = this;
        vm.version = envService.version;
        vm.forgotPassword = forgotPassword;

        function forgotPassword() {
            utilityService.redirectTo(accountConfig.forgotPasswordPath);
        }
    }
})();