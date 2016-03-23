/**
 * Created by Jiahao.Li on 3/20/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.account')
        .directive('mhcCreatePassword', mhcCreatePassword);

    function mhcCreatePassword() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/account/directives/createPassword.html',
            scope: {},
            bindToController: {},
            controller: CreatePasswordController,
            controllerAs: 'createPasswordVm'
        };

        return directive;
    }

    /* @ngInject */
    function CreatePasswordController(utilityService, accountService, accountConfig) {
        var vm = this;
        var createPasswordFormMaster = {password: "", confirmPassword: ""};

        vm.clearField = clearField;
        vm.activate = activate;
        vm.username = accountService.getUserName();

        function prepareActivation() {
            var temp = {};
            var patientInfoObject = {
                emailToken: accountService.getVerifyInfo().emailToken,
                verificationCode: accountService.getVerifyInfo().verificationCode,
                birthDate: accountService.getVerifyInfo().birthDate,
                password: vm.patient.password,
                confirmPassword: vm.patient.confirmPassword,
                username: vm.username
            };
            angular.copy(patientInfoObject, temp);
            return temp;
        }

        function activateSuccess(response) {
            utilityService.redirectTo(accountConfig.activationSuccessPath);
        }

        function activateError(response) {
            vm.activateError = true;
            vm.patient = angular.copy(createPasswordFormMaster);
        }

        function activate() {
            var patientInfo = prepareActivation();
            accountService.activatePatient(patientInfo, activateSuccess, activateError);
        }

        function clearField(createPasswordForm) {
            if (createPasswordForm) {
                createPasswordForm.$setPristine();
                createPasswordForm.$setUntouched();
                vm.patient = angular.copy(createPasswordFormMaster);
            }
        }
    }
})();