(function () {
    'use strict';

    angular.module("app.medicalDocument")
        .controller("MedicalDocumentsListController",MedicalDocumentsListController);

    function MedicalDocumentsListController(medicalDocumentsList){
        var vm = this;
        vm.medicalDocumentsList = medicalDocumentsList;
    }
})();
