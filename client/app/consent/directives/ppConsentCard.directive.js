
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
            function ManageConsentModalController($window, $state, $modalInstance, consent, consentService, notificationService) {
                var manageConsentModalVm = this;
                manageConsentModalVm.cancel = cancel;
                manageConsentModalVm.option = "manageConcent";
                manageConsentModalVm.revoke = revoke;
                manageConsentModalVm.edit = edit;
                manageConsentModalVm.signConsent = signConsent;
                manageConsentModalVm.deleteConsent = deleteConsent;
                manageConsentModalVm.toggleDeleteConfirmation = toggleDeleteConfirmation;
                manageConsentModalVm.showConsentOptions = showConsentOptions;
                manageConsentModalVm.applyTryMyPolicy = applyTryMyPolicy;
                manageConsentModalVm.setOption = setOption;
                manageConsentModalVm.deleteInProcess = false;
                manageConsentModalVm.shareForPurposeOfUseCodes = consent.shareForPurposeOfUseCodes;
                manageConsentModalVm.purposeOfUse = consent.shareForPurposeOfUseCodes[0]; // set default purpose of use.

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

                function showConsentOptions() {

                }

                function applyTryMyPolicy() {
                    $modalInstance.close();
                    //$window.open('http://localhost:8080/tryPolicy/tryPolicyByConsentIdXMLMock', '_blank');

                    $state.go('fe.consent.trymypolicy', {ccdXml: "",consentId: consent.id, purposeOfUse: manageConsentModalVm.purposeOfUse });

                }

                function setOption(option) {
                    manageConsentModalVm.option = option;
                }

            }
})();