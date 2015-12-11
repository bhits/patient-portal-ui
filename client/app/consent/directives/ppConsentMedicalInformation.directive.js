
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
                    controller: MedicalInformationController,
                };

                return directive;
            }

            /* @ngInject */
            function MedicalInformationController ($scope, $modal, consentService,  notificationService) {
                var MedicalInformationVm = this;
                //Test value to be replace with real value.
                MedicalInformationVm.medicalInformation = 'A';
                //Initiallizing the medical information model
                MedicalInformationVm.selectedMedicalSections = consentService.getLookupEntities(MedicalInformationVm.medicalsections, MedicalInformationVm.ngModel.doNotShareClinicalDocumentSectionTypeCodes);
                MedicalInformationVm.selectedSensitivityPolicies = consentService.getLookupEntities(MedicalInformationVm.sensitivitypolicies, MedicalInformationVm.ngModel.doNotShareSensitivityPolicyCodes);

                //MedicalInformationVm.ngModel = {doNotShareSensitivityPolicyCodes : [],doNotShareClinicalDocumentSectionTypeCodes: []};
                MedicalInformationVm.hasException = function () {
                    return ((MedicalInformationVm.selectedMedicalSections.length > 0 ) || (MedicalInformationVm.selectedSensitivityPolicies.length > 0) || (MedicalInformationVm.medicalInformation === 'B') );
                };

                MedicalInformationVm.clearMedicalInfoData = function () {
                    MedicalInformationVm.medicalInformation = 'A';
                    MedicalInformationVm.selectedMedicalSections = [];
                    MedicalInformationVm.selectedSensitivityPolicies = [];
                };

                function MedicalInformationModalController($scope, $modalInstance, data) {
                    $scope.mediactionSections = data.mediactionSections;
                    $scope.sensitivityPolicies = data.sensitivityPolicies;

                    $scope.consent = [];

                    $scope.consent.selectedMedicalSections = !angular.isDefined(MedicalInformationVm.selectedMedicalSections) ? [] : consentService.getCodes(MedicalInformationVm.selectedMedicalSections);
                    $scope.consent.selectedSensitivityPolicies = !angular.isDefined(MedicalInformationVm.selectedSensitivityPolicies) ? [] : consentService.getCodes(MedicalInformationVm.selectedSensitivityPolicies);

                    $scope.$watch("MedicalInformationVm.selectedMedicalSections", function (arg) {
                        if (MedicalInformationVm.medicalInformation === 'A') {
                            $scope.consent.selectedSensitivityPolicies = [];
                        }
                    });

                    $scope.$watch("MedicalInformationVm.selectedSensitivityPolicies", function (arg) {
                        if (MedicalInformationVm.medicalInformation === 'A') {
                            $scope.consent.selectedSensitivityPolicies = [];
                        }
                    });


                    $scope.selectAllMedicalSections = function () {
                        $scope.consent.selectedMedicalSections = consentService.getCodes($scope.mediactionSections);
                        //TODO: This should be refactored to avoid directly referencing the 'medicalInformationModalObj' name, which is declared in the HTML markup but not in this directive.
                        $scope.medicalInfofmationModalObj.$setDirty();
                    };

                    $scope.deselectAllMedicalSections = function () {
                        $scope.consent.selectedMedicalSections = [];
                        //TODO: This should be refactored to avoid directly referencing the 'medicalInformationModalObj' name, which is declared in the HTML markup but not in this directive.
                        $scope.medicalInfofmationModalObj.$setDirty();
                    };

                    $scope.selectAllSensitivityPolicies = function () {
                        $scope.consent.selectedSensitivityPolicies = consentService.getCodes($scope.sensitivityPolicies);
                        //TODO: This should be refactored to avoid directly referencing the 'medicalInformationModalObj' name, which is declared in the HTML markup but not in this directive.
                        $scope.medicalInfofmationModalObj.$setDirty();
                    };

                    $scope.deselectAllSensitivityPolicies = function () {
                        $scope.consent.selectedSensitivityPolicies = [];
                        //TODO: This should be refactored to avoid directly referencing the 'medicalInformationModalObj' name, which is declared in the HTML markup but not in this directive.
                        $scope.medicalInfofmationModalObj.$setDirty();
                    };

                    $scope.ok = function () {
                        MedicalInformationVm.selectedMedicalSections = consentService.getEntitiesByCodes($scope.mediactionSections, $scope.consent.selectedMedicalSections);
                        MedicalInformationVm.selectedSensitivityPolicies = consentService.getEntitiesByCodes($scope.sensitivityPolicies, $scope.consent.selectedSensitivityPolicies);
                        MedicalInformationVm.ngModel = {
                            doNotShareSensitivityPolicyCodes: $scope.consent.selectedSensitivityPolicies,
                            doNotShareClinicalDocumentSectionTypeCodes: $scope.consent.selectedMedicalSections
                        };

                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }

                MedicalInformationVm.openPrivacySettingsModal = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/directives/consentMedicalInformationModal.tpl.html',

                        resolve: {
                            data: function () {
                                return {
                                    mediactionSections: MedicalInformationVm.medicalsections,
                                    sensitivityPolicies: MedicalInformationVm.sensitivitypolicies
                                };
                            }
                        },
                        controller: MedicalInformationModalController
                    });
                };
            }

})();