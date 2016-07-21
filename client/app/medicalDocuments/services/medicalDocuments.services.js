(function () {
    'use strict';

    /**
     * The Medical Documents Service
     *
     */
    angular
        .module("app.medicalDocument")
        .factory('medicalDocumentsService', medicalDocumentsService);

    /* @ngInject */
    function medicalDocumentsService($resource, envService) {
        var medicalDocumentsResource = $resource(envService.securedApis.pcmApiBaseUrl + "/clinicaldocuments/:id", {id: '@id'});
        var phrResource = $resource(envService.securedApis.phrApiBaseUrl + "/patients/healthInformation/publish");

        var service = {};
        service.downloadMedicalDocument = downloadMedicalDocument;
        service.deleteMedicalDocument = deleteMedicalDocument;
        service.uploadMedicalDocument = uploadMedicalDocument;
        service.uploadDocumentToHIEOS = uploadDocumentToHIEOS;

        return service;

        function medicalDocumentUploadResource() {
            return $resource(envService.securedApis.pcmApiBaseUrl + "/clinicaldocuments", {},
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

        function uploadDocumentToHIEOS(document, success, error) {
            return phrResource.save(document, success, error);
        }
    }
})();



