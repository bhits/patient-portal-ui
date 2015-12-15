
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
        HealthInformationVm.ccdheader =  HealthInformationService.getSectionByName(HealthInformationVm.healthinfotmation, 'CCDAHeader');
        HealthInformationVm.patientDemographics =  HealthInformationService.getSectionByName(HealthInformationVm.ccdheader, 'DemographicInformation');
        HealthInformationVm.allergies = HealthInformationService.getSectionCollectionByName(HealthInformationVm.healthinfotmation, 'AllergySection', 'Allergies');
        HealthInformationVm.results = HealthInformationService.getSectionCollectionByName(HealthInformationVm.healthinfotmation, 'ResultSection','Results' );
        //$scope.encounters = HealthInformationService.getSectionCollectionByName($scope.healthinfotmation, 'EncounterSection', 'Encounters');
        HealthInformationVm.encounters = [];
        HealthInformationVm.medications = HealthInformationService.getSectionCollectionByName(HealthInformationVm.healthinfotmation, 'MedicationSection', 'Medications');
        HealthInformationVm.problems = HealthInformationService.getSectionCollectionByName(HealthInformationVm.healthinfotmation, 'ProblemSection', 'Problems');
        //$scope.vitalsigns = HealthInformationService.getSectionCollectionByName($scope.healthinfotmation, 'VitalSignSection','VitalSigns');
        HealthInformationVm.vitalsigns = [];
        HealthInformationVm.procedures = HealthInformationService.getSectionCollectionByName(HealthInformationVm.healthinfotmation, 'ProcedureSection','Procedures');
        HealthInformationVm.planofcares = [];
        HealthInformationVm.familyhistories = [];
        HealthInformationVm.healthcareproviders = [];
        HealthInformationVm.socialhistories = [];
        HealthInformationVm.advanceddirectives = [];
        HealthInformationVm.functionalstatus = [];
        HealthInformationVm.supports = [];
        HealthInformationVm.payers = [];
        HealthInformationVm.immunizations = [];
        HealthInformationVm.medicalequipments = [];

        /**
         *
         * @param target
         */
        HealthInformationVm.handleScroll = function(target){
            var menuToggleFlags = HealthInformationService.calculateMenuToggleFlags(HealthInformationVm.healthinfotmation);
            utilityService.scrollTo(target);
        };

        if(utilityService.isDefinedAndNotNull($stateParams.scrollTo) && utilityService.isDefinedAndNotNull($stateParams.expand) ){
            HealthInformationVm.handleScroll($stateParams.scrollTo);

        }else{
            HealthInformationVm.noPatientDataAlert = false;
            console.log("Missing error parameter .");
        }


        /**
         *  Scroll to a specific position in the page when the ScrollTo event is fired.
         *
         *  @param {Object} event - The event object
         *  @param {Object} arg - Object containing the position to scroll to in the page
         */
        $scope.$on('ScrollTo', function(event, args) {
            HealthInformationVm.handleScroll(args.to);
        });

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

        /**
         * Hide /show sections with data or without data
         *
         */
        HealthInformationVm.toggleSectionWithoutData = function(){
            // Process CCDA to determine which sections does not contain data.
            var menuToggleFlags = HealthInformationService.calculateMenuToggleFlags(HealthInformationVm.healthinfotmation);
            menuToggleFlags.toggleMenu = HealthInformationVm.toggleMenu;
            $rootScope.$broadcast('ToggleMenuItemWithoutData', menuToggleFlags);
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
                templateUrl: 'app/layout/content.tpl.html'
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