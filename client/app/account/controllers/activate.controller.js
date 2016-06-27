/**
 * Created by Jiahao.Li on 3/20/2016.
 */

(function () {
    'use strict';

    angular
        .module("app.account")
        .controller('ActivateController', ActivateController);

    /* @ngInject */
    function ActivateController($state, accountService, brand) {
        var vm = this;
        vm.activated = activated;
        vm.patientName = accountService.getPatientName();
        vm.title = brand.getBrandName() + " Account Activation Complete";

        function activated() {
            accountService.removeActivateInfo();
            $state.go('fe.login');
        }
    }
})();