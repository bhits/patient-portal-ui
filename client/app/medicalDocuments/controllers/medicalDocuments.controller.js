(function () {
    'use strict';

    angular.module("app.medicalDocumentsModule",
        [
            'app.medicalDocumentsServices',
            'app.medicalDocumentsDirectives'
        ])
        .config(MedicalDocumentsConfig)
        .controller("MedicalDocumentsListController",MedicalDocumentsListController);

    /**
     * Medical Documents config function
     * @param $stateProvider
     * @constructor
     */
    function MedicalDocumentsConfig($stateProvider) {
        $stateProvider
            .state('fe.medicaldocuments', {
                abstract: true,
                url: '/medicaldocuments',
                data: {pageTitle: 'Medical Documents'},
                templateUrl: 'app/layout/content.html'
            })
            .state('fe.medicaldocuments.info', {
                url: '/info',
                data: {pageTitle: 'Medical Documents Information'},
                templateUrl: 'app/medicalDocuments/tmpl/medicalDocumentsInfo.tpl.html'
            })
            .state('fe.medicaldocuments.upload', {
                url: '/upload',
                data: {pageTitle: 'Upload Medical Documents'},
                templateUrl: 'app/medicalDocuments/tmpl/medicalDocuments.tpl.html',
                controller: 'MedicalDocumentsListController',
                controllerAs: 'MedicalDocumentsListVm',
                resolve: MedicalDocumentsListController.resolve
            });
    }

    function MedicalDocumentsListController(medicalDocumentsList){
        var vm = this;
        vm.medicalDocumentsList = medicalDocumentsList;
    }

    MedicalDocumentsListController.resolve = {
        medicalDocumentsList: ['$q', 'MedicalDocumentsService', 'notificationService', function($q, MedicalDocumentsService, notificationService){
            var deferred = $q.defer();
            var listMedicalDocumentsPromise = MedicalDocumentsService.listMedicalDocuments().$promise;
            listMedicalDocumentsPromise.then(function(onFulfilled){
                deferred.resolve(onFulfilled);
            }, function (onRejected) {
                deferred.reject(onRejected);
                notificationService.error('Oops! The upload service is currently unavailable. Please try again later.');
            });
            return deferred.promise;
        }]
    };
})();
