(function () {
    'use strict';

    angular.module("app.clinicalDocumentsModule",
        [
            'app.clinicalDocumentsServices'
        ])
        .config(ClinicalDocumentsConfig)
        .controller("ClinicalDocumentsListController", ['clinicalDocumentsList', ClinicalDocumentsListController]);

    function ClinicalDocumentsConfig($stateProvider) {
        $stateProvider
            .state('fe.clinicaldocuments', {
                abstract: true,
                url: '/clinicaldocuments',
                data: {pageTitle: 'Clinical Documents'},
                templateUrl: 'common/tmpl/content.tpl.html'
            })
            .state('fe.clinicaldocuments.list', {
                url: '/list',
                data: {pageTitle: 'Clinical Documents List'},
                templateUrl: 'app/clinicaldocuments/tmpl/clinical-documents-list.tpl.html',
                controller: 'ClinicalDocumentsListController',
                controllerAs: 'ClinicalDocumentsListVm',
                resolve: ClinicalDocumentsListController.resolve
            });

    }

    function ClinicalDocumentsListController(clinicalDocumentsList) {
        var ClinicalDocumentsVm = this;
        ClinicalDocumentsVm.clinicalDocumentsList = clinicalDocumentsList;
        console.log(clinicalDocumentsList);
    }

    ClinicalDocumentsListController.resolve = {
    };
})();