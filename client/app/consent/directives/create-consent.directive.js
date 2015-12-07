
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('createConsent', CreateConsent);

            /* @ngInject */
            function CreateConsent($stateParams) {

                function doFormatDate(dateObj) {
                    var today = new Date(dateObj);
                    var day = today.getDate();
                    var month = today.getMonth() + 1;
                    var year = today.getFullYear();
                    if (day < 10) {
                        day = "0" + day;
                    }
                    if (month < 10) {
                        month = "0" + month;
                    }
                    var formatDate = month + "/" + day + "/" + year;

                    return formatDate;
                }

                var today = new Date();
                var initStartDate = doFormatDate(today);
                var initEndDate = doFormatDate(today.setDate(today.getDate() + 365));

                return {
                    restrict: 'E',
                    templateUrl: 'app/consent/directives/consent-create-edit.tpl.html',
                    scope: {
                        providers: "=",
                        purposeofuse: "=",
                        medicalsections: "=",
                        sensitivitypolicies: "=",
                        consent: "="
                    },
                    controllerAs: 'CreateConsentVm',
                    bindToController: true,
                    controller: ['ConsentService', '$stateParams', 'ProviderService', 'notificationService', '$state', '$modal', '$scope', function (ConsentService, $stateParams, ProviderService, notificationService, $state, $modal, $scope) {
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
                            ConsentService.setDiscloseNpi(CreateConsentVm.disclosureProvider.npi);
                            ConsentService.setAuthorizeNpi(CreateConsentVm.authorizeProvider.npi);
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
                            CreateConsentVm.shareForPurposeOfUseCodes = ConsentService.getCodes(ConsentService.getDefaultPurposeOfUse(CreateConsentVm.purposeofuse, []));
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
                            ConsentService.resetSelectedNpi();

                            ConsentService.createConsent(consent,
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

                            ConsentService.updateConsent(
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
                                templateUrl: 'app/consent/directives/consent-create-edit-cancel-modal.tpl.html',
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
                    }]
                };
            }
})();