
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
                    controller:RevokeConsentController,
                    controllerAs: 'RevokeConsentVm'
                };
                return directive;
            }

            /* @ngInject */
            function RevokeConsentController($stateParams, $state) {
                var RevokeConsentVm = this;
                RevokeConsentVm.params = $stateParams;
                RevokeConsentVm.cancel = cancel;
                RevokeConsentVm.sign = sign;
                RevokeConsentVm.consentId = RevokeConsentVm.params.consent.id;

                activate();

                function activate (){
                    if (angular.isUndefined(RevokeConsentVm.params) || angular.equals(RevokeConsentVm.params.consent, {})) {
                        cancel();
                    }
                }

                function cancel() {
                    $state.go('fe.consent.list');
                }

                function sign() {
                    $state.go('fe.consent.revokesign',{consent: RevokeConsentVm.params.consent});

                }
            }
})();