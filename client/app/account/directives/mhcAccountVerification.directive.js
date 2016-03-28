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
    function VerificationController(utilityService, accountService, emailTokenService, accountConfig) {
        var vm = this;
        var verificationFormMaster = {verificationCode: ""};

        vm.clearField = clearField;
        vm.verify = verify;
        vm.canVerify = canVerify;

        function prepareVerification() {
            var birthday = formatBirthday(vm.verifyInfo.birthdate);
            return {
                emailToken: emailTokenService.getEmailToken(),
                verificationCode: vm.verifyInfo.verificationCode,
                birthDate: birthday
            };
        }

        function formatBirthday(dateObj) {
            var year = dateObj.getFullYear();
            var month = utilityService.digitFormat((dateObj.getMonth() + 1), 2);
            var day = utilityService.digitFormat(dateObj.getDate(), 2);
            return year + '-' + month + '-' + day;
        }

        function verifySuccess(response) {
            var verifyInfo = prepareVerification();
            accountService.setVerifyInfo(verifyInfo);
            accountService.setUserName(response.username);
            utilityService.redirectTo(accountConfig.createPasswordPath);
        }

        function verifyError(response) {
            var emailTokenException = response.data.exception;
            if (emailTokenException.indexOf('EmailTokenExpiredException') !== -1) {
                utilityService.redirectTo(accountConfig.activationErrorPath);
            }
            vm.verifyError = true;
        }

        function verify() {
            var verifyInfo = prepareVerification();
            accountService.verifyPatient(verifyInfo, verifySuccess, verifyError);
        }

        function canVerify(verificationForm) {
            return (verificationForm.$dirty && verificationForm.$valid);
        }

        function clearField(verificationForm) {
            if (verificationForm) {
                verificationForm.$setPristine();
                verificationForm.$setUntouched();
                vm.verifyInfo = angular.copy(verificationFormMaster);
            }
        }
    }
})();