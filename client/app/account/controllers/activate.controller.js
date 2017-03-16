/**
 * Created by Jiahao.Li on 3/20/2016.
 */

(function () {
    'use strict';

    angular
        .module("app.account")
        .controller('ActivateController', ActivateController);

    /* @ngInject */
    function ActivateController($state, accountService, configService, $translate) {
        var vm = this;
        vm.activated = activated;
        vm.patientName = accountService.getPatientName();
        vm.title = configService.getBrandName() + " Account Activation Complete";
        vm.brandName = configService.getBrandName();

        if (window.localStorage.lang === null) {
            window.localStorage.lang = navigator.language;
        }
        $translate.use(window.localStorage.lang);

        function activated() {
            accountService.removeActivateInfo();
            $state.go('fe.login');
        }
    }
})();