'use strict';

(function () {

    angular
        .module("app.account")
        .controller('ResetPasswordController', ResetPasswordController);

    /* @ngInject */
    function ResetPasswordController(brand) {
        var vm = this;
        vm.title = brand.getBrandName() + " Reset Password Complete";

    }
})();