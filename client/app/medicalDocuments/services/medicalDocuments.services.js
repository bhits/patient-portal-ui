(function () {
    'use strict';

    function MedicalDocumentsService($resource, $window, $q, $timeout, $http, ENVService) {
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
                }, 1000)
                    .then(function () {
                        deferred.resolve('success');
                    }, function () {
                        deferred.reject('error');
                    });
                return deferred.promise;
            },

            deleteMedicalDocument: function (id, success, error) {
                medicalDocumentsResource.delete({id: id}, success, error);
            },

            uploadMedicalDocument: function (medicalDocument) {
                var deferred = $q.defer();

                var uploadUrl = ENVService.securedApis.pcmApiBaseUrl + "/clinicaldocuments";
                var formData = new FormData();

                formData.append('file', medicalDocument.file);
                formData.append('name', medicalDocument.name);
                formData.append('description', medicalDocument.description);
                formData.append('documentType', medicalDocument.documentType);

                $http.post(uploadUrl, formData, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                    .then(function () {
                        deferred.resolve('success');
                    }, function () {
                        deferred.reject('error');
                    });
                return deferred.promise;
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



