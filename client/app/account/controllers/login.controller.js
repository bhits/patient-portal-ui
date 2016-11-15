'use strict';

(function () {

    angular
        .module("app.account")
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController(envService, utilityService, accountConfig, configService) {
        var vm = this;
        vm.version = envService.version;
        vm.forgotPassword = forgotPassword;
        vm.brandName = configService.getBrandName();
        vm.brandLargeLogo = configService.getBrandLargeLogo();
        vm.altLogoText = configService.getBrandInitials() + " Logo";

        function forgotPassword() {
            utilityService.redirectTo(accountConfig.forgotPasswordPath);
        }
    }
})();