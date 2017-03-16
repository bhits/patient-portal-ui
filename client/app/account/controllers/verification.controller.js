/**
 * Created by jiahao.li on 3/22/2016.
 */

(function () {
    'use strict';

    angular
        .module("app.account")
        .controller('VerificationController', VerificationController);

    /* @ngInject */
    function VerificationController(allowVerification, configService) {
        var vm = this;
        vm.allowVerification = allowVerification;
        vm.title = configService.getBrandName() + "_ACCOUNT_SETUP_ACTIVATION";

    }
})();