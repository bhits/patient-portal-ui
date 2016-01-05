/**
 * Created by jiahao.li on 12/11/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.medicalDocument')
        .directive("ppUploadedDocuments", ppUploadedDocuments);

    function ppUploadedDocuments() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/medicalDocuments/directives/medicalDocumentUploadedDocuments.html',
            scope: {
                medicaldocumentslist:'='
            },
            bindToController: true,
            controller: ['$state', '$modal', 'medicalDocumentsService', 'notificationService', UploadedDocumentController],
            controllerAs: 'uploadedDocumentVm'
        };
        return directive;
    }
    /* @ngInject */
    function UploadedDocumentController($state, $modal, medicalDocumentsService, notificationService) {
        var vm = this;
        vm.downloadFile = downloadFile;
        vm.openDeleteMedicalDocumentModal = openDeleteMedicalDocumentModal;

        function downloadFile(medicalDocument) {
            medicalDocumentsService.downloadMedicalDocument(medicalDocument.id)
                .then(function(){
                    notificationService.success('Success in downloading medical document');
                }, function() {
                    notificationService.error('Error in downloading medical document');
                });
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
            function MedicalDocumentModalDeleteController ($modalInstance, medicalDocument) {
                var vm = this;
                vm.id = medicalDocument.id;
                vm.medicalDocument = medicalDocument;

                vm.delete = function () {
                    medicalDocumentsService.deleteMedicalDocument(vm.id,
                        function(data){
                            $state.go($state.current, {}, {reload: true});
                            notificationService.success('Success in deleting medical document');
                        },
                        function(data){
                            notificationService.error('Error in deleting medical document');
                        }
                    );
                    $modalInstance.close();
                };
                vm.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        }
    }
})();