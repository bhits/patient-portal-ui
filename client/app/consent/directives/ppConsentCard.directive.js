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

            if (state.length !== 0) {
                var result = (consentService.resolveConsentState(vm.consent) === state);
                return result;
            } else {
                return consentService.resolveConsentState(vm.consent);
            }
        }

        function notDisclosedItems() {
            return [].concat(vm.consent.doNotShareSensitivityPolicyCodes).join(', ');
        }

        function purposeOfUseItems() {
            return vm.consent.shareForPurposeOfUseCodes.join(', ');
        }

        function openManageConsentModal() {
            var consentState = consentService.resolveConsentState(vm.consent);
            $modal.open({
                templateUrl: 'app/consent/directives/consentListManageOptionsModal' + consentState + '.html',
                controller: ManageConsentModalController,
                controllerAs: 'manageConsentModalVm',
                resolve: {
                    consent: function () {
                        return vm.consent;
                    },
                    consentState: function () {
                        return consentState;
                    }
                }
            });
        }
    }

    // FIXME: remove Profile from dependencies once Try Policy implements security
    /* @ngInject */
    function ManageConsentModalController($window, $state, $modalInstance, profileService, consent, consentService, notificationService, envService, dataService, utilityService, consentState) {
        var manageConsentModalVm = this;
        manageConsentModalVm.cancel = cancel;
        manageConsentModalVm.option = "manageConcent";
        manageConsentModalVm.revoke = revoke;
        manageConsentModalVm.edit = edit;
        manageConsentModalVm.viewAttestation = viewAttestation;
        manageConsentModalVm.signConsent = signConsent;
        manageConsentModalVm.deleteConsent = deleteConsent;
        manageConsentModalVm.toggleDeleteConfirmation = toggleDeleteConfirmation;
        manageConsentModalVm.applyTryMyPolicy = applyTryMyPolicy;
        manageConsentModalVm.setOption = setOption;
        manageConsentModalVm.exportConsentDirective = exportConsentDirective;
        manageConsentModalVm.downloadUnattestedConsent = downloadUnattestedConsent;
        manageConsentModalVm.downloadAttestedConsent = downloadAttestedConsent;
        manageConsentModalVm.deleteInProcess = false;
        manageConsentModalVm.shareForPurposeOfUse = consent.shareForPurposeOfUse;
        manageConsentModalVm.purposeOfUseCode = consent.shareForPurposeOfUse[0].code; // set default purpose of use.
        manageConsentModalVm.onCompleteAttestationRevocation = onCompleteAttestationRevocation;
        manageConsentModalVm.downloadAttestedConsentRevocation = downloadAttestedConsentRevocation;

        activate();

        function activate() {
            dataService.listMedicalDocuments(function (response) {
                manageConsentModalVm.medicalDocuments = response;
                manageConsentModalVm.selMedicalDocumentId = getFirstMedicalDocument(manageConsentModalVm.medicalDocuments);
            }, function (error) {
                notificationService.error('Error in getting list of documents for current user.');
            });
        }

        function getFirstMedicalDocument(document) {
            if (angular.isDefined(manageConsentModalVm.medicalDocuments) && (manageConsentModalVm.medicalDocuments.length > 0)) {
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

        function edit() {
            $state.go('fe.consent.create', {consentId: consent.id});
            $modalInstance.close();
        }

        function viewAttestation() {
            $state.go('fe.consent.esignature', {consentId: consent.id});
            $modalInstance.close();
        }

        function signConsent() {
            $state.go('fe.consent.sign', {consentId: consent.id});
            $modalInstance.close();
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

        function revoke() {
            consentService.getConsentRevokeAttestation(consent.id, onRevokeSuccess, onRevokeError);
            function onRevokeSuccess(response) {
                $state.go('fe.consent.revoke', {consent: consent, revokeAttestation: response});
                $modalInstance.close();
            }

            function onRevokeError() {
                notificationService.error("Error on getting consent revocation page");
            }
        }

        function applyTryMyPolicy() {
            $modalInstance.close();
            consentService.getTryPolicyXHTML(prepareRequestData(), tryPolicySuccess, tryPolicyError);
        }

        function tryPolicySuccess(response) {
            var encodedDocument = response.document;
            var decodedDocument = atob(encodedDocument);
            var windowSpecs = 'toolbar=no, status=no, scrollbars=yes, resizable=yes, height = ' + screen.height + ', width = ' + screen.width;
            var viewer = $window.open('', '_blank', windowSpecs);
            viewer.document.open().write(decodedDocument);
        }

        function tryPolicyError(response) {
            console.log(response);
        }

        function prepareRequestData() {
            if (angular.isDefined(manageConsentModalVm.selMedicalDocumentId) && angular.isDefined(consent.id) && angular.isDefined(manageConsentModalVm.purposeOfUseCode)) {
                return {
                    patientUserName: profileService.getUserName(),
                    patientId: profileService.getUserId(),
                    documentId: manageConsentModalVm.selMedicalDocumentId,
                    consentId: consent.id,
                    purposeOfUseCode: manageConsentModalVm.purposeOfUseCode
                };
            } else {
                notificationService.error("Insufficient parameters to apply try my policy.");
            }
        }

        function setOption(option) {
            manageConsentModalVm.option = option;
        }

        function exportConsentDirective() {
            consentService.exportConsentDirective(consent.id,
                function (response) {
                    var xmlString = response.data;
                    utilityService.downloadFile(xmlString, "consentDirective" + consent.id + ".xml", "application/xml;");
                    notificationService.success('Consent directive is successfully downloaded.');
                    $modalInstance.close();
                    $state.reload();
                },
                function (response) {
                    notificationService.error('Failed to download the consent directive! Please try again later...');
                    cancel();
                    $state.reload();
                }
            );
        }

        function downloadUnattestedConsent(docType) {
            var fileName = profileService.getName() + " " + docType + " Consent" + consent.id;

            function success(data) {
                utilityService.downloadFile(data, fileName, 'application/pdf');
            }

            function error(respone) {
                notificationService.error("Error in downloading " + consentState + "consent.");
            }

            consentService.downloadUnAttestedConsentPdf(consent.id, success, error);
        }

        function downloadAttestedConsent(docType) {
            var fileName = profileService.getName() + " " + docType + " Consent" + consent.id;

            function success(data) {
                utilityService.downloadFile(data, fileName, 'application/pdf');
            }

            function error(respone) {
                notificationService.error("Error in downloading " + consentState + "consent.");
            }

            consentService.downloadAttestedConsentPdf(consent.id, success, error);
        }

        function downloadAttestedConsentRevocation(docType) {
            var fileName = profileService.getName() + " " + docType + " Consent" + consent.id;

            function success(data) {
                utilityService.downloadFile(data, fileName, 'application/pdf');
            }

            function error(respone) {
                notificationService.error("Error in downloading " + consentState + "consent.");
            }

            consentService.downloadAttestedConsentRevocationPdf(consent.id, success, error);
        }

        function onCompleteAttestationRevocation() {
            var success = function (response) {
                console.log("OK");
            };

            var error = function (response) {
                console.log("Error");
            };
            consentService.createAttestedConsentRevocation(consent.id, true, success, error);
        }
    }
})();