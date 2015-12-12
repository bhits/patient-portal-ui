(function () {
    'use strict';

    function MedicalDocumentsService($resource, ENVService) {
        var medicalDocumentsListResource = $resource(ENVService.securedApis.pcmApiBaseUrl + "/clinicaldocuments");
        var medicalDocumentsResource = $resource(ENVService.securedApis.pcmApiBaseUrl + "/clinicaldocuments/:id",{id: '@id'});
        return {
            listMedicalDocuments: function (success, error) {

                return medicalDocumentsListResource.query(success, error);
            },

            deleteMedicalDocument: function (id, success, error) {
                medicalDocumentsResource.delete({id: id}, success, error);
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



