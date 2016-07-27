(function () {

    'use strict';

    angular
        .module("app.healthInformation")
        .controller('HealthInformationController', HealthInformationController);

    /* @ngInject */
    function HealthInformationController($rootScope, patientData) {
        var vm = this;
        getPatientDocument();

        function getPatientDocument() {
            if (angular.isDefined(patientData)) {
                var patientDocument = patientData.Documents;
                if (angular.isDefined(patientDocument) && patientDocument.length > 0) {
                    vm.documents = patientDocument;
                } else {
                    vm.noDocumentFound = true;
                }
            }
        }

        vm.expandAllAccordions = function () {
            vm.noPatientDataAlert = false;
            $rootScope.$broadcast('ExpandAccordions', {expand: true});
        };

        vm.collapseAllAccordions = function () {
            vm.noPatientDataAlert = false;
            $rootScope.$broadcast('CollapseAccordions', {collapse: true});
        };
    }
})();
