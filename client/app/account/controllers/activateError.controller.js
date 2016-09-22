/**
 * Created by Jiahao.Li on 3/20/2016.
 */

(function () {
    'use strict';

    angular
        .module("app.account")
            .controller('ActivateErrorController', ActivateErrorController);

    /* @ngInject */
    function ActivateErrorController(brand) {
        var vm = this;
        vm.title = brand.getBrandName() + " Account Activation - Invalid";
        vm.brandName = brand.getBrandName();
        vm.brandInitial = brand.getBrandInitials();
    }
})();