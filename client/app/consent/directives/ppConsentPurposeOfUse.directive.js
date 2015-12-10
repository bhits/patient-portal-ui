
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
                    templateUrl: 'app/consent/directives/consentPurposeOfUse.tpl.html',
                    scope: {
                        ngModel: "=",
                        purposeofuse: "="
                    },
                    bindToController: true,
                    controllerAs: 'ConsentPurposeOfUseVm',
                    controller: ConsentPurposeOfUseController
                };

                return directive;
            }

            /* @ngInject */
            function ConsentPurposeOfUseController($scope, $modal, consentService, notificationService) {
                var ConsentPurposeOfUseVm = this;
                //Getting default purpose of use code.
                ConsentPurposeOfUseVm.selectedPurposeOfUse = consentService.getDefaultPurposeOfUse(ConsentPurposeOfUseVm.purposeofuse, ConsentPurposeOfUseVm.ngModel);

                ConsentPurposeOfUseVm.openSelectPurposeModal = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/directives/consentPurposeOfUseModal.tpl.html',
                        resolve: {
                            data: function () {
                                return ConsentPurposeOfUseVm.purposeofuse;
                            }
                        },
                        controller: PurposeOfUseModalController
                    });
                };

                function PurposeOfUseModalController($scope, $modalInstance, data) {
                    $scope.cancel = cancel;
                    $scope.consent = {selectedPurposeOfUseCodes: consentService.getCodes(ConsentPurposeOfUseVm.selectedPurposeOfUse)};
                    $scope.data = data;
                    $scope.deselectAll = deselectAll;
                    $scope.ok = ok;
                    $scope.selectAll = selectAll;

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
                        ConsentPurposeOfUseVm.selectedPurposeOfUse = consentService.getEntitiesByCodes($scope.data, $scope.consent.selectedPurposeOfUseCodes);
                        ConsentPurposeOfUseVm.ngModel = $scope.consent.selectedPurposeOfUseCodes;
                        $modalInstance.close();
                    }

                    function cancel() {
                        $modalInstance.dismiss('cancel');
                    }
                }


            }
})();