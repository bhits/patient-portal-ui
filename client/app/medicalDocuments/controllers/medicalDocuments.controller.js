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
                templateUrl: 'common/tmpl/content.tpl.html'
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
        var Vm = this;
        Vm.medicalDocumentsList = medicalDocumentsList;
        console.log(medicalDocumentsList);
    }

    MedicalDocumentsListController.resolve = {
        medicalDocumentsList: ['$q', 'MedicalDocumentsService', 'notificationService', function($q, MedicalDocumentsService, notificationService){
            function success(response){
                return response;
            }
            function error(response){
                notificationService.error('Failed to get the consent list, please try again later...');
                return response;
            }
            var deferred = $q.defer();
            var listMedicalDocumentsPromise = MedicalDocumentsService.listMedicalDocuments().$promise;
            listMedicalDocumentsPromise.then(function(onFulfilled){
                deferred.resolve(onFulfilled);
            }, function (onRejected) {
                deferred.reject(onRejected);
            });

            return deferred.promise;
        }]
    };
})();
