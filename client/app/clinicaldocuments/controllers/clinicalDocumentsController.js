(function () {
    'use strict';

    /**
     * Clinical Documents config function
     * @param $stateProvider
     * @constructor
     */
    function ClinicalDocumentsConfig($stateProvider) {
        $stateProvider
            .state('fe.clinicaldocuments', {
                abstract: true,
                url: '/clinicaldocuments',
                data: {pageTitle: 'Clinical Documents'},
                templateUrl: 'common/tmpl/content.tpl.html'
            })
            .state('fe.clinicaldocuments.info', {
                url: '/info',
                data: {pageTitle: 'Clinical Documents Information'},
                templateUrl: 'app/clinicaldocuments/tmpl/clinical-documents-info.tpl.html',
                controller: 'ClinicalDocumentsController',
                controllerAs: 'ClinicalDocumentsVm'
            });
    }

    function ClinicalDocumentsController() {
        var ClinicalDocumentsVm = this;
    }

    angular.module("app.clinicalDocumentsModule",
        [])
        .config(ClinicalDocumentsConfig)
        .controller("ClinicalDocumentsController", ClinicalDocumentsController);
})();
