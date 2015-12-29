
(function () {

    'use strict';

    angular
        .module('app.consent')
            .directive('ppConsentCreate', ppConsentCreate);

            /* @ngInject */
            function ppConsentCreate($stateParams) {

                var driective =  {
                    restrict: 'E',
                    templateUrl: 'app/consent/directives/consentCreateEdit.html',
                    bindToController: {
                        providers: "=",
                        purposeofuse: "=",
                        medicalsections: "=",
                        sensitivitypolicies: "=",
                        consent: "="
                    },
                    controller: ConsentCreateController,
                    controllerAs: 'consentCreateVm'
                };

                return driective;
            }

             /* @ngInject */
            function ConsentCreateController ($state, $modal, $stateParams, providerSharedService, notificationService,consentService, utilityService ) {
                var vm = this;
                vm.authorize = "Authorize";
                vm.disclosure = "Disclosure";
                vm.dateRange = {consentStart: "", consentEnd: ""};
                vm.medicalInformation = { doNotShareSensitivityPolicyCodes: [], doNotShareClinicalDocumentSectionTypeCodes: []};
                vm.createConsent = createConsent;
                vm.updateConsent = updateConsent;
                vm.cancelConsent = cancelConsent;
                vm.canSave = canSave;

                activate ();

                function activate (){
                    if (angular.isDefined($stateParams.consentId) && $stateParams.consentId.length > 0) {

                        vm.isEditMode = angular.isDefined($stateParams.consentId.length) ? true : false;

                        vm.disclosureProvider = (providerSharedService.getProviderByNpis(vm.providers, vm.consent.providersDisclosureIsMadeToNpi, vm.consent.organizationalProvidersDisclosureIsMadeToNpi))[0];
                        vm.authorizeProvider = (providerSharedService.getProviderByNpis(vm.providers, vm.consent.providersPermittedToDiscloseNpi, vm.consent.organizationalProvidersPermittedToDiscloseNpi))[0];
                        // set providers to disable on UI that are currently selected in this consent
                        consentService.setDiscloseNpi(vm.disclosureProvider.npi);
                        consentService.setAuthorizeNpi(vm.authorizeProvider.npi);
                        vm.medicalInformation.doNotShareSensitivityPolicyCodes = vm.consent.doNotShareSensitivityPolicyCodes;
                        vm.medicalInformation.doNotShareClinicalDocumentSectionTypeCodes = vm.consent.doNotShareClinicalDocumentSectionTypeCodes;
                        vm.shareForPurposeOfUseCodes = vm.consent.shareForPurposeOfUseCodes;
                        vm.dateRange = {
                            consentStart: vm.consent.consentStart,
                            consentEnd: vm.consent.consentEnd
                        };

                    } else {
                        vm.authorizeProvider = {};
                        vm.disclosureProvider = {};
                        vm.shareForPurposeOfUseCodes = consentService.getCodes(consentService.getDefaultPurposeOfUse(vm.purposeofuse, []));

                        var today = new Date();
                        var initStartDate = utilityService.formatDate(today);
                        var initEndDate = utilityService.formatDate(today.setDate(today.getDate() + 365));
                        vm.dateRange = {consentStart: initStartDate, consentEnd: initEndDate};
                    }
                }

                function prepareConsent() {
                    var providersDisclosureIsMadeToNpi = providerSharedService.getIndividualProvidersNpi([vm.disclosureProvider]);
                    var providersPermittedToDiscloseNpi = providerSharedService.getIndividualProvidersNpi([vm.authorizeProvider]);
                    var organizationalProvidersPermittedToDiscloseNpi = providerSharedService.getOrganizationalProvidersNpi([vm.authorizeProvider]);
                    var organizationalProvidersDisclosureIsMadeToNpi = providerSharedService.getOrganizationalProvidersNpi([vm.disclosureProvider]);

                    var consent = {
                        providersPermittedToDiscloseNpi: providersPermittedToDiscloseNpi,
                        providersDisclosureIsMadeToNpi: providersDisclosureIsMadeToNpi,
                        organizationalProvidersDisclosureIsMadeToNpi: organizationalProvidersDisclosureIsMadeToNpi,
                        organizationalProvidersPermittedToDiscloseNpi: organizationalProvidersPermittedToDiscloseNpi,
                        doNotShareSensitivityPolicyCodes: vm.medicalInformation.doNotShareSensitivityPolicyCodes,
                        doNotShareClinicalDocumentSectionTypeCodes: vm.medicalInformation.doNotShareClinicalDocumentSectionTypeCodes,
                        shareForPurposeOfUseCodes: vm.shareForPurposeOfUseCodes,
                        consentStart: vm.dateRange.consentStart,
                        consentEnd: vm.dateRange.consentEnd
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
                        templateUrl: 'app/consent/directives/consentCreateEditCancelModal.html',
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
                    var authorizeDisclosure = angular.isDefined(vm.authorizeProvider.npi) && angular.isDefined(vm.disclosureProvider.npi);
                    var medicalInformation = angular.isDefined(vm.medicalInformation) && (angular.isDefined(vm.medicalInformation.doNotShareSensitivityPolicyCodes) || angular.isDefined(vm.medicalInformation.doNotShareSensitivityPolicyCodes));
                    return (authorizeDisclosure && medicalInformation && angular.isDefined(vm.shareForPurposeOfUseCodes));
                }
            }
})();