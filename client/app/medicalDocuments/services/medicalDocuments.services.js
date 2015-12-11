(function () {
    'use strict';

    function MedicalDocumentsService($resource, ENVService) {
        var MedicalDocumentsListResource = $resource(ENVService.securedApis.pcmApiBaseUrl + "/clinicaldocuments");
        return {
            listMedicalDocuments: function (success, error) {

                return MedicalDocumentsListResource.query();
            }
        };
    }

    /**
     * The Medical Documents Service
     *
     */
    angular.module("app.medicalDocumentsServices", ['ngResource', 'app.config'])
        .factory('MedicalDocumentsService', MedicalDocumentsService);
})();



