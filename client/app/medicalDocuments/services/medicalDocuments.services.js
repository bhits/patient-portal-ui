(function () {
    'use strict';

    function MedicalDocumentsService($resource, ENVService) {
        var MedicalDocumentsListResource = $resource(ENVService.securedApis.pcmApiBaseUrl + "/clinicaldocuments");
        return {
            listClinicalDocuments: function () {

                return MedicalDocumentsListResource.query();
            }
        };
    }

    /**
     * The Clinical Documents Service
     *
     */
    angular.module("app.medicalDocumentsServices", ['ngResource', 'app.config'])
        .factory('MedicalDocumentsService', MedicalDocumentsService);
})();



