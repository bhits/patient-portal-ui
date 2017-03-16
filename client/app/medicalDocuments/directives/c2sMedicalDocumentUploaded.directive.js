/**
 * Created by jiahao.li on 12/11/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.medicalDocument')
        .directive("c2sUploadedDocuments", c2sUploadedDocuments);

    function c2sUploadedDocuments() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/medicalDocuments/directives/medicalDocumentUploadedDocuments.html',

            scope: {},
            bindToController: {
                medicaldocumentslist: '='
            },
            controller: UploadedDocumentController,
            controllerAs: 'uploadedDocumentVm'
        };

        return directive;
    }

    /* @ngInject */
    function UploadedDocumentController($state, $modal, medicalDocumentsService, notificationService, utilityService) {
        var vm = this;
        vm.downloadFile = downloadFile;
        vm.uploadDocumentToHIE = uploadDocumentToHIE;
        vm.openDeleteMedicalDocumentModal = openDeleteMedicalDocumentModal;

        function downloadFile(medicalDocument) {
            medicalDocumentsService.downloadMedicalDocument(medicalDocument.id,
                function (response) {
                    utilityService.downloadFile(response.data, medicalDocument.name + ".xml", "application/xml");
                    if (isEnglish()) {
                        notificationService.success('Success in downloading medical document');
                    } else {
                        notificationService.success('El documento médico ha sido descargado');
                    }
                },
                function (err) {
                    if (isEnglish()) {
                        notificationService.error('Error in downloading medical document');
                    } else {
                        notificationService.error('El documento médico no puso ser descargado');
                    }

                }
            );
        }

        function uploadDocumentToHIE(medicalDocument) {
            var content = {document: medicalDocument.content};
            medicalDocumentsService.uploadDocumentToHIE(content,
                function (response) {
                    if (isEnglish()) {
                        notificationService.success('Success in publishing medical document to HIE.');
                    } else {
                        notificationService.success('El documento médico ha sido publicado en el HIE.');
                    }

                },
                function (err) {
                    if (isEnglish()) {
                        notificationService.error('Error in publishing medical document to HIE.');
                    } else {
                        notificationService.error('El documento médico no pudo ser publicado en el HIE.');
                    }
                }
            );
        }

        /* @ngInject */
        function openDeleteMedicalDocumentModal(medicalDocument, size) {
            $modal.open({
                templateUrl: 'app/medicalDocuments/directives/medicalDocumentDeleteModal.html',
                size: size,
                controllerAs: 'medicalDocumentModalDeleteVm',
                resolve: {
                    medicalDocument: function () {
                        return medicalDocument;
                    }
                },
                controller: MedicalDocumentModalDeleteController
            });

            /* @ngInject */
            function MedicalDocumentModalDeleteController($modalInstance, medicalDocument) {
                var vm = this;
                vm.id = medicalDocument.id;
                vm.medicalDocument = medicalDocument;

                vm.delete = function () {
                    medicalDocumentsService.deleteMedicalDocument(vm.id,
                        function (data) {
                            $state.go($state.current, {}, {reload: true});
                            if (isEnglish()) {
                                notificationService.success('Success in deleting medical document');
                            } else {
                                notificationService.success('El documento médico ha sido eliminado');
                            }
                        },
                        function (data) {
                            if (isEnglish()) {
                                notificationService.error('Error in deleting medical document');
                            } else {
                                notificationService.error('El documento médico no pudo ser eliminado');
                            }
                        }
                    );
                    $modalInstance.close();
                };
                vm.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        }

        function isEnglish() {
            var language = window.localStorage.lang || 'en';
            if (language.substring(0,2) === 'en') {
                return true;
            } else {
                return false;
            }
        }
    }

})();