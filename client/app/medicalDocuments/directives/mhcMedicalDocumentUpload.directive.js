/**
 * Created by jiahao.li on 12/11/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.medicalDocument')
        .directive('mhcMedicalDocumentsUpload', mhcMedicalDocumentsUpload);

    function mhcMedicalDocumentsUpload() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/medicalDocuments/directives/medicalDocumentUpload.html',
            scope: {},
            bindToController: true,
            controller: MedicalDocumentUploadController,
            controllerAs: 'medicalDocumentsUploadVm'
        };
        return directive;
    }

    /* @ngInject */
    function MedicalDocumentUploadController($state, medicalDocumentsService, notificationService) {
        var vm = this;
        vm.extension = /\.xml$/;
        vm.uploadDocument = uploadDocument;

        function prepareMedicalDocument() {
            return {
                file: vm.medicalFile,
                name: vm.name,
                description: vm.description,
                documentType: vm.documentType
            };
        }

        function uploadDocumentSuccess(response) {
            $state.go($state.current, {}, {reload: true});
            notificationService.success('Success in uploading medical document');
        }

        function uploadDocumentError(error) {
            notificationService.error('Error in uploading medical document');
        }

        function uploadDocument() {
            var medicalDocument = prepareMedicalDocument();

            if (angular.isUndefined(medicalDocument.description)) {
                medicalDocument.description = '';
            }
            medicalDocumentsService.uploadMedicalDocument(medicalDocument, uploadDocumentSuccess, uploadDocumentError);
        }
    }
})();