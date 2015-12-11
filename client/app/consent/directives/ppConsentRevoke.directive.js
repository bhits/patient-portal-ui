
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('ppConsentRevoke', ppConsentRevoke);

            function ppConsentRevoke() {
                var directive = {
                    restrict: 'E',
                    scope: {},
                    templateUrl: 'app/consent/directives/consentRevokeConfirmation.tpl.html',
                    controller:ConsentRevokeController,
                    controllerAs: 'Vm'
                };
                return directive;
            }

            /* @ngInject */
            function ConsentRevokeController($stateParams, $state) {
                var Vm = this;
                Vm.params = $stateParams;
                Vm.cancel = cancel;
                Vm.sign = sign;
                Vm.consentId = Vm.params.consent.id;

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