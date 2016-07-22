(function () {

    'use strict';

    angular
        .module("app.healthInformation")
        .controller('HealthInformationController', HealthInformationController);

    /* @ngInject */
    function HealthInformationController($rootScope, patientData) {
        var vm = this;

        vm.documents = getPatientDocument(patientData);

        vm.expandAllAccordions = function () {
            vm.noPatientDataAlert = false;
            $rootScope.$broadcast('ExpandAccordions', {expand: true});
        };

        vm.collapseAllAccordions = function () {
            vm.noPatientDataAlert = false;
            $rootScope.$broadcast('CollapseAccordions', {collapse: true});
        };

        function getPatientDocument(data) {
            if (angular.isDefined(data)) {
                var patientDocument = data.Documents;
                if (angular.isDefined(patientDocument) && patientDocument.length > 0) {
                    return patientDocument;
                } else {
                    vm.noDocumentFound = true;
                }
            }
        }
    }
})();
