/**
 * Created by Jiahao.Li on 3/20/2016.
 */

(function () {
    'use strict';

    angular
        .module("app.account")
        .controller('ActivateErrorController', ActivateErrorController);

    /* @ngInject */
    function ActivateErrorController(configService) {
        var vm = this;
        vm.title = configService.getBrandName() + " Account Activation - Invalid";
        vm.brandName = configService.getBrandName();
        vm.brandInitial = configService.getBrandInitials();
    }
})();