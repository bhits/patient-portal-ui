
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('consentCard', ConsentCard);

            function ConsentCard() {
                var directive = {
                    scope: {consent: '='},
                    bindToController: true,
                    restrict: 'E',
                    templateUrl: 'app/consent/directives/consent-card.tpl.html',
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

                    function toggleCollapse() {
                        ConsentCardVm.collapsed = !ConsentCardVm.collapsed;
                    }

                    function isShareAll() {
                        return ConsentService.isShareAll(ConsentCardVm.consent);
                    }

                    function consentState() {
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
                            templateUrl: 'app/consent/directives/consent-list-manage-options-modal-' + ConsentService.resolveConsentState(ConsentCardVm.consent) + '.tpl.html',
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
                            ManageConsentModalVm.signConsent = signConsent;
                            ManageConsentModalVm.deleteConsent = deleteConsent;
                            ManageConsentModalVm.toggleDeleteConfirmation = toggleDeleteConfirmation;
                            ManageConsentModalVm.deleteInProcess = false;

                            function toggleDeleteConfirmation() {
                                ManageConsentModalVm.deleteInProcess = !ManageConsentModalVm.deleteInProcess;
                            }

                            function deleteConsent() {
                                ConsentService.deleteConsent(consent.id, onDeleteSuccess, onDeleteError);

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
            }
})();