
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('ppConsentCard', ppConsentCard);

            function ppConsentCard() {
                var directive = {
                    bindToController: {consent: '='},
                    restrict: 'E',
                    templateUrl: 'app/consent/directives/consentCard.html',
                    controller: ['$modal', 'consentService', 'notificationService', ConsentCardController],
                    controllerAs: 'consentCardVm'
                };
                return directive;
            }

            /* @ngInject */
            function ConsentCardController($modal, consentService, notificationService) {
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
                        controllerAs: 'ManageConsentModalVm',
                        resolve: {
                            consent: function () {
                                return vm.consent;
                            }
                        }
                    });

                    /* @ngInject */
                    function ManageConsentModalController($state, $modalInstance, consent) {
                        var ManageConsentModalVm = this;
                        ManageConsentModalVm.cancel = cancel;
                        ManageConsentModalVm.revoke = revoke;
                        ManageConsentModalVm.edit = edit;
                        ManageConsentModalVm.signConsent = signConsent;
                        ManageConsentModalVm.deleteConsent = deleteConsent;
                        ManageConsentModalVm.toggleDeleteConfirmation = toggleDeleteConfirmation;
                        ManageConsentModalVm.deleteInProcess = false;

                        function toggleDeleteConfirmation() {
                            ManageConsentModalVm.deleteInProcess = !ManageConsentModalVm.deleteInProcess;
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
                    }
                }
            }
})();