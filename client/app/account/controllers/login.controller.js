'use strict';

(function () {

    angular
        .module("app.account")
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController(envService, utilityService, accountConfig, brand) {
        var vm = this;
        vm.version = envService.version;
        vm.forgotPassword = forgotPassword;
        vm.brandName = brand.getBrandName();
        vm.altLogoText = brand.getBrandInitials() + " Logo";

        function forgotPassword() {
            utilityService.redirectTo(accountConfig.forgotPasswordPath);
        }
    }
})();