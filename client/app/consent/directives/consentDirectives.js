/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function () {

    'use strict';

    function CreateConsent($stateParams) {
        return {
            restrict: 'E',
            templateUrl: 'app/consent/tmpl/consent-create-edit.tpl.html',
            scope: {
                providers: "=",
                purposeofuse: "=",
                medicalsections: "=",
                sensitivitypolicies: "=",
                consent:"="
            },
            controllerAs: 'CreateConsentVm',
            bindToController: true,
            controller: ['ConsentService', '$stateParams', 'ProviderService','notificationService','$state', '$modal', function (ConsentService, $stateParams, ProviderService, notificationService, $state, $modal) {
                var CreateConsentVm = this;
                CreateConsentVm.authorize = "Authorize";
                CreateConsentVm.disclosure = "Disclosure";
                CreateConsentVm.dateRange = {consentStart: "", consentEnd: ""};

                CreateConsentVm.medicalInformation = {doNotShareSensitivityPolicyCodes: [], doNotShareClinicalDocumentSectionTypeCodes: []};

                if(angular.isDefined($stateParams.consentId) && $stateParams.consentId.length > 0){
                    CreateConsentVm.isEditMode = angular.isDefined($stateParams.consentId.length)? true :false;
                    CreateConsentVm.disclosureProvider = (ProviderService.getProviderByNpis(CreateConsentVm.providers, CreateConsentVm.consent.providersDisclosureIsMadeToNpi,  CreateConsentVm.consent.organizationalProvidersDisclosureIsMadeToNpi))[0];
                    CreateConsentVm.authorizeProvider = (ProviderService.getProviderByNpis(CreateConsentVm.providers, CreateConsentVm.consent.providersPermittedToDiscloseNpi,  CreateConsentVm.consent.organizationalProvidersPermittedToDiscloseNpi))[0];
                    CreateConsentVm.medicalInformation.doNotShareSensitivityPolicyCodes = CreateConsentVm.consent.doNotShareSensitivityPolicyCodes;
                    CreateConsentVm.medicalInformation.doNotShareClinicalDocumentSectionTypeCodes = CreateConsentVm.consent.doNotShareClinicalDocumentSectionTypeCodes;
                    CreateConsentVm.shareForPurposeOfUseCodes = CreateConsentVm.consent.shareForPurposeOfUseCodes;
                    CreateConsentVm.dateRange = {consentStart: CreateConsentVm.consent.consentStart, consentEnd: CreateConsentVm.consent.consentEnd} ;

                }else{
                    CreateConsentVm.authorizeProvider = {};
                    CreateConsentVm.disclosureProvider = {};
                    CreateConsentVm.shareForPurposeOfUseCodes = [];
                    CreateConsentVm.dateRange = {consentStart: "", consentEnd:""} ;
                }

                var prepareConsent = function(){
                    var providersDisclosureIsMadeToNpi = ProviderService.getIndividualProvidersNpi([CreateConsentVm.disclosureProvider]);
                    var providersPermittedToDiscloseNpi = ProviderService.getIndividualProvidersNpi([CreateConsentVm.authorizeProvider]);
                    var organizationalProvidersPermittedToDiscloseNpi = ProviderService.getOrganizationalProvidersNpi([CreateConsentVm.authorizeProvider]);
                    var organizationalProvidersDisclosureIsMadeToNpi = ProviderService.getOrganizationalProvidersNpi([CreateConsentVm.disclosureProvider]);

                    var consent = {
                        providersPermittedToDiscloseNpi :providersPermittedToDiscloseNpi  ,
                        providersDisclosureIsMadeToNpi: providersDisclosureIsMadeToNpi,
                        organizationalProvidersDisclosureIsMadeToNpi: organizationalProvidersDisclosureIsMadeToNpi ,
                        organizationalProvidersPermittedToDiscloseNpi: organizationalProvidersPermittedToDiscloseNpi,
                        doNotShareSensitivityPolicyCodes: CreateConsentVm.medicalInformation.doNotShareSensitivityPolicyCodes,
                        doNotShareClinicalDocumentSectionTypeCodes: CreateConsentVm.medicalInformation.doNotShareClinicalDocumentSectionTypeCodes,
                        shareForPurposeOfUseCodes: CreateConsentVm.shareForPurposeOfUseCodes,
                        consentStart: CreateConsentVm.dateRange.consentStart,
                        consentEnd: CreateConsentVm.dateRange.consentEnd
                    };

                    return consent;
                };

                CreateConsentVm.createConsent = function(){

                    var consent = prepareConsent();

                    //On Success clear the references of the selected providers
                    ConsentService.resetSelectedNpi();

                    ConsentService.createConsent(consent,
                        function(response){
                            notificationService.success("Success in updating consent.");
                            $state.go('consent.list');
                        },
                        function(error){
                            if(error.status === 409){
                                notificationService.warn("Error you cannot create duplicate consent.");
                            }else{
                                notificationService.error("Error in creating consent");
                            }
                        }
                    );
                };

                CreateConsentVm.updateConsent = function(){
                    var consent = prepareConsent();
                    //consent.id = $stateParams.consentId;

                    ConsentService.updateConsent(
                        consent,
                        function(response){
                            notificationService.success("Success in creating consent.");
                            $state.go('consent.list');
                        },
                        function(error){
                            if(error.status === 409){
                                notificationService.warn("Error you cannot create duplicate consent.");
                            }else{
                                notificationService.error("Error in updating consent.");
                            }

                        }
                    );
                };

                CreateConsentVm.cancelConsent = function(){
                    console.log("Cancelling consent..");
                    $modal.open({
                        templateUrl: 'app/consent/tmpl/consent-create-edit-cancel-modal.tpl.html',
                        controller: ['$modalInstance', '$state', CancelCreateEditConsentModalController],
                        controllerAs: 'CancelCreateEditConsentModalVm'
                    });

                    function CancelCreateEditConsentModalController($modalInstance, $state){
                        var CancelCreateEditConsentModalVm = this;
                        CancelCreateEditConsentModalVm.cancel = cancel;
                        CancelCreateEditConsentModalVm.discard = discard;

                        function cancel(){
                            $modalInstance.dismiss('cancel');
                        }

                        function discard(){
                            cancel();
                            $state.go('consent.list');
                        }
                    }
                };

                CreateConsentVm.canSave = function(){
                    var authorizeDisclosure = angular.isDefined(CreateConsentVm.authorizeProvider.npi) && angular.isDefined(CreateConsentVm.disclosureProvider.npi);
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
            controller: ['$scope', 'ConsentService', '$modal', 'ProviderService', 'notificationService', function ($scope, ConsentService, $modal, ProviderService, notificationService) {
                var SelectProviderVm = this;
                SelectProviderVm.selectedProvider = SelectProviderVm.ngModel;
                SelectProviderVm.fieldplaceholder = SelectProviderVm.modaltitle === 'Authorize' ? "The following individual or organization" : "To disclose my information to";

                function SelectProviderModalController($scope, $modalInstance, notificationService, data, ProviderService, ConsentService) {
                    $scope.title = data.modalTitle;
                    $scope.selectedProvider = { npi : ((data.selectedProvider!== null) &&angular.isDefined(data.selectedProvider) && angular.isDefined(data.selectedProvider.npi))? data.selectedProvider.npi : '' };
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
                ngModel: '=',
                medicalsections:"=",
                sensitivitypolicies:"="
            },
            bindToController: true,
            controllerAs: 'MedicalInformationVm',
            controller: ['$scope', 'ConsentService', '$modal','notificationService', function ($scope, ConsentService, $modal, notificationService) {
                var MedicalInformationVm = this;
                //Test value to be replace with real value.
                MedicalInformationVm.medicalInformation = 'A';
                //Initiallizing the medical information model
                MedicalInformationVm.selectedMedicalSections = ConsentService.getLookupEntities(MedicalInformationVm.medicalsections, MedicalInformationVm.ngModel.doNotShareClinicalDocumentSectionTypeCodes );
                MedicalInformationVm.selectedSensitivityPolicies = ConsentService.getLookupEntities(MedicalInformationVm.sensitivitypolicies, MedicalInformationVm.ngModel.doNotShareSensitivityPolicyCodes );

                //MedicalInformationVm.ngModel = {doNotShareSensitivityPolicyCodes : [],doNotShareClinicalDocumentSectionTypeCodes: []};
                MedicalInformationVm.hasException = function(){
                    return ((MedicalInformationVm.selectedMedicalSections.length > 0 ) || (MedicalInformationVm.selectedSensitivityPolicies.length > 0) || (MedicalInformationVm.medicalInformation === 'B') );
                };

                MedicalInformationVm.clearMedicalInfoData = function(){
                    MedicalInformationVm.medicalInformation = 'A';
                    MedicalInformationVm.selectedMedicalSections = [];
                    MedicalInformationVm.selectedSensitivityPolicies = [];
                };

                function MedicalInformationModalController($scope, $modalInstance, data) {
                    $scope.mediactionSections = data.mediactionSections;
                    $scope.sensitivityPolicies = data.sensitivityPolicies;

                    $scope.consent = [];

                    $scope.consent.selectedMedicalSections = !angular.isDefined(MedicalInformationVm.selectedMedicalSections)? [] : ConsentService.getCodes(MedicalInformationVm.selectedMedicalSections);
                    $scope.consent.selectedSensitivityPolicies = !angular.isDefined(MedicalInformationVm.selectedSensitivityPolicies)? [] : ConsentService.getCodes(MedicalInformationVm.selectedSensitivityPolicies);

                    $scope.$watch("MedicalInformationVm.selectedMedicalSections", function(arg){
                        $scope.consent.selectedMedicalSections = [];
                    });

                    $scope.$watch("MedicalInformationVm.selectedSensitivityPolicies", function(arg){
                        $scope.consent.selectedSensitivityPolicies = [];
                    });


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
                                   mediactionSections: MedicalInformationVm.medicalsections,
                                   sensitivityPolicies: MedicalInformationVm.sensitivitypolicies
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
                ngModel: "=",
                purposeofuse:"="
            },
            bindToController: true,
            controllerAs: 'PurposeOfUseVm',
            controller: ['$scope', 'ConsentService', '$modal', 'notificationService', function ($scope, ConsentService, $modal, notificationService) {
                var PurposeOfUseVm = this;
                //var purposeOfUse = ConsentService.getDefaultPurposeOfUse(PurposeOfUseVm.purposeofuse, PurposeOfUseVm.ngModel);
                //
                ////Getting default purpose of use code.
                //var code = purposeOfUse[0].code;
                PurposeOfUseVm.selectedPurposeOfUse = ConsentService.getDefaultPurposeOfUse(PurposeOfUseVm.purposeofuse, PurposeOfUseVm.ngModel);
                //PurposeOfUseVm.ngModel = [code];

                function PurposeOfUseModalController($scope, $modalInstance, data) {
                    $scope.data = data;
                    $scope.consent = { selectedPurposeOfUseCodes: ConsentService.getCodes(PurposeOfUseVm.selectedPurposeOfUse)};

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
                                return PurposeOfUseVm.purposeofuse;
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
                ConsentTermVm.daterange = ConsentTermVm.ngModel;
            }]
        };
    }

    function ConsentCard() {
        var directive = {
            scope: {consent: '='},
            bindToController: true,
            restrict: 'E',
            templateUrl: 'app/consent/tmpl/consent-card.tpl.html',
            controller: ['$modal', 'ConsentService', 'notificationService', ConsentCardController],
            controllerAs: 'ConsentCardVm'
        };
        return directive;

        function ConsentCardController($modal, ConsentService, notificationService) {
            var ConsentCardVm = this;
            ConsentCardVm.openManageConsentModal = openManageConsentModal;
            ConsentCardVm.consentState = consentState;
            ConsentCardVm.isShareAll = isShareAll;
            ConsentCardVm.notDisclosedItems = notDisclosedItems;
            ConsentCardVm.purposeOfUseItems = purposeOfUseItems;
            ConsentCardVm.collapsed = true;
            ConsentCardVm.toggleCollapse = toggleCollapse;

            function toggleCollapse(){
                ConsentCardVm.collapsed = !ConsentCardVm.collapsed;
            }

            function isShareAll(){
                return ConsentService.isShareAll(ConsentCardVm.consent);
            }

            function consentState(){
                return ConsentService.resolveConsentState(ConsentCardVm.consent);
            }

            function notDisclosedItems() {
                return [].concat(ConsentCardVm.consent.doNotShareClinicalDocumentSectionTypeCodes).concat(ConsentCardVm.consent.doNotShareSensitivityPolicyCodes).join(', ');
            }

            function purposeOfUseItems() {
                return ConsentCardVm.consent.shareForPurposeOfUseCodes.join(', ');
            }

            function openManageConsentModal() {
                $modal.open({
                    templateUrl: 'app/consent/tmpl/consent-list-manage-options-modal-' + ConsentService.resolveConsentState(ConsentCardVm.consent) + '.tpl.html',
                    controller: ['$state', '$modalInstance', 'consent', ManageConsentModalController],
                    controllerAs: 'ManageConsentModalVm',
                    resolve: {
                        consent: function () {
                            return ConsentCardVm.consent;
                        }
                    }
                });

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
                            $state.reload();
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
            }
        }
    }

    function ConsentCardList() {
        var directive = {
            restrict: 'E',
            scope: {
                consentList: '='
            },
            bindToController: true,
            templateUrl: 'app/consent/tmpl/consent-card-list.tpl.html',
            controller: ['ConsentService', 'notificationService', 'utilityService', ConsentCardListController],
            controllerAs: 'ConsentCardListVm'
        };
        return directive;

        function ConsentCardListController(ConsentService, notificationService, utilityService) {
            var ConsentCardListVm = this;
            var oldPage = ConsentCardListVm.consentList.currentPage;
            ConsentCardListVm.pagination = {totalItems: ConsentCardListVm.consentList.totalItems, currentPage: oldPage, itemsPerPage: ConsentCardListVm.consentList.itemsPerPage, maxSize: 10};
            ConsentCardListVm.loadPage = loadPage;
            ConsentCardListVm.hasConsents = hasConsents;

            function hasConsents(){
                return utilityService.isNotEmpty(ConsentCardListVm.consentList.consentList);
            }

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

    function RevokeConsent(){
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/consent/tmpl/consent-revoke-confirmation.tpl.html',
            controller: ['$stateParams', '$state', RevokeConsentController],
            controllerAs: 'RevokeConsentVm'
        };
        return directive;

        function RevokeConsentController($stateParams, $state){
            var RevokeConsentVm = this;
            RevokeConsentVm.params = $stateParams;
            RevokeConsentVm.cancel = cancel;

            if (angular.isUndefined(RevokeConsentVm.params) || angular.equals(RevokeConsentVm.params.consent, {})) {
                cancel();
            }

            function cancel() {
                $state.go('consent.list');
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
        .directive('revokeConsent', RevokeConsent)
        .directive('selectProvider', SelectProvider)
        .directive('medicalInformation', MedicalInformation)
        .directive('purposeOfUse', PurposeOfUse)
        .directive('consentTerm', ConsentTerm);
})();
