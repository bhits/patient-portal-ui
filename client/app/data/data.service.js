(function () {
    'use strict';

    angular
        .module('app.data')
            .factory('dataService', dataService);

            /* @ngInject */
            function dataService($resource,envService) {
                var medicalDocumentsListResource = $resource(envService.securedApis.pcmApiBaseUrl + "/clinicaldocuments");

                var service = {};
                service.listMedicalDocuments = listMedicalDocuments;

                return service;

                function listMedicalDocuments(success, error) {
                    return medicalDocumentsListResource.query(success, error);
                }
            }
})();