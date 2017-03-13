/**
 * Created by Jiahao.Li on 3/20/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.account')
        .directive('c2sCreatePassword', c2sCreatePassword);

    function c2sCreatePassword() {

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
    function CreatePasswordController(utilityService, accountService, accountConfig, $translate) {
        var vm = this;
        var original = vm.patient;
        vm.clearField = clearField;
        vm.activate = activate;
        vm.canActivate = canActivate;
        vm.username = accountService.getUserName();

        function activate() {
            var patientInfo = prepareActivation();
            accountService.activatePatient(patientInfo, activateSuccess, activateError);
        }

        //TODO popover data should come from the backend
        var language = window.localStorage.lang || 'en';
        $translate.use(language);
        if (language.substring(0,2) === 'en') {
            vm.popoverData = {
                title: "Password Instructions",
                items: [
                    "8 characters in length",
                    "one number",
                    "one upper case letter (A, B, C)",
                    "one lower case letter (a, b, c)",
                    "one special character (e.g. #, *, @)"
                ]
            };
        } else if (language.substring(0,2) === 'es') {
            vm.popoverData = {
                title: "Instrucciones para crear la Contraseña",
                items: [
                    "8 caracteres de longitud",
                    "un numero",
                    "una letra mayúscula (A, B, C)",
                    "una letra minúscula (a, b, c)",
                    "un carácter especial (por ejemplo, #, *, @)"
                ]
            };
        }


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
            var emailTokenException = response.data.exception;
            if (emailTokenException.indexOf('EmailTokenExpiredException') !== -1) {
                utilityService.redirectTo(accountConfig.activationErrorPath);
            }
            vm.activateError = true;
        }

        function canActivate(createPasswordForm) {
            return (createPasswordForm.$dirty && createPasswordForm.$valid);
        }

        function clearField(createPasswordForm) {
            if (createPasswordForm) {
                createPasswordForm.$setPristine();
                createPasswordForm.$setUntouched();
                vm.patient = angular.copy(original);
            }
        }
    }
})();