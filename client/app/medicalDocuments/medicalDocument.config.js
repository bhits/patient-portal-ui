/**
 * Created by jiahao.li on 12/23/2015.
 */

(function () {
    'use strict';

    angular
        .module('app.medicalDocument')
            .config(medicalDocumentsConfig);

             /* @ngInject */
             function medicalDocumentsConfig($stateProvider) {
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
                         templateUrl: 'app/medicalDocuments/controllers/medicalDocumentInfo.html'
                     })
                     .state('fe.medicaldocuments.upload', {
                         url: '/upload',
                         data: {pageTitle: 'Upload Medical Documents'},
                         templateUrl: 'app/medicalDocuments/controllers/medicalDocument.html',
                         controller: 'MedicalDocumentsListController',
                         controllerAs: 'medicalDocumentsListVm',
                         resolve:  {
                             /* @ngInject */
                             medicalDocumentsList: ['$q', 'medicalDocumentsService', 'notificationService', function($q, medicalDocumentsService, notificationService){
                                 var deferred = $q.defer();
                                 var listMedicalDocumentsPromise = medicalDocumentsService.listMedicalDocuments().$promise;
                                 listMedicalDocumentsPromise.then(function(onFulfilled){
                                     deferred.resolve(onFulfilled);
                                 }, function (onRejected) {
                                     deferred.reject(onRejected);
                                     notificationService.error('Oops! The upload service is currently unavailable. Please try again later.');
                                 });
                                 return deferred.promise;
                             }]
                         }
                     });
             }
})();