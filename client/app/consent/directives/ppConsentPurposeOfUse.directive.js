
'use strict';

(function () {

    angular
        .module('app.consent')
             .directive('ppConsentPurposeOfUse', ppConsentPurposeOfUse);

            /* @ngInject */
            function ppConsentPurposeOfUse(consentService, $modal) {
                return {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/consent/directives/consentPurposeOfUse.tpl.html',
                    scope: {
                        ngModel: "=",
                        purposeofuse: "="
                    },
                    bindToController: true,
                    controllerAs: 'PurposeOfUseVm',
                    controller: ['$scope', 'consentService', '$modal', 'notificationService', function ($scope, consentService, $modal, notificationService) {
                        var PurposeOfUseVm = this;
                        //var purposeOfUse = consentService.getDefaultPurposeOfUse(PurposeOfUseVm.purposeofuse, PurposeOfUseVm.ngModel);
                        //
                        ////Getting default purpose of use code.
                        //var code = purposeOfUse[0].code;
                        PurposeOfUseVm.selectedPurposeOfUse = consentService.getDefaultPurposeOfUse(PurposeOfUseVm.purposeofuse, PurposeOfUseVm.ngModel);

                        function PurposeOfUseModalController($scope, $modalInstance, data) {
                            $scope.data = data;
                            $scope.consent = {selectedPurposeOfUseCodes: consentService.getCodes(PurposeOfUseVm.selectedPurposeOfUse)};

                            $scope.selectAll = function () {
                                $scope.consent.selectedPurposeOfUseCodes = consentService.getCodes($scope.data);
                                //TODO: This should be refactored to avoid directly referencing the 'purposeOfUseModalObj' name, which is declared in the HTML markup but not in this directive.
                                $scope.purposeOfUseModalObj.$setDirty();
                            };

                            $scope.deselectAll = function () {
                                $scope.consent.selectedPurposeOfUseCodes = [];
                                //TODO: This should be refactored to avoid directly referencing the 'purposeOfUseModalObj' name, which is declared in the HTML markup but not in this directive.
                                $scope.purposeOfUseModalObj.$setDirty();
                            };

                            $scope.ok = function () {
                                PurposeOfUseVm.selectedPurposeOfUse = consentService.getEntitiesByCodes($scope.data, $scope.consent.selectedPurposeOfUseCodes);
                                PurposeOfUseVm.ngModel = $scope.consent.selectedPurposeOfUseCodes;
                                $modalInstance.close();
                            };

                            $scope.cancel = function () {
                                $modalInstance.dismiss('cancel');
                            };
                        }

                        PurposeOfUseVm.openSelectPurposeModal = function () {
                            var modalInstance = $modal.open({
                                templateUrl: 'app/consent/directives/consentPurposeOfUseModal.tpl.html',
                                resolve: {
                                    data: function () {
                                        return PurposeOfUseVm.purposeofuse;
                                    }
                                },
                                controller: PurposeOfUseModalController
                            });
                        };
                    }]
                };
            }
})();