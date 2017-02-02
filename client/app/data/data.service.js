(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('dataService', dataService);

    /* @ngInject */
    function dataService($resource, configService) {
        var medicalDocumentsListResource = $resource(configService.getPcmApiBaseUrl() + "/clinicaldocuments");

        var service = {};
        service.listMedicalDocuments = listMedicalDocuments;

        return service;

        function listMedicalDocuments(success, error) {
            return medicalDocumentsListResource.query(success, error);
        }
    }
})();