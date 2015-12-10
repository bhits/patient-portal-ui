(function () {
    'use strict';

    angular.module("app.medicalDocumentsModule",
        [
            'app.medicalDocumentsServices'
        ])
        .config(MedicalDocumentsConfig)
        .controller("MedicalDocumentsController", MedicalDocumentsController)
        .controller("MedicalDocumentsUploadController",MedicalDocumentsUploadController);

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
                templateUrl: 'app/medicalDocuments/tmpl/medicalDocumentsInfo.tpl.html',
                controller: 'MedicalDocumentsController',
                controllerAs: 'MedicalDocumentsVm'
            })
            .state('fe.medicaldocuments.upload', {
                url: '/upload',
                data: {pageTitle: 'Upload Medical Documents'},
                templateUrl: 'app/medicalDocuments/tmpl/medicalDocuments.tpl.html',
                controller: 'MedicalDocumentsUploadController',
                controllerAs: 'MedicalDocumentsUploadVm'
            });
    }

    function MedicalDocumentsController() {
        var MedicalDocumentsVm = this;
    }

    function MedicalDocumentsUploadController(){
        var MedicalDocumentsUploadVm = this;
    }
})();
