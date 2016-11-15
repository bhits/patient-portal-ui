'use strict';

(function () {

    angular
        .module("app.account")
        .controller('ResetPasswordController', ResetPasswordController);

    /* @ngInject */
    function ResetPasswordController(configService) {
        var vm = this;
        vm.title = configService.getBrandName() + " Reset Password Complete";
    }
})();