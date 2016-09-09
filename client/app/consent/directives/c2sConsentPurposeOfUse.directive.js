(function () {
    'use strict';

    angular
        .module('app.consent')
        .directive('c2sConsentPurposeOfUse', c2sConsentPurposeOfUse);

    /* @ngInject */
    function c2sConsentPurposeOfUse() {
        var directive = {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/directives/consentPurposeOfUse.html',
            scope: {},
            bindToController: {
                ngModel: "=",
                purposeofuse: "="
            },
            controllerAs: 'consentPurposeOfUseVm',
            controller: ConsentPurposeOfUseController
        };
        return directive;
    }

    /* @ngInject */
    function ConsentPurposeOfUseController(consentService, $modal) {
        var vm = this;
        //Getting default purpose of use code.
        vm.selectedPurposeOfUse = consentService.getDefaultPurposeOfUse(vm.purposeofuse, vm.ngModel);

        vm.openSelectPurposeModal = function () {
            var modalInstance = $modal.open({
                templateUrl: 'app/consent/directives/consentPurposeOfUseModal.html',
                controller: PurposeOfUseModalController,
                controllerAs: 'purposeOfUseModalVm',
                resolve: {
                    data: function () {
                        return vm.purposeofuse;
                    }
                }
            });
        };

        /* @ngInject */
        function PurposeOfUseModalController($modalInstance, data) {
            var purposeOfUseModalVm = this;
            purposeOfUseModalVm.cancel = cancel;
            purposeOfUseModalVm.consent = {selectedPurposeOfUseCodes: consentService.getCodes(vm.selectedPurposeOfUse)};
            purposeOfUseModalVm.data = data;
            purposeOfUseModalVm.deselectAll = deselectAll;
            purposeOfUseModalVm.ok = ok;
            purposeOfUseModalVm.selectAll = selectAll;

            function cancel() {
                $modalInstance.dismiss('cancel');
            }

            function selectAll(purposeOfUseModalObj) {
                purposeOfUseModalVm.consent.selectedPurposeOfUseCodes = consentService.getCodes(purposeOfUseModalVm.data);
                //TODO: This should be refactored to avoid directly referencing the 'purposeOfUseModalObj' name, which is declared in the HTML markup but not in this directive.
                purposeOfUseModalObj.$setDirty();
            }

            function deselectAll(purposeOfUseModalObj) {
                purposeOfUseModalVm.consent.selectedPurposeOfUseCodes = [];
                //TODO: This should be refactored to avoid directly referencing the 'purposeOfUseModalObj' name, which is declared in the HTML markup but not in this directive.
                purposeOfUseModalObj.$setDirty();
            }

            function ok() {
                vm.selectedPurposeOfUse = consentService.getEntitiesByCodes(purposeOfUseModalVm.data, purposeOfUseModalVm.consent.selectedPurposeOfUseCodes);
                vm.ngModel = purposeOfUseModalVm.consent.selectedPurposeOfUseCodes;
                $modalInstance.close();
            }
        }
    }
})();