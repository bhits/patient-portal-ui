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
        vm.brandLargeLogo = specifyImageType(configService.getBrandLargeLogo());
        vm.altLogoText = configService.getBrandInitials() + " Logo";

        function forgotPassword() {
            utilityService.redirectTo(accountConfig.forgotPasswordPath);
        }

        function specifyImageType(base64Image) {
            return "data:image/png;base64," + base64Image;
        }
    }
})();