(function () {
    'use strict';

    function MedicalDocumentsService($resource, ENVService, $window, $q, $timeout, $http) {
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

            uploadMedicalDocument: function (file,name,description,documentType,success, error) {
                var uploadUrl =ENVService.securedApis.pcmApiBaseUrl + "/clinicaldocuments";
                var fd = new FormData();
                fd.append('file', file);
                fd.append('name', name);
                fd.append('description', description);
                fd.append('documentType', documentType);
                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                    .success(function(){
                    })
                    .error(function(){
                    });
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



