(function () {
    'use strict';

    /**
     * The Medical Documents Service
     */
    angular
        .module("app.medicalDocument")
        .factory('medicalDocumentsService', medicalDocumentsService);

    /* @ngInject */
    function medicalDocumentsService($resource, configService) {
        var medicalDocumentsResource = $resource(configService.getPcmApiBaseUrl() + "/clinicaldocuments/:id", {id: '@id'});
        var phrResource = $resource(configService.getPhrApiBaseUrl() + "/patients/healthInformation/publish");

        var service = {};
        service.downloadMedicalDocument = downloadMedicalDocument;
        service.deleteMedicalDocument = deleteMedicalDocument;
        service.uploadMedicalDocument = uploadMedicalDocument;
        service.uploadDocumentToHIE = uploadDocumentToHIE;

        return service;

        function medicalDocumentUploadResource() {
            return $resource(configService.getPcmApiBaseUrl() + "/clinicaldocuments", {},
                {
                    save: {
                        method: 'POST',
                        headers: {'Content-Type': undefined},
                        transformRequest: function (data) {
                            var formData = new FormData();
                            formData.append('file', data.file);
                            formData.append('name', data.name);
                            formData.append('description', data.description);
                            formData.append('documentType', data.documentType);

                            return formData;
                        }
                    }
                });
        }

        function downloadMedicalDocument(id, success, error) {
            return medicalDocumentsResource.get({id: id}, success, error);
        }

        function deleteMedicalDocument(id, success, error) {
            medicalDocumentsResource.delete({id: id}, success, error);
        }

        function uploadMedicalDocument(medicalDocument, success, error) {
            return medicalDocumentUploadResource().save(medicalDocument, success, error);
        }

        function uploadDocumentToHIE(document, success, error) {
            return phrResource.save(document, success, error);
        }
    }
})();