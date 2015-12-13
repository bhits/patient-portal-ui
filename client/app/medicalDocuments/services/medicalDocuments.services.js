(function () {
    'use strict';

    function MedicalDocumentsService($resource, ENVService, $window, $q, $timeout) {
        var medicalDocumentsListResource = $resource(ENVService.securedApis.pcmApiBaseUrl + "/clinicaldocuments");
        var medicalDocumentsResource = $resource(ENVService.securedApis.pcmApiBaseUrl + "/clinicaldocuments/:id", {id: '@id'});
        return {
            listMedicalDocuments: function (success, error) {

                return medicalDocumentsListResource.query(success, error);
            },

            downloadMedicalDocument: function (id) {
                var deferred = $q.defer();

                $timeout(function () {
                    $window.location = ENVService.securedApis.pcmApiBaseUrl + "/clinicaldocuments/" + id;
                })
                    .then(function () {
                        deferred.resolve('success');
                    }, function () {
                        deferred.reject('error');
                    });
                return deferred.promise;

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



