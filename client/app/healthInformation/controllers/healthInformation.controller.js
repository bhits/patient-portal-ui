(function () {
    'use strict';

    angular
        .module("app.healthInformation")
        .controller('HealthInformationController', HealthInformationController);

    /* @ngInject */
    function HealthInformationController($rootScope, patientData) {
        var vm = this;
        vm.expandAllAccordions = expandAllAccordions;
        vm.collapseAllAccordions = collapseAllAccordions;

        activate();

        function activate() {
            if (angular.isDefined(patientData)) {
                var patientDocument = patientData.Documents;
                if (angular.isDefined(patientDocument) && patientDocument.length > 0) {
                    vm.documents = patientDocument;
                } else {
                    vm.noDocumentFound = true;
                }
            }
        }

        function expandAllAccordions () {
            vm.noPatientDataAlert = false;
            $rootScope.$broadcast('ExpandAccordions', {expand: true});
        }

        function collapseAllAccordions() {
            vm.noPatientDataAlert = false;
            $rootScope.$broadcast('CollapseAccordions', {collapse: true});
        }
    }
})();
