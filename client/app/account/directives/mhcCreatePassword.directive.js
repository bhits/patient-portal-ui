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
    function CreatePasswordController($state, utilityService, notificationService, accountService, accountConfig) {
        var vm = this;
        var createPasswordFormMaster = {password: "", confirmPassword: ""};

        vm.clearField = clearField;
        vm.activate = activate;
        //todo prepare activate accountObj

        function clearField(createPasswordForm) {
            if (createPasswordForm) {
                createPasswordForm.$setPristine();
                createPasswordForm.$setUntouched();
                vm.account = angular.copy(createPasswordFormMaster);
            }
        }

        function activate() {
            accountService.activatePatient(vm.account, activateSuccess, activateError);
        }

        function activateSuccess(response) {
            notificationService.success("Success in activation.");
            utilityService.redirectTo(accountConfig.activationSuccessPath);
        }

        function activateError(response) {
            notificationService.error("Error in activation.");
            $state.go($state.current, {}, {reload: true});
        }
    }
})();