/**
 * Created by Jiahao.Li on 3/18/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.account')
        .directive('c2sAccountVerification', c2sAccountVerification);

    function c2sAccountVerification() {

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
        var original = vm.verifyInfo;
        vm.clearField = clearField;
        vm.verify = verify;
        vm.canVerify = canVerify;
        vm.checkDateField = checkDateField;

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

        function checkDateField(birthdate) {
            vm.fillOutDate = !birthdate.$valid;
        }

        function clearField(verificationForm) {
            verificationForm.$setPristine();
            verificationForm.$setUntouched();
            vm.verifyInfo = angular.copy(original);
            vm.verifyError = false;
        }
    }
})();