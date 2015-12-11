
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('ppConsentCard', ppConsentCard);

            function ppConsentCard() {
                var directive = {
                    scope: {consent: '='},
                    bindToController: true,
                    restrict: 'E',
                    templateUrl: 'app/consent/directives/consentCard.html',
                    controller: ['$modal', 'consentService', 'notificationService', ConsentCardController],
                    controllerAs: 'consentCardVm'
                };
                return directive;
            }

            /* @ngInject */
            function ConsentCardController($modal, consentService, notificationService) {
                var Vm = this;
                Vm.openManageConsentModal = openManageConsentModal;
                Vm.consentState = consentState;
                Vm.isShareAll = isShareAll;
                Vm.notDisclosedItems = notDisclosedItems;
                Vm.purposeOfUseItems = purposeOfUseItems;
                Vm.collapsed = true;
                Vm.toggleCollapse = toggleCollapse;

                function toggleCollapse() {
                    Vm.collapsed = !Vm.collapsed;
                }

                function isShareAll() {
                    return consentService.isShareAll(Vm.consent);
                }

                function consentState() {
                    return consentService.resolveConsentState(Vm.consent);
                }

                function notDisclosedItems() {
                    return [].concat(Vm.consent.doNotShareClinicalDocumentSectionTypeCodes).concat(Vm.consent.doNotShareSensitivityPolicyCodes).join(', ');
                }

                function purposeOfUseItems() {
                    return Vm.consent.shareForPurposeOfUseCodes.join(', ');
                }

                function openManageConsentModal() {
                    $modal.open({
                        templateUrl: 'app/consent/directives/consentListManageOptionsModal' + consentService.resolveConsentState(Vm.consent) + '.html',
                        controller: ManageConsentModalController,
                        controllerAs: 'ManageConsentModalVm',
                        resolve: {
                            consent: function () {
                                return Vm.consent;
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