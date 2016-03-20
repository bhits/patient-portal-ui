/**
 * Created by Jiahao.Li on 3/18/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.account')
        .directive('mhcAccountVerification', mhcAccountVerification);

    function mhcAccountVerification() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/account/directives/verification.html',
            scope: {},
            bindToController: {},
            controller: VerificationController,
            controllerAs: 'verificationVm'
        };

        return directive;
    }

    /* @ngInject */
    function VerificationController($state, utilityService, notificationService, accountService, accountConfig) {
        var vm = this;
        var verificationFormMaster = {month: "", day: "", year: "", verificationCode: ""};
        vm.clearField = clearField;
        vm.verify = verify;

        function clearField(verificationForm) {
            if (verificationForm) {
                verificationForm.$setPristine();
                verificationForm.$setUntouched();
                vm.verifyInfo = angular.copy(verificationFormMaster);
            }
        }

        function verify() {
            accountService.verifyPatient(vm.verifyInfo, verifySuccess, verifyError);
        }

        function verifySuccess(response) {
            notificationService.success("Success in verifying.");
            //TODO setVerifyInfo to storage
            accountService.setVerifyInfo(vm.verifyInfo);
            utilityService.redirectTo(accountConfig.createPasswordPath);
        }

        function verifyError(response) {
            notificationService.error("Error in verifying.");
            $state.go($state.current, {}, {reload: true});
        }
    }
})();