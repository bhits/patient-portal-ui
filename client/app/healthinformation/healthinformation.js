'use strict';
/**
 * Responsible for the Health Information Menu
 */

angular.module("app.healthInformationModule", ['ui.router', 'app.servicesModule', 'app.healthInformationService', 'app.healthInformationDirectivesModule'])

.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
                .state('patient', {
                    abstract: true,
                    url: '/patient',
                    templateUrl: 'app/common/content.tpl.html'
                })
                .state('patient.healthinformation', {
                    url: '/healthinformation',
                    params: { scrollTo : null, expand: null},
                    data: { pageTitle: 'Health Information' },
                    templateUrl: 'app/healthinformation/healthinformation.tpl.html',
                    controller: 'HealthInformationController',
                    resolve: {
                        patientData: ['HealthInformationService', '$q', '$log','utilityService',  function(HealthInformationService, $q, $log, utilityService){

                                var deferred = $q.defer();

                                var healthInformationResource = HealthInformationService.getHealthInformationResource();
                                var healthInformationData = healthInformationResource.get(
                                    {emrn: '2323'},
                                    function(response){ return response;},
                                    function(response){ return response ;});

                                $q.all([healthInformationData.$promise]).then(function(response) {
                                    deferred.resolve(response);
                                });
                                return deferred.promise;
                        }]
                    }
                });
      }
])

.controller('HealthInformationController', ['$scope','$stateParams', '$state','utilityService', 'patientData','HealthInformationService', '$rootScope',
                                   function ($scope, $stateParams, $state, utilityService, patientData, HealthInformationService, $rootScope) {
    // Set the Health Information flag to true to make it visible.
    $scope.setShowHealthInformationMenu(true);

    $scope.toggleMenu = false;

    // Process the resolved patient CCDA data coming from the backend
    $scope.healthinfotmation = HealthInformationService.getHealthInformation(patientData[0]);
    $scope.ccdheader =  HealthInformationService.getSectionByName($scope.healthinfotmation, 'CCDAHeader');
    $scope.patientDemographics =  HealthInformationService.getSectionByName($scope.ccdheader, 'DemographicInformation');
    $scope.allergies = HealthInformationService.getSectionCollectionByName($scope.healthinfotmation, 'AllergySection', 'Allergies');
    $scope.results = HealthInformationService.getSectionCollectionByName($scope.healthinfotmation, 'ResultSection','Results' );
    //$scope.encounters = HealthInformationService.getSectionCollectionByName($scope.healthinfotmation, 'EncounterSection', 'Encounters');
    $scope.encounters = [];
    $scope.medications = HealthInformationService.getSectionCollectionByName($scope.healthinfotmation, 'MedicationSection', 'Medications');
    $scope.problems = HealthInformationService.getSectionCollectionByName($scope.healthinfotmation, 'ProblemSection', 'Problems');
    //$scope.vitalsigns = HealthInformationService.getSectionCollectionByName($scope.healthinfotmation, 'VitalSignSection','VitalSigns');
    $scope.vitalsigns = [];
    $scope.procedures = HealthInformationService.getSectionCollectionByName($scope.healthinfotmation, 'ProcedureSection','Procedures');
    $scope.planofcares = [];
    $scope.familyhistories = [];
    $scope.healthcareproviders = [];
    $scope.socialhistories = [];
    $scope.advanceddirectives = [];
    $scope.functionalstatus = [];
    $scope.supports = [];
    $scope.payers = [];
    $scope.immunizations = [];
    $scope.medicalequipments = [];

   $scope.handleScroll = function(target){
       var menuToggleFlags = HealthInformationService.calculateMenuToggleFlags($scope.healthinfotmation);
       utilityService.scrollTo(target);
   };

    if(utilityService.isDefinedAndNotNull($stateParams.scrollTo) && utilityService.isDefinedAndNotNull($stateParams.expand) ){
        $scope.handleScroll($stateParams.scrollTo);
       
    }else{
        $scope.noPatientDataAlert = false;
        console.log("Missing error parameter .");
    }


    /**
     *  Scroll to a specific position in the page when the ScrollTo event is fired.
     *
     *  @param {Object} event - The event object
     *  @param {Object} arg - Object containing the position to scroll to in the page
     */
    $scope.$on('ScrollTo', function(event, args) {
        $scope.handleScroll(args.to);
    });

    $scope.expandAllAccordions = function(){
        $scope.noPatientDataAlert = false;
        $rootScope.$broadcast('ExpandAccordions', { expand:true });
    };

    $scope.collapseAllAccordions = function(){
        $scope.noPatientDataAlert = false;
        $rootScope.$broadcast('CollapseAccordions', { collapse:true });
    };

    $scope.toggleSectionWithoutData = function(){
        // Process CCDA to determine which sections does not contain data.
        var menuToggleFlags = HealthInformationService.calculateMenuToggleFlags($scope.healthinfotmation);
        menuToggleFlags.toggleMenu = $scope.toggleMenu;
        $rootScope.$broadcast('ToggleMenuItemWithoutData', menuToggleFlags);
    };

}]);