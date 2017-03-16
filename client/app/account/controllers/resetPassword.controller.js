'use strict';

(function () {

    angular
        .module("app.account")
        .controller('ResetPasswordController', ResetPasswordController);

    /* @ngInject */
    function ResetPasswordController(configService) {
        var vm = this;
        vm.title = configService.getBrandName() + "_RESET_PASSWORD_COMPLETE";
    }
})();