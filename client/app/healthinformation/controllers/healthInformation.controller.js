
(function () {

    'use strict';

    angular
        .module("app.healthInformation")
            .controller('HealthInformationController', HealthInformationController);

            /* @ngInject */
            function HealthInformationController($rootScope, $scope, utilityService, patientData, healthInformationService ){
                var vm = this;

                $scope.showHealthInformationMenu = utilityService.getShowHealthInformationMenu();

                vm.toggleMenu = false;

                vm.healthinfotmation = healthInformationService.getHealthInformation(patientData[0]);
                vm.document =  healthInformationService.getSectionByName(vm.healthinfotmation, 'Document');
                vm.provider =  healthInformationService.getSectionByName(vm.document, 'author');
                vm.patient =  healthInformationService.getSectionByName(vm.document, 'patient');
                vm.sections =  healthInformationService.getSectionByName(vm.document, 'section');
                vm.ccdheader =  healthInformationService.getSectionByName(vm.healthinfotmation, 'CCDAHeader');
                vm.patientDemographics =  healthInformationService.getSectionByName(vm.ccdheader, 'DemographicInformation');

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
