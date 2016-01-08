
(function () {

    'use strict';

    angular
        .module("app.healthInformation")
            .controller('HealthInformationController', HealthInformationController);

            /* @ngInject */
            function HealthInformationController($rootScope, $scope, utilityService, patientData, healthInformationService ){
                var vm = this;

                $scope.showHealthInformationMenu = utilityService.getShowHealthInformationMenu();
                vm.documents =  patientData[0].Documents;
                
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
