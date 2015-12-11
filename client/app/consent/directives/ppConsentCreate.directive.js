
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('ppCreateConsent', ppCreateConsent);

            /* @ngInject */
            function ppCreateConsent($stateParams) {

                var driective =  {
                    restrict: 'E',
                    templateUrl: 'app/consent/directives/consentCreateEdit.tpl.html',
                    scope: {
                        providers: "=",
                        purposeofuse: "=",
                        medicalsections: "=",
                        sensitivitypolicies: "=",
                        consent: "="
                    },
                    controllerAs: 'CreateConsentVm',
                    bindToController: true,
                    controller: ConsentCreateController
                };

                return driective;
            }

             /* @ngInject */
            function ConsentCreateController ($state, $modal, $scope, $stateParams, ProviderService, notificationService,consentService, utilityService ) {
                var CreateConsentVm = this;
                CreateConsentVm.authorize = "Authorize";
                CreateConsentVm.disclosure = "Disclosure";
                CreateConsentVm.dateRange = {consentStart: "", consentEnd: ""};

                CreateConsentVm.medicalInformation = {
                    doNotShareSensitivityPolicyCodes: [],
                    doNotShareClinicalDocumentSectionTypeCodes: []
                };

                if (angular.isDefined($stateParams.consentId) && $stateParams.consentId.length > 0) {

                    CreateConsentVm.isEditMode = angular.isDefined($stateParams.consentId.length) ? true : false;

                    CreateConsentVm.disclosureProvider = (ProviderService.getProviderByNpis(CreateConsentVm.providers, CreateConsentVm.consent.providersDisclosureIsMadeToNpi, CreateConsentVm.consent.organizationalProvidersDisclosureIsMadeToNpi))[0];
                    CreateConsentVm.authorizeProvider = (ProviderService.getProviderByNpis(CreateConsentVm.providers, CreateConsentVm.consent.providersPermittedToDiscloseNpi, CreateConsentVm.consent.organizationalProvidersPermittedToDiscloseNpi))[0];
                    // set providers to disable on UI that are currently selected in this consent
                    consentService.setDiscloseNpi(CreateConsentVm.disclosureProvider.npi);
                    consentService.setAuthorizeNpi(CreateConsentVm.authorizeProvider.npi);
                    CreateConsentVm.medicalInformation.doNotShareSensitivityPolicyCodes = CreateConsentVm.consent.doNotShareSensitivityPolicyCodes;
                    CreateConsentVm.medicalInformation.doNotShareClinicalDocumentSectionTypeCodes = CreateConsentVm.consent.doNotShareClinicalDocumentSectionTypeCodes;
                    CreateConsentVm.shareForPurposeOfUseCodes = CreateConsentVm.consent.shareForPurposeOfUseCodes;
                    CreateConsentVm.dateRange = {
                        consentStart: CreateConsentVm.consent.consentStart,
                        consentEnd: CreateConsentVm.consent.consentEnd
                    };

                } else {
                    CreateConsentVm.authorizeProvider = {};
                    CreateConsentVm.disclosureProvider = {};
                    CreateConsentVm.shareForPurposeOfUseCodes = consentService.getCodes(consentService.getDefaultPurposeOfUse(CreateConsentVm.purposeofuse, []));

                    var today = new Date();
                    var initStartDate = utilityService.formatDate(today);
                    var initEndDate = utilityService.formatDate(today.setDate(today.getDate() + 365));
                    CreateConsentVm.dateRange = {consentStart: initStartDate, consentEnd: initEndDate};
                }

                var prepareConsent = function () {
                    var providersDisclosureIsMadeToNpi = ProviderService.getIndividualProvidersNpi([CreateConsentVm.disclosureProvider]);
                    var providersPermittedToDiscloseNpi = ProviderService.getIndividualProvidersNpi([CreateConsentVm.authorizeProvider]);
                    var organizationalProvidersPermittedToDiscloseNpi = ProviderService.getOrganizationalProvidersNpi([CreateConsentVm.authorizeProvider]);
                    var organizationalProvidersDisclosureIsMadeToNpi = ProviderService.getOrganizationalProvidersNpi([CreateConsentVm.disclosureProvider]);

                    var consent = {
                        providersPermittedToDiscloseNpi: providersPermittedToDiscloseNpi,
                        providersDisclosureIsMadeToNpi: providersDisclosureIsMadeToNpi,
                        organizationalProvidersDisclosureIsMadeToNpi: organizationalProvidersDisclosureIsMadeToNpi,
                        organizationalProvidersPermittedToDiscloseNpi: organizationalProvidersPermittedToDiscloseNpi,
                        doNotShareSensitivityPolicyCodes: CreateConsentVm.medicalInformation.doNotShareSensitivityPolicyCodes,
                        doNotShareClinicalDocumentSectionTypeCodes: CreateConsentVm.medicalInformation.doNotShareClinicalDocumentSectionTypeCodes,
                        shareForPurposeOfUseCodes: CreateConsentVm.shareForPurposeOfUseCodes,
                        consentStart: CreateConsentVm.dateRange.consentStart,
                        consentEnd: CreateConsentVm.dateRange.consentEnd
                    };

                    return consent;
                };

                CreateConsentVm.createConsent = function () {
                    var consent = prepareConsent();
                    //On Success clear the references of the selected providers
                    consentService.resetSelectedNpi();

                    consentService.createConsent(consent,
                        function (response) {
                            notificationService.success("Success in creating consent.");
                            $state.go('fe.consent.list');
                        },
                        function (error) {
                            if (error.status === 409) {
                                notificationService.warn("Error you cannot create duplicate consent.");
                            } else {
                                notificationService.error("Error in creating consent");
                            }
                        }
                    );
                };

                CreateConsentVm.updateConsent = function () {
                    var consent = prepareConsent();
                    consent.id = $stateParams.consentId;

                    consentService.updateConsent(
                        consent,
                        function (response) {
                            notificationService.success("Success in updating consent.");
                            $state.go('fe.consent.list');
                        },
                        function (error) {
                            if (error.status === 409) {
                                notificationService.warn("Error you cannot create duplicate consent.");
                            } else {
                                notificationService.error("Error in updating consent.");
                            }

                        }
                    );
                };

                CreateConsentVm.cancelConsent = function () {
                    console.log("Cancelling consent..");
                    $modal.open({
                        templateUrl: 'app/consent/directives/consentCreateEditCancelModal.tpl.html',
                        controller: ['$modalInstance', '$state', CancelCreateEditConsentModalController],
                        controllerAs: 'CancelCreateEditConsentModalVm'
                    });

                    function CancelCreateEditConsentModalController($modalInstance, $state) {
                        var CancelCreateEditConsentModalVm = this;
                        CancelCreateEditConsentModalVm.cancel = cancel;
                        CancelCreateEditConsentModalVm.discard = discard;

                        function cancel() {
                            $modalInstance.dismiss('cancel');
                        }

                        function discard() {
                            cancel();
                            $state.go('fe.consent.list');
                        }
                    }
                };

                CreateConsentVm.canSave = function () {
                    var authorizeDisclosure = angular.isDefined(CreateConsentVm.authorizeProvider.npi) && angular.isDefined(CreateConsentVm.disclosureProvider.npi);
                    var medicalInformation = angular.isDefined(CreateConsentVm.medicalInformation) && (angular.isDefined(CreateConsentVm.medicalInformation.doNotShareSensitivityPolicyCodes) || angular.isDefined(CreateConsentVm.medicalInformation.doNotShareSensitivityPolicyCodes));
                    return (authorizeDisclosure && medicalInformation && angular.isDefined(CreateConsentVm.shareForPurposeOfUseCodes));
                };
            }
})();