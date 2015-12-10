
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
                    controllerAs: 'ConsenRevokeVm'
                };
                return directive;
            }

            /* @ngInject */
            function ConsentRevokeController($stateParams, $state) {
                var ConsenRevokeVm = this;
                ConsenRevokeVm.params = $stateParams;
                ConsenRevokeVm.cancel = cancel;
                ConsenRevokeVm.sign = sign;
                ConsenRevokeVm.consentId = ConsenRevokeVm.params.consent.id;

                activate();

                function activate (){
                    if (angular.isUndefined(ConsenRevokeVm.params) || angular.equals(ConsenRevokeVm.params.consent, {})) {
                        cancel();
                    }
                }

                function cancel() {
                    $state.go('fe.consent.list');
                }

                function sign() {
                    $state.go('fe.consent.revokesign',{consent: ConsenRevokeVm.params.consent});

                }
            }
})();