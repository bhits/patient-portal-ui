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
            function medicalDocumentsService($resource, $window, $q, $timeout, $http, envService) {
                //var medicalDocumentsListResource = $resource(envService.securedApis.pcmApiBaseUrl + "/clinicaldocuments");
                var medicalDocumentsResource = $resource(envService.securedApis.pcmApiBaseUrl + "/clinicaldocuments/:id", {id: '@id'});

                var service = {};
                //service.listMedicalDocuments = listMedicalDocuments;
                service.downloadMedicalDocument = downloadMedicalDocument;
                service.deleteMedicalDocument = deleteMedicalDocument;
                service.uploadMedicalDocument = uploadMedicalDocument;

                return service;

                //function listMedicalDocuments(success, error) {
                //    return medicalDocumentsListResource.query(success, error);
                //}

                function downloadMedicalDocument(id) {
                    var deferred = $q.defer();

                    $timeout(function () {
                        $window.location = envService.securedApis.pcmApiBaseUrl + "/clinicaldocuments/" + id;
                    }, 1000)
                        .then(function () {
                            deferred.resolve('success');
                        }, function () {
                            deferred.reject('error');
                        });
                    return deferred.promise;
                }

                function deleteMedicalDocument(id, success, error) {
                    medicalDocumentsResource.delete({id: id}, success, error);
                }

                function uploadMedicalDocument(medicalDocument) {
                    var deferred = $q.defer();

                    var uploadUrl = envService.securedApis.pcmApiBaseUrl + "/clinicaldocuments";
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
            }
})();



