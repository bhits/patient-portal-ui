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
        vm.canActivate = canActivate;
        vm.username = accountService.getUserName();

        function prepareActivation() {
            return {
                emailToken: accountService.getVerifyInfo().emailToken,
                verificationCode: accountService.getVerifyInfo().verificationCode,
                birthDate: accountService.getVerifyInfo().birthDate,
                password: vm.patient.password,
                confirmPassword: vm.patient.confirmPassword,
                username: vm.username
            };
        }

        function activateSuccess(response) {
            utilityService.redirectTo(accountConfig.activationSuccessPath);
            accountService.setPatientName(response);
        }

        function activateError(response) {
            vm.activateError = true;
        }

        function activate() {
            var patientInfo = prepareActivation();
            accountService.activatePatient(patientInfo, activateSuccess, activateError);
        }

        function canActivate(createPasswordForm) {
            return (createPasswordForm.$dirty && createPasswordForm.$valid);
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