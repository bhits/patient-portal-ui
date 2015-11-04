/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function () {

    'use strict';

    function CreateConsent($stateParams) {
        return {
            restrict: 'AE',
            templateUrl: 'app/consent/tmpl/consent-create-edit.tpl.html',
            controllerAs: 'CreateConsentVm',
            bindToController: true,
            controller: ['ConsentService', '$stateParams', 'ProviderService', function (ConsentService, $stateParams, ProviderService) {
                var CreateConsentVm = this;
                CreateConsentVm.authorize = "Authorize";
                CreateConsentVm.disclosure = "Disclosure";




                if(angular.isDefined($stateParams.consentId)){
                    var consent = ConsentService.getConsent($stateParams.consentId);

                    var providers = ProviderService.getProviders(function (response) {
                        providers = response;
                    }, function (error) {
                        console.log("Error: in getting providers");
                    });

                    CreateConsentVm.consent = consent;

                    ConsentService.getConsent(
                        {id: $stateParams.consentId},
                        function(consent){
                            CreateConsentVm.consent = consent;
                            CreateConsentVm.authorizeProvider = (ConsentService.getProviderByNPI(providers, consent.authorizeProvider)).npi;
                            CreateConsentVm.disclosureProvider = (ConsentService.getProviderByNPI(providers, consent.providersPermittedToDisclose)).npi;
                            CreateConsentVm.doNotShareSensitivityPolicyCodes = consent.doNotShareSensitivityPolicyCodes;
                            CreateConsentVm.doNotShareClinicalDocumentSectionTypeCodes = consent.doNotShareClinicalDocumentSectionTypeCodes;
                            CreateConsentVm.shareForPurposeOfUseCodes = consent.shareForPurposeOfUseCodes;
                            CreateConsentVm.consentStart = consent.consentStart;
                            CreateConsentVm.consentEnd = consent.consentEnd;
                        },
                        function(error){
                            console.log("Error getting consent");
                        }
                    );

                }else{
                    CreateConsentVm.authorizeProvider = null;
                    CreateConsentVm.disclosureProvider = null;
                    CreateConsentVm.doNotShareSensitivityPolicyCodes = [];
                    CreateConsentVm.doNotShareClinicalDocumentSectionTypeCodes = [];
                    CreateConsentVm.shareForPurposeOfUseCodes = [];
                    CreateConsentVm.consentStart = null;
                    CreateConsentVm.consentEnd = null;
                }

                CreateConsentVm.createConsent = function(){

                    var consent = {
                        providersPermittedToDisclose :CreateConsentVm.authorizeProvider.npi,
                        providersDisclosureIsMadeTo: CreateConsentVm.disclosureProvider.npi,
                        doNotShareSensitivityPolicyCodes: CreateConsentVm.medicalInformation.doNotShareSensitivityPolicyCodes,
                        doNotShareClinicalDocumentSectionTypeCodes: CreateConsentVm.medicalInformation.doNotShareClinicalDocumentSectionTypeCodes,
                        shareForPurposeOfUseCodes: CreateConsentVm.shareForPurposeOfUseCodes,
                        consentStart: CreateConsentVm.dateRange.consentStart,
                        consentEnd: CreateConsentVm.dateRange.consentEnd
                    };

                    //On Success clear the references of the selected providers
                    ConsentService.resetSelectedNpi();

                    ConsentService.createConsent(consent,
                        function(response){

                                console.log("Success in creating consent");
                        },
                        function(error){
                            console.log("Error in creating consent");
                        }
                    );
                };

                CreateConsentVm.cancelConsent = function(){
                    console.log("Cancelling consent..");
                };

                CreateConsentVm.canSave = function(){
                    var authorizeDisclosure = angular.isDefined(CreateConsentVm.authorizeProvider) && angular.isDefined(CreateConsentVm.disclosureProvider);
                    var medicalInformation = angular.isDefined(CreateConsentVm.medicalInformation) && (angular.isDefined(CreateConsentVm.medicalInformation.doNotShareSensitivityPolicyCodes) || angular.isDefined(CreateConsentVm.medicalInformation.doNotShareSensitivityPolicyCodes));
                  return (authorizeDisclosure && medicalInformation &&  angular.isDefined(CreateConsentVm.shareForPurposeOfUseCodes));
                };
            }]
        };
    }

    function SelectProvider($modal, ProviderService, ConsentService) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/tmpl/consent-select-provider.tpl.html',
            scope: {
                modaltitle: "=",
                providers: "=",
                ngModel: '='
            },
            bindToController: true,
            controllerAs: 'SelectProviderVm',
            controller: ['$scope', 'ConsentService', '$modal', 'ProviderService', function ($scope, ConsentService, $modal, ProviderService) {
                var SelectProviderVm = this;
                SelectProviderVm.selectedProvider = SelectProviderVm.ngModel;

                SelectProviderVm.fieldplaceholder = SelectProviderVm.modaltitle === 'Authorize' ? "The following individual or organization" : "To disclose my information to";

                ProviderService.getProviders(function (response) {
                    SelectProviderVm.providers = response;
                }, function (error) {
                    console.log("Error: in getting providers");
                });

                function SelectProviderModalController($scope, $modalInstance, notificationService, data, ProviderService, ConsentService) {
                    $scope.title = data.modalTitle;
                    $scope.selectedProvider = { npi : (angular.isDefined(data.selectedProvider) && angular.isDefined(data.selectedProvider.npi))? data.selectedProvider.npi : '' };
                    $scope.providers = data.providers;
                    $scope.selectedNpi = ConsentService.getSelectedNpi();

                    $scope.isOrganizationProvider = function (provider) {
                        return ProviderService.isOrganizationProvider(provider);
                    };

                    $scope.isIndividualProvider = function (provider) {
                        return ProviderService.isIndividualProvider(provider);
                    };

                    $scope.isSelected = function(npi){
                            if( $scope.title === 'Authorize' ){
                                return  ($scope.selectedNpi.discloseNpi === npi);
                            }else if( $scope.title === 'Disclosure' ){
                                return  ($scope.selectedNpi.authorizeNpi === npi);
                            }
                    };

                    $scope.ok = function () {
                        $modalInstance.close();
                        var selectedProvider = ProviderService.getProviderByNPI(  $scope.providers ,$scope.selectedProvider.npi);
                        SelectProviderVm.ngModel = selectedProvider;
                        SelectProviderVm.selectedProvider = selectedProvider;

                        if( $scope.title === 'Authorize'){
                            ConsentService.setAuthorizeNpi(selectedProvider.npi);
                        }else {
                            ConsentService.setDiscloseNpi(selectedProvider.npi);
                        }

                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }

                SelectProviderVm.openSelectProviderModal = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/tmpl/consent-select-provider-modal.tpl.html',
                        resolve: {
                            data: function () {
                                return {
                                    modalTitle: SelectProviderVm.modaltitle,
                                    providers: SelectProviderVm.providers,
                                    selectedProvider:  SelectProviderVm.selectedProvider
                                };
                            }
                        },
                        controller: SelectProviderModalController
                    });
                };
            }],
        };
    }

    function MedicalInformation($modal, ConsentService) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/tmpl/consent-medical-information.tpl.html',
            scope: {
                data: "=",
                ngModel: '='
            },
            bindToController: true,
            controllerAs: 'MedicalInformationVm',
            controller: ['$scope', 'ConsentService', '$modal', function ($scope, ConsentService, $modal) {
                var MedicalInformationVm = this;
                //Test value to be replace with real value.
                MedicalInformationVm.medicalInformation = 'A';
                //Initiallizing the medical information model
                MedicalInformationVm.ngModel = {doNotShareSensitivityPolicyCodes : [],doNotShareClinicalDocumentSectionTypeCodes: []};

                ConsentService.getMedicalSection(function (response) {
                    MedicalInformationVm.medicatlSections = response;
                }, function (error) {
                    console.log("Error: in getting providers");
                });

                ConsentService.getSensitivityPolicies(function (response) {
                    MedicalInformationVm.sensitivityPolicies = response;
                }, function (error) {
                    console.log("Error: in getting providers");
                });

                MedicalInformationVm.clearMedicalInfoData = function(){
                    MedicalInformationVm.selectedMedicalSections = [];
                    MedicalInformationVm.selectedSensitivityPolicies = [];
                };

                function MedicalInformationModalController($scope, $modalInstance, data) {
                    $scope.mediactionSections = data.mediactionSections;
                    $scope.sensitivityPolicies = data.sensitivityPolicies;

                    $scope.consent = [];

                    $scope.consent.selectedMedicalSections = !angular.isDefined(MedicalInformationVm.selectedMedicalSections)? [] : ConsentService.getCodes(MedicalInformationVm.selectedMedicalSections);
                    $scope.consent.selectedSensitivityPolicies = !angular.isDefined(MedicalInformationVm.selectedSensitivityPolicies)? [] : ConsentService.getCodes(MedicalInformationVm.selectedSensitivityPolicies);

                    $scope.selectAllMedicalSections = function(){
                        $scope.consent.selectedMedicalSections = ConsentService.getCodes($scope.mediactionSections);
                    };

                    $scope.deselectAllMedicalSections = function(){
                        $scope.consent.selectedMedicalSections=[];
                    };

                    $scope.selectAllSensitivityPolicies = function(){
                        $scope.consent.selectedSensitivityPolicies = ConsentService.getCodes($scope.sensitivityPolicies);
                    };

                    $scope.deselectAllSensitivityPolicies = function(){
                        $scope.consent.selectedSensitivityPolicies=[];
                    };

                    $scope.ok = function () {
                        MedicalInformationVm.selectedMedicalSections = ConsentService.getEntitiesByCodes( $scope.mediactionSections, $scope.consent.selectedMedicalSections);
                        MedicalInformationVm.selectedSensitivityPolicies = ConsentService.getEntitiesByCodes( $scope.sensitivityPolicies, $scope.consent.selectedSensitivityPolicies);
                        MedicalInformationVm.ngModel = {
                            doNotShareSensitivityPolicyCodes : $scope.consent.selectedSensitivityPolicies ,
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
                        templateUrl: 'app/consent/tmpl/consent-medical-information-modal.tpl.html',

                        resolve: {
                            data: function () {
                                return {
                                   mediactionSections: MedicalInformationVm.medicatlSections,
                                   sensitivityPolicies: MedicalInformationVm.sensitivityPolicies
                                };
                            }
                        },
                        controller: MedicalInformationModalController
                    });
                };
            }],
        };
    }

    function PurposeOfUse(ConsentService, $modal) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/tmpl/consent-purpose-of-use.tpl.html',
            scope:{
                ngModel: "="
            },
            bindToController: true,
            controllerAs: 'PurposeOfUseVm',
            controller: ['$scope', 'ConsentService', '$modal', function ($scope, ConsentService, $modal) {
                var PurposeOfUseVm = this;

                ConsentService.getPurposeOfUse(function (response) {
                    PurposeOfUseVm.data = response;
                    var purposeOfUse = ConsentService.getDefaultPurposeOfUse(response);
                    //Getting default purpose of use code.
                    var code = purposeOfUse[0].code;
                    PurposeOfUseVm.selectedPurposeOfUse = purposeOfUse;
                    PurposeOfUseVm.ngModel = [code];
                }, function (error) {
                    console.log("Error: in getting providers");
                });

                function PurposeOfUseModalController($scope, $modalInstance, data) {

                    $scope.data = data;

                    $scope.consent = ConsentService.getPurposeOfUseCodes( PurposeOfUseVm.selectedPurposeOfUse);

                    $scope.selectAll = function(){
                        $scope.consent.selectedPurposeOfUseCodes = ConsentService.getCodes($scope.data);
                    };

                    $scope.deselectAll = function(){
                        $scope.consent.selectedPurposeOfUseCodes=[];
                    };

                    $scope.ok = function () {
                        PurposeOfUseVm.selectedPurposeOfUse = ConsentService.getEntitiesByCodes(  $scope.data, $scope.consent.selectedPurposeOfUseCodes);
                        PurposeOfUseVm.ngModel = $scope.consent.selectedPurposeOfUseCodes;
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }

                PurposeOfUseVm.openSelectPurposeModal = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/tmpl/consent-purpose-of-use-modal.tpl.html',
                        resolve: {
                            data: function () {
                                return PurposeOfUseVm.data;
                            }
                        },
                        controller: PurposeOfUseModalController
                    });
                };
            }]
        };
    }

    function ConsentTerm() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/tmpl/consent-term.tpl.html',
            scope: {
             ngModel: '='
            },
            bindToController: true,
            controllerAs: 'ConsentTermVm',
            controller: ['$scope', function ($scope) {
                var ConsentTermVm = this;
            }]
        };
    }

    function ConsentCard() {
        var directive = {
            scope: {consent: '='},
            restrict: 'E',
            templateUrl: 'app/consent/tmpl/consent-card.tpl.html',
            controller: ['$modal', 'ConsentService', 'notificationService', ConsentCardController],
            controllerAs: 'ConsentCardVm'
        };
        return directive;

        function ConsentCardController($modal, ConsentService, notificationService) {
            var ConsentCardVm = this;
            ConsentCardVm.openManageConsentModal = openManageConsentModal;
            ConsentCardVm.consentState = ConsentService.resolveConsentState;
            ConsentCardVm.isShareAll = ConsentService.isShareAll;
            ConsentCardVm.notDisclosedItems = notDisclosedItems;
            ConsentCardVm.purposeOfUseItems = purposeOfUseItems;

            function openManageConsentModal(consent) {
                $modal.open({
                    templateUrl: 'app/consent/tmpl/consent-list-manage-options-modal-' + ConsentService.resolveConsentState(consent) + '.tpl.html',
                    controller: ['$state', '$modalInstance', 'consent', ManageConsentModalController],
                    controllerAs: 'ManageConsentModalVm',
                    resolve: {
                        consent: function () {
                            return consent;
                        }
                    }
                });
            }

            function ManageConsentModalController($state, $modalInstance, consent) {
                var ManageConsentModalVm = this;
                ManageConsentModalVm.cancel = cancel;
                ManageConsentModalVm.revoke = revoke;
                ManageConsentModalVm.edit = edit;
                ManageConsentModalVm.deleteConsent = deleteConsent;
                ManageConsentModalVm.toggleDeleteConfirmation = toggleDeleteConfirmation;
                ManageConsentModalVm.deleteInProcess = false;

                function toggleDeleteConfirmation(){
                    ManageConsentModalVm.deleteInProcess = !ManageConsentModalVm.deleteInProcess;
                }

                function deleteConsent(){
                    ConsentService.deleteConsent(consent.id, onDeleteSuccess, onDeleteError);

                    function onDeleteSuccess(){
                        notificationService.success('Consent is successfully deleted');
                        $modalInstance.close();
                        $state.reload();
                    }
                    function onDeleteError(){
                        notificationService.error('Failed to delete the consent! Please try again later...');
                        cancel();
                    }
                }

                function edit(){
                    $state.go('consent.create', {consentId: consent.id});
                    $modalInstance.close();
                }

                function cancel() {
                    $modalInstance.dismiss('cancel');
                }

                function revoke() {
                    $state.go('consent.revoke', {consent: consent});
                    $modalInstance.close();
                }
            }

            function notDisclosedItems(consent) {
                return [].concat(consent.doNotShareClinicalDocumentSectionTypeCodes).concat(consent.doNotShareSensitivityPolicyCodes).join(', ');
            }

            function purposeOfUseItems(consent) {
                return consent.shareForPurposeOfUseCodes.join(', ');
            }
        }
    }

    function ConsentCardList() {
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/consent/tmpl/consent-card-list.tpl.html',
            controller: ['ConsentService', 'notificationService', 'utilityService', ConsentCardListController],
            controllerAs: 'ConsentCardListVm'
        };
        return directive;

        function ConsentCardListController(ConsentService, notificationService, utilityService) {
            var ConsentCardListVm = this;
            var oldPage = 1;
            ConsentCardListVm.consentList = {};
            ConsentCardListVm.pagination = {totalItems: 0, currentPage: oldPage, itemsPerPage: 5, maxSize: 10};
            ConsentCardListVm.loadPage = loadPage;

            ConsentCardListVm.loadPage();

            function updatePagination(response) {
                ConsentCardListVm.pagination.totalItems = response.totalItems;
                ConsentCardListVm.pagination.currentPage = response.currentPage;
                ConsentCardListVm.pagination.itemsPerPage = response.itemsPerPage;
            }

            function success(response) {
                oldPage = response.currentPage;
                updatePagination(response);
                ConsentCardListVm.consentList = response;
                utilityService.scrollTo('content_wrapper');
            }

            function error(response) {
                notificationService.error('Failed to get the consent list, please try again later...');
            }

            function loadPage() {
                var newPage = ConsentCardListVm.pagination.currentPage;
                ConsentCardListVm.pagination.currentPage = oldPage;
                ConsentService.listConsent(newPage, success, error);
            }
        }
    }

    angular.module("app.consentDirectives",
        [
            'app.consentServices',
            'app.providerService',
            'app.providerFiltersModule',
            'checklist-model'
        ])
        .directive('createConsent', CreateConsent)
        .directive('consentCard', ConsentCard)
        .directive('consentCardList', ConsentCardList)
        .directive('selectProvider', SelectProvider)
        .directive('medicalInformation', MedicalInformation)
        .directive('purposeOfUse', PurposeOfUse)
        .directive('consentTerm', ConsentTerm);
})();
