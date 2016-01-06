
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
                        medicalsections: "=",
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
                vm.selectedMedicalSections = consentService.getLookupEntities(vm.medicalsections, vm.ngModel.doNotShareClinicalDocumentSectionTypeCodes);
                vm.selectedSensitivityPolicies = consentService.getLookupEntities(vm.sensitivitypolicies, vm.ngModel.doNotShareSensitivityPolicyCodes);
                vm.medicalInformation = (vm.selectedMedicalSections.length > 0 ) || (vm.selectedSensitivityPolicies.length > 0) ? 'B': 'A';
                vm.hasException = hasException;
                vm.clearMedicalInfoData = clearMedicalInfoData;
                vm.openPrivacySettingsModal = openPrivacySettingsModal;

                function hasException() {
                    return ((vm.selectedMedicalSections.length > 0 ) || (vm.selectedSensitivityPolicies.length > 0) || (vm.medicalInformation === 'B') );
                }

                function clearMedicalInfoData () {
                    vm.medicalInformation = 'A';
                    vm.selectedMedicalSections = [];
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
                                        mediactionSections: vm.medicalsections,
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
                    medicalInfoModalVm.mediactionSections = data.mediactionSections;
                    medicalInfoModalVm.sensitivityPolicies = data.sensitivityPolicies;
                    medicalInfoModalVm.consent = [];
                    medicalInfoModalVm.consent.selectedMedicalSections = !angular.isDefined(vm.selectedMedicalSections) ? [] : consentService.getCodes(vm.selectedMedicalSections);
                    medicalInfoModalVm.consent.selectedSensitivityPolicies = !angular.isDefined(vm.selectedSensitivityPolicies) ? [] : consentService.getCodes(vm.selectedSensitivityPolicies);

                    $scope.$watch("vm.selectedMedicalSections", watchMedicalSection);
                    $scope.$watch("vm.selectedSensitivityPolicies",watchSensitivityPolicies );

                    medicalInfoModalVm.selectAllMedicalSections = selectAllMedicalSections;
                    medicalInfoModalVm.deselectAllMedicalSections = deselectAllMedicalSections;
                    medicalInfoModalVm.selectAllSensitivityPolicies = selectAllSensitivityPolicies;
                    medicalInfoModalVm.deselectAllSensitivityPolicies = deselectAllSensitivityPolicies;
                    medicalInfoModalVm.ok = ok;
                    medicalInfoModalVm.cancel = cancel;

                    function watchMedicalSection (arg) {
                        if (vm.medicalInformation === 'A') {
                            medicalInfoModalVm.consent.selectedSensitivityPolicies = [];
                        }
                    }

                    function watchSensitivityPolicies(arg) {
                        if (vm.medicalInformation === 'A') {
                            medicalInfoModalVm.consent.selectedSensitivityPolicies = [];
                        }
                    }

                    function selectAllMedicalSections (medicalInfofmationModalObj) {
                        medicalInfoModalVm.consent.selectedMedicalSections = consentService.getCodes(medicalInfoModalVm.mediactionSections);
                        //TODO: This should be refactored to avoid directly referencing the 'medicalInformationModalObj' name, which is declared in the HTML markup but not in this directive.
                       medicalInfofmationModalObj.$setDirty();
                    }

                    function deselectAllMedicalSections (medicalInfofmationModalObj) {
                        medicalInfoModalVm.consent.selectedMedicalSections = [];
                        //TODO: This should be refactored to avoid directly referencing the 'medicalInformationModalObj' name, which is declared in the HTML markup but not in this directive.
                        medicalInfofmationModalObj.$setDirty();
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
                        vm.selectedMedicalSections = consentService.getEntitiesByCodes(medicalInfoModalVm.mediactionSections, medicalInfoModalVm.consent.selectedMedicalSections);
                        vm.selectedSensitivityPolicies = consentService.getEntitiesByCodes(medicalInfoModalVm.sensitivityPolicies, medicalInfoModalVm.consent.selectedSensitivityPolicies);
                        vm.ngModel = {
                            doNotShareSensitivityPolicyCodes: medicalInfoModalVm.consent.selectedSensitivityPolicies,
                            doNotShareClinicalDocumentSectionTypeCodes: medicalInfoModalVm.consent.selectedMedicalSections
                        };
                        $modalInstance.close();
                    }

                    function cancel() {
                        $modalInstance.dismiss('cancel');
                    }
                }
            }
})();