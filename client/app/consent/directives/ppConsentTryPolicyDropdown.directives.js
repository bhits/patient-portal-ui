
(function () {

    'use strict';

    angular
        .module('app.consent')
            .directive('ppConsentTryPolicyDropdown', ppConsentTryPolicyDropdown);

            function ppConsentTryPolicyDropdown() {

                var directive = {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/consent/directives/consentTryPolicyDropdown.html',
                    scope: {},
                    bindToController: {
                        documentid: '=',
                        shareforpurposeofuse:'=',
                        option:'=',
                        purposeofusecode:'=',
                        medicaldocuments:'='
                    },
                    controllerAs: 'tryPolicyDropdownVm',
                    controller: TryPolicyDropdownVmController
                };

                return directive;

                function TryPolicyDropdownVmController(){
                    var vm = this;
                    vm.daterange = vm.ngModel;
                }
            }
})();