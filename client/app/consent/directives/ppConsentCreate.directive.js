
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
                    controllerAs: 'consentCreateVm',
                    bindToController: true,
                    controller: ConsentCreateController
                };

                return driective;
            }

             /* @ngInject */
            function ConsentCreateController ($state, $modal, $stateParams, ProviderService, notificationService,consentService, utilityService ) {
                var Vm = this;
                Vm.authorize = "Authorize";
                Vm.disclosure = "Disclosure";
                Vm.dateRange = {consentStart: "", consentEnd: ""};
                Vm.medicalInformation = { doNotShareSensitivityPolicyCodes: [], doNotShareClinicalDocumentSectionTypeCodes: []};
                Vm.createConsent = createConsent;
                Vm.updateConsent = updateConsent;
                Vm.cancelConsent = cancelConsent;
                Vm.canSave = canSave;

                activate ();

                function activate (){
                    if (angular.isDefined($stateParams.consentId) && $stateParams.consentId.length > 0) {

                        Vm.isEditMode = angular.isDefined($stateParams.consentId.length) ? true : false;

                        Vm.disclosureProvider = (ProviderService.getProviderByNpis(Vm.providers, Vm.consent.providersDisclosureIsMadeToNpi, Vm.consent.organizationalProvidersDisclosureIsMadeToNpi))[0];
                        Vm.authorizeProvider = (ProviderService.getProviderByNpis(Vm.providers, Vm.consent.providersPermittedToDiscloseNpi, Vm.consent.organizationalProvidersPermittedToDiscloseNpi))[0];
                        // set providers to disable on UI that are currently selected in this consent
                        consentService.setDiscloseNpi(Vm.disclosureProvider.npi);
                        consentService.setAuthorizeNpi(Vm.authorizeProvider.npi);
                        Vm.medicalInformation.doNotShareSensitivityPolicyCodes = Vm.consent.doNotShareSensitivityPolicyCodes;
                        Vm.medicalInformation.doNotShareClinicalDocumentSectionTypeCodes = Vm.consent.doNotShareClinicalDocumentSectionTypeCodes;
                        Vm.shareForPurposeOfUseCodes = Vm.consent.shareForPurposeOfUseCodes;
                        Vm.dateRange = {
                            consentStart: Vm.consent.consentStart,
                            consentEnd: Vm.consent.consentEnd
                        };

                    } else {
                        Vm.authorizeProvider = {};
                        Vm.disclosureProvider = {};
                        Vm.shareForPurposeOfUseCodes = consentService.getCodes(consentService.getDefaultPurposeOfUse(Vm.purposeofuse, []));

                        var today = new Date();
                        var initStartDate = utilityService.formatDate(today);
                        var initEndDate = utilityService.formatDate(today.setDate(today.getDate() + 365));
                        Vm.dateRange = {consentStart: initStartDate, consentEnd: initEndDate};
                    }
                }

                function prepareConsent() {
                    var providersDisclosureIsMadeToNpi = ProviderService.getIndividualProvidersNpi([Vm.disclosureProvider]);
                    var providersPermittedToDiscloseNpi = ProviderService.getIndividualProvidersNpi([Vm.authorizeProvider]);
                    var organizationalProvidersPermittedToDiscloseNpi = ProviderService.getOrganizationalProvidersNpi([Vm.authorizeProvider]);
                    var organizationalProvidersDisclosureIsMadeToNpi = ProviderService.getOrganizationalProvidersNpi([Vm.disclosureProvider]);

                    var consent = {
                        providersPermittedToDiscloseNpi: providersPermittedToDiscloseNpi,
                        providersDisclosureIsMadeToNpi: providersDisclosureIsMadeToNpi,
                        organizationalProvidersDisclosureIsMadeToNpi: organizationalProvidersDisclosureIsMadeToNpi,
                        organizationalProvidersPermittedToDiscloseNpi: organizationalProvidersPermittedToDiscloseNpi,
                        doNotShareSensitivityPolicyCodes: Vm.medicalInformation.doNotShareSensitivityPolicyCodes,
                        doNotShareClinicalDocumentSectionTypeCodes: Vm.medicalInformation.doNotShareClinicalDocumentSectionTypeCodes,
                        shareForPurposeOfUseCodes: Vm.shareForPurposeOfUseCodes,
                        consentStart: Vm.dateRange.consentStart,
                        consentEnd: Vm.dateRange.consentEnd
                    };

                    return consent;
                }

                function createConsent() {
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
                }

                function updateConsent () {
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
                }

                function cancelConsent () {

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
                }

                function canSave () {
                    var authorizeDisclosure = angular.isDefined(Vm.authorizeProvider.npi) && angular.isDefined(Vm.disclosureProvider.npi);
                    var medicalInformation = angular.isDefined(Vm.medicalInformation) && (angular.isDefined(Vm.medicalInformation.doNotShareSensitivityPolicyCodes) || angular.isDefined(Vm.medicalInformation.doNotShareSensitivityPolicyCodes));
                    return (authorizeDisclosure && medicalInformation && angular.isDefined(Vm.shareForPurposeOfUseCodes));
                }
            }
})();