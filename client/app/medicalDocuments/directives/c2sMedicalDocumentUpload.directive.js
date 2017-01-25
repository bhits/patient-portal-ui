/**
 * Created by jiahao.li on 12/11/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.medicalDocument')
        .directive('c2sMedicalDocumentsUpload', c2sMedicalDocumentsUpload);

    function c2sMedicalDocumentsUpload() {
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
            if (isEnglish()) {
                notificationService.success('Success in uploading medical document');
            } else {
                notificationService.success('El documento médico fue subido');
            }

        }

        function uploadDocumentError(error) {
            var uploadDocumentException = error.data.exception;
            if (uploadDocumentException.indexOf('InvalidClinicalDocumentException') !== -1) {
                if (isEnglish()) {
                    notificationService.error('Whoops, something is wrong with this document');
                } else {
                    notificationService.error('Whoops, detectamos problemas con este documento');
                }
            } else {
                if (isEnglish()) {
                    notificationService.error('Sorry, your document could not be uploaded at this time');
                } else {
                    notificationService.error('Lo sentimos, su documento no pudo ser subido');
                }
            }
        }

        function uploadDocument() {
            var medicalDocument = prepareMedicalDocument();

            if (angular.isUndefined(medicalDocument.description)) {
                medicalDocument.description = '';
            }
            medicalDocumentsService.uploadMedicalDocument(medicalDocument, uploadDocumentSuccess, uploadDocumentError);
        }

        function isEnglish() {
            var language = window.localStorage.lang || 'en';
            if (language.substring(0, 2) === 'en') {
                return true;
            }
            return false;
        }
    }
})();