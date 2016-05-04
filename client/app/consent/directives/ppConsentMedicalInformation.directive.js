
(function () {

    'use strict';

    angular
        .module('app.consent')
            .directive('ppConsentMedicalInformation', ppConsentMedicalInformation);

            function ppConsentMedicalInformation() {
                var directive =  {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/consent/directives/consentMedicalInformation.html',
                    scope: {},
                    bindToController: {
                        data: "=",
                        ngModel: '=',
                        sensitivitypolicies: "="
                    },
                    controllerAs: 'consentMedicalInformationVm',
                    controller:MedicalInformationController
                };

                return directive;
            }

            /* @ngInject */
            function MedicalInformationController ($scope, $modal, consentService,  notificationService) {
                var vm = this;
                vm.selectedSensitivityPolicies = consentService.getLookupEntities(vm.sensitivitypolicies, vm.ngModel.doNotShareSensitivityPolicyCodes);
                vm.medicalInformation = (vm.selectedSensitivityPolicies.length > 0) ? 'B': 'A';
                vm.hasException = hasException;
                vm.clearMedicalInfoData = clearMedicalInfoData;
                vm.openPrivacySettingsModal = openPrivacySettingsModal;

                function hasException() {
                    return ((vm.selectedSensitivityPolicies.length > 0) || (vm.medicalInformation === 'B') );
                }

                function clearMedicalInfoData () {
                    vm.medicalInformation = 'A';
                    vm.selectedSensitivityPolicies = [];
                }

                function openPrivacySettingsModal () {
                    //In case of sharing medical record with exception.
                    if(vm.medicalInformation === 'B'){
                        var modalInstance = $modal.open({
                            templateUrl: 'app/consent/directives/consentMedicalInformationModal.html',
                            resolve: {
                                data: function () {
                                    return {
                                        sensitivityPolicies: vm.sensitivitypolicies
                                    };
                                }
                            },
                            controllerAs: 'medicalInfoModalVm',
                            controller: MedicalInformationModalController
                        });
                    }
                }

                function MedicalInformationModalController($scope, $modalInstance, data) {
                    var medicalInfoModalVm = this;
                    medicalInfoModalVm.sensitivityPolicies = data.sensitivityPolicies;
                    medicalInfoModalVm.consent = [];
                    medicalInfoModalVm.consent.selectedSensitivityPolicies = !angular.isDefined(vm.selectedSensitivityPolicies) ? [] : consentService.getCodes(vm.selectedSensitivityPolicies);

                    $scope.$watch("vm.selectedSensitivityPolicies",watchSensitivityPolicies );

                    medicalInfoModalVm.selectAllSensitivityPolicies = selectAllSensitivityPolicies;
                    medicalInfoModalVm.deselectAllSensitivityPolicies = deselectAllSensitivityPolicies;
                    medicalInfoModalVm.ok = ok;
                    medicalInfoModalVm.cancel = cancel;

                    function watchSensitivityPolicies(arg) {
                        if (vm.medicalInformation === 'A') {
                            medicalInfoModalVm.consent.selectedSensitivityPolicies = [];
                        }
                    }

                    function selectAllSensitivityPolicies (medicalInfofmationModalObj) {
                        medicalInfoModalVm.consent.selectedSensitivityPolicies = consentService.getCodes(medicalInfoModalVm.sensitivityPolicies);
                        //TODO: This should be refactored to avoid directly referencing the 'medicalInformationModalObj' name, which is declared in the HTML markup but not in this directive.
                        medicalInfofmationModalObj.$setDirty();
                    }

                    function deselectAllSensitivityPolicies (medicalInfofmationModalObj) {
                        medicalInfoModalVm.consent.selectedSensitivityPolicies = [];
                        //TODO: This should be refactored to avoid directly referencing the 'medicalInformationModalObj' name, which is declared in the HTML markup but not in this directive.
                        medicalInfofmationModalObj.$setDirty();
                    }

                    function ok() {
                        vm.selectedSensitivityPolicies = consentService.getEntitiesByCodes(medicalInfoModalVm.sensitivityPolicies, medicalInfoModalVm.consent.selectedSensitivityPolicies);
                        vm.ngModel = {
                            doNotShareSensitivityPolicyCodes: medicalInfoModalVm.consent.selectedSensitivityPolicies
                        };
                        $modalInstance.close();
                    }

                    function cancel() {
                        $modalInstance.dismiss('cancel');
                    }
                }
            }
})();