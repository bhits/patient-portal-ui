
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('ppConsentMedicalInformation', ppConsentMedicalInformation);

            function ppConsentMedicalInformation($modal, consentService) {
                var directive =  {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/consent/directives/consentMedicalInformation.tpl.html',
                    scope: {
                        data: "=",
                        ngModel: '=',
                        medicalsections: "=",
                        sensitivitypolicies: "="
                    },
                    bindToController: true,
                    controllerAs: 'consentMedicalInformationVm',
                    controller: MedicalInformationController
                };

                return directive;
            }

            /* @ngInject */
            function MedicalInformationController ($scope, $modal, consentService,  notificationService) {
                var Vm = this;
                //Test value to be replace with real value.
                Vm.medicalInformation = 'A';
                //Initiallizing the medical information model
                Vm.selectedMedicalSections = consentService.getLookupEntities(Vm.medicalsections, Vm.ngModel.doNotShareClinicalDocumentSectionTypeCodes);
                Vm.selectedSensitivityPolicies = consentService.getLookupEntities(Vm.sensitivitypolicies, Vm.ngModel.doNotShareSensitivityPolicyCodes);
                Vm.hasException = hasException;
                Vm.clearMedicalInfoData = clearMedicalInfoData;
                Vm.openPrivacySettingsModal = openPrivacySettingsModal;

                function hasException() {
                    return ((Vm.selectedMedicalSections.length > 0 ) || (Vm.selectedSensitivityPolicies.length > 0) || (Vm.medicalInformation === 'B') );
                }

                function clearMedicalInfoData () {
                    Vm.medicalInformation = 'A';
                    Vm.selectedMedicalSections = [];
                    Vm.selectedSensitivityPolicies = [];
                }

                function openPrivacySettingsModal () {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/directives/consentMedicalInformationModal.tpl.html',

                        resolve: {
                            data: function () {
                                return {
                                    mediactionSections: Vm.medicalsections,
                                    sensitivityPolicies: Vm.sensitivitypolicies
                                };
                            }
                        },
                        controller: MedicalInformationModalController
                    });
                }

                function MedicalInformationModalController($scope, $modalInstance, data) {
                    $scope.mediactionSections = data.mediactionSections;
                    $scope.sensitivityPolicies = data.sensitivityPolicies;
                    $scope.consent = [];
                    $scope.consent.selectedMedicalSections = !angular.isDefined(Vm.selectedMedicalSections) ? [] : consentService.getCodes(Vm.selectedMedicalSections);
                    $scope.consent.selectedSensitivityPolicies = !angular.isDefined(Vm.selectedSensitivityPolicies) ? [] : consentService.getCodes(Vm.selectedSensitivityPolicies);

                    $scope.$watch("Vm.selectedMedicalSections", watchMedicalSection);
                    $scope.$watch("Vm.selectedSensitivityPolicies",watchSensitivityPolicies );

                    $scope.selectAllMedicalSections = selectAllMedicalSections;
                    $scope.deselectAllMedicalSections = deselectAllMedicalSections;
                    $scope.selectAllSensitivityPolicies = selectAllSensitivityPolicies;
                    $scope.deselectAllSensitivityPolicies = deselectAllSensitivityPolicies;
                    $scope.ok = ok;
                    $scope.cancel = cancel;

                    function watchMedicalSection (arg) {
                        if (Vm.medicalInformation === 'A') {
                            $scope.consent.selectedSensitivityPolicies = [];
                        }
                    }

                    function watchSensitivityPolicies(arg) {
                        if (Vm.medicalInformation === 'A') {
                            $scope.consent.selectedSensitivityPolicies = [];
                        }
                    }

                    function selectAllMedicalSections () {
                        $scope.consent.selectedMedicalSections = consentService.getCodes($scope.mediactionSections);
                        //TODO: This should be refactored to avoid directly referencing the 'medicalInformationModalObj' name, which is declared in the HTML markup but not in this directive.
                        $scope.medicalInfofmationModalObj.$setDirty();
                    }

                    function deselectAllMedicalSections () {
                        $scope.consent.selectedMedicalSections = [];
                        //TODO: This should be refactored to avoid directly referencing the 'medicalInformationModalObj' name, which is declared in the HTML markup but not in this directive.
                        $scope.medicalInfofmationModalObj.$setDirty();
                    }

                    function selectAllSensitivityPolicies () {
                        $scope.consent.selectedSensitivityPolicies = consentService.getCodes($scope.sensitivityPolicies);
                        //TODO: This should be refactored to avoid directly referencing the 'medicalInformationModalObj' name, which is declared in the HTML markup but not in this directive.
                        $scope.medicalInfofmationModalObj.$setDirty();
                    }

                    function deselectAllSensitivityPolicies () {
                        $scope.consent.selectedSensitivityPolicies = [];
                        //TODO: This should be refactored to avoid directly referencing the 'medicalInformationModalObj' name, which is declared in the HTML markup but not in this directive.
                        $scope.medicalInfofmationModalObj.$setDirty();
                    }

                    function ok() {
                        Vm.selectedMedicalSections = consentService.getEntitiesByCodes($scope.mediactionSections, $scope.consent.selectedMedicalSections);
                        Vm.selectedSensitivityPolicies = consentService.getEntitiesByCodes($scope.sensitivityPolicies, $scope.consent.selectedSensitivityPolicies);
                        Vm.ngModel = {
                            doNotShareSensitivityPolicyCodes: $scope.consent.selectedSensitivityPolicies,
                            doNotShareClinicalDocumentSectionTypeCodes: $scope.consent.selectedMedicalSections
                        };

                        $modalInstance.close();
                    }

                    function cancel() {
                        $modalInstance.dismiss('cancel');
                    }
                }


            }

})();