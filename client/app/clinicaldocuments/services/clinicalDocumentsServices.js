(function () {
    'use strict';

    function ClinicalDocumentsService($resource, ENVService) {
        var clinicalDocumentsListResource = $resource(ENVService.securedApis.pcmApiBaseUrl + "/clinicaldocuments");
    }

    /**
     * The Clinical Documents Service
     *
     */
    angular.module("app.clinicalDocumentsServices", ['ngResource', 'app.config'])
        .factory('ClinicalDocumentsService', ClinicalDocumentsService);
})();



