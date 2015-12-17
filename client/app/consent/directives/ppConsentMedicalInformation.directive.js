
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('ppConsentMedicalInformation', ppConsentMedicalInformation);

            function ppConsentMedicalInformation($modal, consentService) {
                var directive =  {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/consent/directives/consentMedicalInformation.html',
                    scope: {
                        data: "=",
                        ngModel: '=',
                        medicalsections: "=",
                        sensitivitypolicies: "="
                    },
                    bindToController: true,
                    controllerAs: 'consentMedicalInformationVm',
                    controller:MedicalInformationController
                };

                return directive;
            }

            /* @ngInject */
            function MedicalInformationController ($scope, $modal, consentService,  notificationService) {
                var vm = this;
                //Test value to be replace with real value.
                vm.medicalInformation = 'A';
                //Initiallizing the medical information model
                vm.selectedMedicalSections = consentService.getLookupEntities(vm.medicalsections, vm.ngModel.doNotShareClinicalDocumentSectionTypeCodes);
                vm.selectedSensitivityPolicies = consentService.getLookupEntities(vm.sensitivitypolicies, vm.ngModel.doNotShareSensitivityPolicyCodes);
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
                        controller: MedicalInformationModalController
                    });
                }

                function MedicalInformationModalController($scope, $modalInstance, data) {
                    $scope.mediactionSections = data.mediactionSections;
                    $scope.sensitivityPolicies = data.sensitivityPolicies;
                    $scope.consent = [];
                    $scope.consent.selectedMedicalSections = !angular.isDefined(vm.selectedMedicalSections) ? [] : consentService.getCodes(vm.selectedMedicalSections);
                    $scope.consent.selectedSensitivityPolicies = !angular.isDefined(vm.selectedSensitivityPolicies) ? [] : consentService.getCodes(vm.selectedSensitivityPolicies);

                    $scope.$watch("vm.selectedMedicalSections", watchMedicalSection);
                    $scope.$watch("vm.selectedSensitivityPolicies",watchSensitivityPolicies );

                    $scope.selectAllMedicalSections = selectAllMedicalSections;
                    $scope.deselectAllMedicalSections = deselectAllMedicalSections;
                    $scope.selectAllSensitivityPolicies = selectAllSensitivityPolicies;
                    $scope.deselectAllSensitivityPolicies = deselectAllSensitivityPolicies;
                    $scope.ok = ok;
                    $scope.cancel = cancel;

                    function watchMedicalSection (arg) {
                        if (vm.medicalInformation === 'A') {
                            $scope.consent.selectedSensitivityPolicies = [];
                        }
                    }

                    function watchSensitivityPolicies(arg) {
                        if (vm.medicalInformation === 'A') {
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
                        vm.selectedMedicalSections = consentService.getEntitiesByCodes($scope.mediactionSections, $scope.consent.selectedMedicalSections);
                        vm.selectedSensitivityPolicies = consentService.getEntitiesByCodes($scope.sensitivityPolicies, $scope.consent.selectedSensitivityPolicies);
                        vm.ngModel = {
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