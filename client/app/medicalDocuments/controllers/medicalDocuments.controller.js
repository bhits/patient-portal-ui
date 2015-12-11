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
                controllerAs: 'MedicalDocumentsListVm'
            });
    }

    function MedicalDocumentsListController(){
        var MedicalDocumentsListVm = this;
    }
})();
