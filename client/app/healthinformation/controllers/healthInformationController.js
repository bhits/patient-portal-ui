
(function () {

    'use strict';

    /**
     * The health Information Cotnroller
     *
     * @param $scope - The AngulularJS scope service.
     * @param $stateParams - The state parameter service.
     * @param $state - The state srevice.
     * @param utilityService - The application utility service.
     * @param patientData - The health information resolved data from the backend
     * @param HealthInformationService - The health information service.
     * @param $rootScope - The Angularjs root scope service.
     *
     */
    function HealthInformationController($scope, $stateParams, $state, utilityService, patientData, HealthInformationService, $rootScope){
        var HealthInformationVm = this;

        $scope.showHealthInformationMenu = utilityService.getShowHealthInformationMenu();

        HealthInformationVm.toggleMenu = false;

        // Process the resolved patient CCDA data coming from the backend

        HealthInformationVm.healthinfotmation = HealthInformationService.getHealthInformation(patientData[0]);
        HealthInformationVm.document =  HealthInformationService.getSectionByName(HealthInformationVm.healthinfotmation, 'Document');
        HealthInformationVm.provider =  HealthInformationService.getSectionByName(HealthInformationVm.document, 'author');
        HealthInformationVm.patient =  HealthInformationService.getSectionByName(HealthInformationVm.document, 'patient');
        HealthInformationVm.sections =  HealthInformationService.getSectionByName(HealthInformationVm.document, 'section');
        HealthInformationVm.ccdheader =  HealthInformationService.getSectionByName(HealthInformationVm.healthinfotmation, 'CCDAHeader');
        HealthInformationVm.patientDemographics =  HealthInformationService.getSectionByName(HealthInformationVm.ccdheader, 'DemographicInformation');

        /**
         *  Expands all the accordion
         */
        HealthInformationVm.expandAllAccordions = function(){
            HealthInformationVm.noPatientDataAlert = false;
            $rootScope.$broadcast('ExpandAccordions', { expand:true });
        };

        /**
         * Collapse all the accordion
         */
        HealthInformationVm.collapseAllAccordions = function(){
            HealthInformationVm.noPatientDataAlert = false;
            $rootScope.$broadcast('CollapseAccordions', { collapse:true });
        };
    }

    /**
     * Resovlve the patient health information from the PHR using the Health Information Service
     *
     */
    HealthInformationController.resolve = {
        patientData: ['HealthInformationService', '$q', '$log','utilityService',  function(HealthInformationService, $q, $log, utilityService){

            var deferred = $q.defer();

            var healthInformationResource = HealthInformationService.getHealthInformationResource();
            var healthInformationData = healthInformationResource.get(
                {mrn: '2323'},
                function(response){ return response;},
                function(response){ return response ;});

            $q.all([healthInformationData.$promise]).then(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }]
    };

    /**
     * The health Information Config function
     *
     * @param $stateProvider
     */
    function Config($stateProvider){
        $stateProvider
            .state('fe.patient', {
                abstract: true,
                url: '/patient',
                templateUrl: 'app/layout/content.html'
            })
            .state('fe.patient.healthinformation', {
                url: '/healthinformation',
                params: { scrollTo : null, expand: null},
                data: { pageTitle: 'Health Information' },
                templateUrl: 'app/healthinformation/tmpl/healthinformation.tpl.html',
                controller: 'HealthInformationController',
                controllerAs: 'HealthInformationVm',
                resolve: HealthInformationController.resolve
            });
    }


    /**
     *  The health Information mmodule
     */
    angular.module("app.healthInformationModule",
        [
            'app.core',
            'app.healthInformationService',
            'app.healthInformationDirectivesModule'
        ])
        .config(Config)
        .controller('HealthInformationController', HealthInformationController);
})();
