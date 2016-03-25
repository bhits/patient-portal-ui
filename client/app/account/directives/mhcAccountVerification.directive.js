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
            var birthday = formatBirthday(vm.verifyInfo.birthdayObj);
            return {
                emailToken: emailTokenService.getEmailToken(),
                verificationCode: vm.verifyInfo.verificationCode,
                birthDate: birthday
            };
        }

        function formatBirthday(birthdayObj) {
            var year = birthdayObj.year;
            var month = utilityService.digitFormat(birthdayObj.month, 2);
            var day = utilityService.digitFormat(birthdayObj.day, 2);
            return year + '-' + month + '-' + day;
        }

        function verifySuccess(response) {
            var verifyInfo = prepareVerification();
            accountService.setVerifyInfo(verifyInfo);
            accountService.setUserName(response.username);
            utilityService.redirectTo(accountConfig.createPasswordPath);
        }

        function verifyError(response) {
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