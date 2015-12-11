
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('ppConsentRevoke', ppConsentRevoke);

            function ppConsentRevoke() {
                var directive = {
                    restrict: 'E',
                    scope: {},
                    templateUrl: 'app/consent/directives/consentRevokeConfirmation.html',
                    controller:ConsentRevokeController,
                    controllerAs: 'Vm'
                };
                return directive;
            }

            /* @ngInject */
            function ConsentRevokeController($stateParams, $state) {
                var Vm = this;
                Vm.cancel = cancel;
                Vm.consentId = Vm.params.consent.id;
                Vm.params = $stateParams;
                Vm.sign = sign;

                activate();

                function activate (){
                    if (angular.isUndefined(Vm.params) || angular.equals(Vm.params.consent, {})) {
                        cancel();
                    }
                }

                function cancel() {
                    $state.go('fe.consent.list');
                }

                function sign() {
                    $state.go('fe.consent.revokesign',{consent: Vm.params.consent});

                }
            }
})();