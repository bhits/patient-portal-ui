
(function () {
    'use strict';

    angular
        .module('app.consent')
            .directive('ppConsentCard', ppConsentCard);

            function ppConsentCard() {
                var directive = {
                    scope: {},
                    bindToController: {consent: '='},
                    restrict: 'E',
                    templateUrl: 'app/consent/directives/consentCard.html',
                    controller: ConsentCardController,
                    controllerAs: 'consentCardVm'
                };
                return directive;
            }

            /* @ngInject */
            function ConsentCardController($modal, consentService) {
                var vm = this;
                vm.openManageConsentModal = openManageConsentModal;
                vm.consentState = consentState;
                vm.isShareAll = isShareAll;
                vm.notDisclosedItems = notDisclosedItems;
                vm.purposeOfUseItems = purposeOfUseItems;
                vm.collapsed = true;
                vm.toggleCollapse = toggleCollapse;

                function toggleCollapse() {
                    vm.collapsed = !vm.collapsed;
                }

                function isShareAll() {
                    return consentService.isShareAll(vm.consent);
                }

                function consentState(state) {

                    if(state.length !== 0){
                        var result = (consentService.resolveConsentState(vm.consent) === state);
                        return result;
                    }else{
                        return consentService.resolveConsentState(vm.consent);
                    }
                }

                function notDisclosedItems() {
                    return [].concat(vm.consent.doNotShareClinicalDocumentSectionTypeCodes).concat(vm.consent.doNotShareSensitivityPolicyCodes).join(', ');
                }

                function purposeOfUseItems() {
                    return vm.consent.shareForPurposeOfUseCodes.join(', ');
                }

                function openManageConsentModal() {
                    $modal.open({
                        templateUrl: 'app/consent/directives/consentListManageOptionsModal' + consentService.resolveConsentState(vm.consent) + '.html',
                        controller: ManageConsentModalController,
                        controllerAs: 'manageConsentModalVm',
                        resolve: {
                            consent: function () {
                                return vm.consent;
                            }
                        }
                    });
                }
            }

            /* @ngInject */
            function ManageConsentModalController($window, $state, $modalInstance, consent, consentService, notificationService, envService, dataService) {
                var manageConsentModalVm = this;
                manageConsentModalVm.cancel = cancel;
                manageConsentModalVm.option = "manageConcent";
                manageConsentModalVm.revoke = revoke;
                manageConsentModalVm.edit = edit;
                manageConsentModalVm.signConsent = signConsent;
                manageConsentModalVm.deleteConsent = deleteConsent;
                manageConsentModalVm.toggleDeleteConfirmation = toggleDeleteConfirmation;
                manageConsentModalVm.applyTryMyPolicy = applyTryMyPolicy;
                manageConsentModalVm.setOption = setOption;
                manageConsentModalVm.deleteInProcess = false;
                manageConsentModalVm.shareForPurposeOfUse = consent.shareForPurposeOfUse;
                manageConsentModalVm.purposeOfUseCode = consent.shareForPurposeOfUse[0].code; // set default purpose of use.

                activate();

                function activate(){
                    dataService.listMedicalDocuments(function(response){
                        manageConsentModalVm.medicalDocuments = response;
                        manageConsentModalVm.selMedicalDocumentId =  getFirstMedicalDocument(manageConsentModalVm.medicalDocuments);
                    }, function(error){
                        notificationService.error('Error in getting list of documents for current user.');
                    });
                }

                function getFirstMedicalDocument(document){
                    if(angular.isDefined(manageConsentModalVm.medicalDocuments) && (manageConsentModalVm.medicalDocuments.length >0)){
                        return manageConsentModalVm.medicalDocuments[0].id;
                    }
                }

                function toggleDeleteConfirmation() {
                    manageConsentModalVm.deleteInProcess = !manageConsentModalVm.deleteInProcess;
                }

                function deleteConsent() {
                    consentService.deleteConsent(consent.id, onDeleteSuccess, onDeleteError);

                    function onDeleteSuccess() {
                        notificationService.success('Consent is successfully deleted');
                        $modalInstance.close();
                        $state.reload();
                    }

                    function onDeleteError() {
                        notificationService.error('Failed to delete the consent! Please try again later...');
                        cancel();
                        $state.reload();
                    }
                }

                function edit(){
                    $state.go('fe.consent.create', {consentId: consent.id});
                    $modalInstance.close();
                }

                function signConsent(){
                    $state.go('fe.consent.sign', {consentId: consent.id});
                    $modalInstance.close();
                }

                function cancel() {
                    $modalInstance.dismiss('cancel');
                }

                function revoke() {
                    $state.go('fe.consent.revoke', {consent: consent});
                    $modalInstance.close();
                }

                function applyTryMyPolicy() {
                    $modalInstance.close();

                    var ccdXml = "test";
                    if(angular.isDefined(manageConsentModalVm.selMedicalDocumentId) && angular.isDefined(consent.id) && angular.isDefined(manageConsentModalVm.purposeOfUseCode)){
                        var url = envService.securedApis.tryPolicyApiBaseUrl + "/tryPolicyByConsentIdXHTMLMock/" + manageConsentModalVm.selMedicalDocumentId + "/"+ consent.id +"/" +manageConsentModalVm.purposeOfUseCode;
                        $window.open(url, '_blank');
                    }else{
                        notificationService.error("Insufficient parameters to apply try my policy.");
                    }
                }

                function setOption(option) {
                    manageConsentModalVm.option = option;
                }

            }
})();