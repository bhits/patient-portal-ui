
(function () {

    'use strict';

    angular
        .module('app.consent')
            .directive('ppConsentRevoke', ppConsentRevoke);

            function ppConsentRevoke() {
                var directive = {
                    restrict: 'E',
                    templateUrl: 'app/consent/directives/consentRevokeConfirmation.html',
                    controller:ConsentRevokeController,
                    controllerAs: 'consentRevokeVm'
                };
                return directive;
            }

            /* @ngInject */
            function ConsentRevokeController($stateParams, $state) {
                var vm = this;
                vm.cancel = cancel;
                vm.params = $stateParams;
                vm.consentId = vm.params.consent.id;
                vm.sign = sign;

                activate();

                function activate (){
                    if (angular.isUndefined(vm.params) || angular.equals(vm.params.consent, {})) {
                        cancel();
                    }
                }

                function cancel() {
                    $state.go('fe.consent.list');
                }

                function sign() {
                    $state.go('fe.consent.revokesign',{consent: vm.params.consent});

                }
            }
})();