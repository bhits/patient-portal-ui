
'use strict';

(function () {

    angular
        .module('app.consent')
             .directive('ppConsentPurposeOfUse', ppConsentPurposeOfUse);

            /* @ngInject */
            function ppConsentPurposeOfUse(consentService, $modal) {
                var directive =  {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/consent/directives/consentPurposeOfUse.html',
                    scope: {
                        ngModel: "=",
                        purposeofuse: "="
                    },
                    bindToController: true,
                    controllerAs: 'consentPurposeOfUseVm',
                    controller: ConsentPurposeOfUseController
                };

                return directive;
            }

            /* @ngInject */
            function ConsentPurposeOfUseController($scope, $modal, consentService, notificationService) {
                var Vm = this;
                //Getting default purpose of use code.
                Vm.selectedPurposeOfUse = consentService.getDefaultPurposeOfUse(Vm.purposeofuse, Vm.ngModel);

                Vm.openSelectPurposeModal = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/directives/consentPurposeOfUseModal.html',
                        resolve: {
                            data: function () {
                                return Vm.purposeofuse;
                            }
                        },
                        controller: PurposeOfUseModalController
                    });
                };

                /* @ngInject */
                function PurposeOfUseModalController($scope, $modalInstance, data) {
                    $scope.cancel = cancel;
                    $scope.consent = {selectedPurposeOfUseCodes: consentService.getCodes(Vm.selectedPurposeOfUse)};
                    $scope.data = data;
                    $scope.deselectAll = deselectAll;
                    $scope.ok = ok;
                    $scope.selectAll = selectAll;

                    function cancel() {
                        $modalInstance.dismiss('cancel');
                    }

                    function selectAll() {
                        $scope.consent.selectedPurposeOfUseCodes = consentService.getCodes($scope.data);
                        //TODO: This should be refactored to avoid directly referencing the 'purposeOfUseModalObj' name, which is declared in the HTML markup but not in this directive.
                        $scope.purposeOfUseModalObj.$setDirty();
                    }

                    function deselectAll() {
                        $scope.consent.selectedPurposeOfUseCodes = [];
                        //TODO: This should be refactored to avoid directly referencing the 'purposeOfUseModalObj' name, which is declared in the HTML markup but not in this directive.
                        $scope.purposeOfUseModalObj.$setDirty();
                    }

                    function ok() {
                        Vm.selectedPurposeOfUse = consentService.getEntitiesByCodes($scope.data, $scope.consent.selectedPurposeOfUseCodes);
                        Vm.ngModel = $scope.consent.selectedPurposeOfUseCodes;
                        $modalInstance.close();
                    }
                }
            }
})();