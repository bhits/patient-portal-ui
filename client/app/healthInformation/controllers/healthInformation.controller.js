
(function () {

    'use strict';

    angular
        .module("app.healthInformation")
            .controller('HealthInformationController', HealthInformationController);

            /* @ngInject */
            function HealthInformationController($rootScope, patientData, healthInformationService ){
                var vm = this;

                vm.documents = healthInformationService.getDocuments(patientData);

                vm.expandAllAccordions = function(){
                    vm.noPatientDataAlert = false;
                    $rootScope.$broadcast('ExpandAccordions', { expand:true });
                };

                vm.collapseAllAccordions = function(){
                    vm.noPatientDataAlert = false;
                    $rootScope.$broadcast('CollapseAccordions', { collapse:true });
                };
            }
})();
