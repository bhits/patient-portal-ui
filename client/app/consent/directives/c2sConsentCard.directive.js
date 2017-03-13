(function () {
    'use strict';

    angular
        .module('app.consent')
        .directive('c2sConsentCard', c2sConsentCard);

    function c2sConsentCard() {
        var directive = {
            scope: {},
            bindToController: {consent: '=', cardIndex: "="},
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
                return (consentService.resolveConsentState(vm.consent) === state);
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
            var templateFileName = mapToTemplateFileName(consentState);

            $modal.open({
                templateUrl: 'app/consent/directives/consentListManageOptionsModal' + templateFileName + '.html',
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

        function mapToTemplateFileName(consentState) {
            if (angular.equals(consentState, 'In Progress')) {
                return 'Saved';
            } else {
                return consentState;
            }
        }
    }

    /* @ngInject */
    function ManageConsentModalController($window, $state, $modalInstance, profileService, consent, consentService, notificationService, dataService, utilityService, consentState) {
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
                if (isEnglish()) {
                    notificationService.error('Error in getting list of documents for current user.');
                } else {
                    notificationService.error('No se pudo obtener la lista de consentimientos de este usuario.');
                }

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
                if (isEnglish()) {
                    notificationService.success('Consent is successfully deleted');
                } else {
                    notificationService.success('El consentimiento ha sido eliminado');
                }

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
            //var decodedDocument = atob(encodedDocument);
            var decodedDocument = b64DecodedUnicode (encodedDocument);
            var viewer = $window.open('', '_blank');
            viewer.document.open().write(decodedDocument);
        }

        // deal with non-ASCII characters of Spanish - Wentao
        function b64DecodedUnicode(str) {
            return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }

        function tryPolicyError(response) {
            notificationService.error("Error on viewing policies applied on medical document");
        }

        function prepareRequestData() {
            if (angular.isDefined(manageConsentModalVm.selMedicalDocumentId) && angular.isDefined(consent.id) && angular.isDefined(manageConsentModalVm.purposeOfUseCode)) {
                return {
                    documentId: manageConsentModalVm.selMedicalDocumentId,
                    consentId: consent.id,
                    purposeOfUseCode: manageConsentModalVm.purposeOfUseCode
                };
            } else {
                if (isEnglish()) {
                    notificationService.error("Insufficient parameters to apply try my policy.");
                } else {
                    notificationService.error("Parámetros insuficientes para usar Probar mi Politica.");
                }

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
                    if (isEnglish()) {
                        notificationService.success('Consent directive is successfully downloaded.');
                    } else {
                        notificationService.success('El consentimiento ha sido descargado.');
                    }

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

        function isEnglish () {
            var language = window.localStorage.lang || 'en';
            if (language.substring(0, 2) === 'en') {
                return true;
            }
            return false;
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