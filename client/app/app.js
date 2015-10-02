'use strict';

angular.module('app',
            [
              'templates-app',          // Third party libraries start here
              'templates-common',
              'ui.router',
              'angular-loading-bar',
              'ngIdle',
              'ui.bootstrap',
              'ngAria',
              'app.homeModule',         // App modules start here
              'app.healthInformationModule',
              'app.accessModule',
              'app.directivesModule',    // Common modules start here
              'app.servicesModule',
              'app.interceptorModule',
              'app.authenticationModule',
              'app.providerModule'
            ])
/**
 *  idle + timeout
 *      Duration(in seconds) of session
 *  keepalive
 *      Regular interval(in seconds) for refreshing the token
 *  timeout
 *      The time(in seconds) the dialog with the count down will be shown
 */
.constant("idleConfigParams", {
        "idle" : 780,
        "timeout": 120,
        "keepalive":240
    })
.config(['$urlRouterProvider', '$httpProvider', 'KeepaliveProvider','IdleProvider','idleConfigParams', function ($urlRouterProvider, $httpProvider, KeepaliveProvider, IdleProvider, idleConfigParams) {
        
        $urlRouterProvider.otherwise("/login"); 
        
        $httpProvider.interceptors.push('AuthInterceptorService');

        // Configure Idle settingss
        IdleProvider.idle(idleConfigParams.idle); // in seconds
        IdleProvider.timeout(idleConfigParams.timeout); // in seconds
        KeepaliveProvider.interval(idleConfigParams.keepalive); // in seconds

        $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = "*" ;

}])

.run(['$rootScope', 'AuthenticationService','$state', '$anchorScroll', function ($rootScope, AuthenticationService, $state, $anchorScroll) {
    AuthenticationService.fillAuthData();
    $rootScope.$state = $state;
    $anchorScroll.yOffset = 135;

}])

.controller('AppController', ['$scope', 'AuthenticationService', '$state', 'utilityService', '$modal', 'Idle', 'localStorageService', 'idleConfigParams','$location', '$rootScope',
                    function ($scope, AuthenticationService, $state, utilityService, $modal, Idle, localStorageService, idleConfigParams, $location,  $rootScope) {

    $scope.logOut = function () {
        AuthenticationService.logOut();
        Idle.unwatch();
        $state.go('login');

        var toggle = false; // hide the health information menu
        utilityService.setShowHealthInformationMenu(toggle);
        $scope.showHealthInformationMenu = toggle;
    };

    $scope.authentication = AuthenticationService.authentication;

    //$scope.currentDate = utilityService.getYear();

    $scope.closeModals = function closeModals() {
        if ($scope.warning) {
            $scope.warning.close();
            $scope.warning = null;
        }
    };


    function ModalInstanceCtrl ($scope, $modalInstance) {
    }

    /**
     * the user appears to have gone idle
     */
    $scope.$on('IdleStart', function() {

        console.log("Idle Start...");

        $scope.closeModals();

        $scope.warning = $modal.open({
            templateUrl: 'app/tmpl/warning-dialog.tpl.html',
            controller: ModalInstanceCtrl
        });
    });

    /**
     * follows after the IdleStart event, but includes a countdown until the user is considered timed out
     * the countdown arg is the number of seconds remaining until then.
     * you can change the title or display a warning dialog from here.
     * you can let them resume their session by calling Idle.watch()
     */
    $scope.$on('IdleWarn', function(e, countdown) {
        //console.log("IdleWarn...");
    });
    /**
     * the user has timed out (meaning idleDuration + timeout has passed without any activity)
     * this is where you'd log them
     */
    $scope.$on('IdleTimeout', function() {

        console.log("IdleTimeout...");
        console.log("-------> Session expired at: " + new Date() );
        $scope.closeModals();

        //AuthenticationService.logOut();
        //Idle.unwatch();
        //$state.go('login');

        $scope.logOut();
    });

    /**
     * the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
     */
    $scope.$on('IdleEnd', function() {

        //console.log("IdleEnd...");

        $scope.closeModals();
    });

    /**
     * do something to keep the user's session alive
     */
    $scope.$on('Keepalive', function() {

        console.log("Keepalive...");
        var today = new Date();
        var now = today.getTime();

        //console.log("Now: " + now + ", last activity: " + Idle.getlastActiveTime());
        var offset = now - Idle.getlastActiveTime();

        //console.log("Offset: " + offset + ", KeepAlive Time: " +(idleConfigParams.keepalive * 1000) );

        console.log("-------> Current Time:" +  today.getHours() + " : " + today.getMinutes() + " : " + today.getSeconds());

        if( !Number.isNaN(offset) && (offset <= (idleConfigParams.keepalive * 1000))){

            // Get Refresh token
            console.log("Refreshing token... " );

            ////Slide session
            Idle.slideSession();

            var dialogTime = (now + (idleConfigParams.idle*1000));

            console.log("-------> Time dialog will show at: " + new Date(dialogTime) );

            console.log("-------> Session will Expires at: " + new Date(now + (idleConfigParams.idle*1000) + (idleConfigParams.timeout*1000)) );
        }else{
            console.log("The was no activity.");
        }

    });

    $scope.showHealthInformationMenu =  utilityService.getShowHealthInformationMenu();

    $scope.setShowHealthInformationMenu = function(value){
        $scope.showHealthInformationMenu = value;
        utilityService.setShowHealthInformationMenu(value);
    };

   $scope.scrollToAndExpand = function(target, expand){
       $rootScope.$broadcast('ScrollTo', { to: target });
       $rootScope.$broadcast('ExpandAccordion', { expand:expand });
   };

   $scope.routeToHealthInformation = function(){
       if($state.current.name !== "patient.healthinformation"){
           $state.go('patient.healthinformation',{scrollTo:'none',expand:'none' } );
       }

   };

    $scope.togglebar = true;

    $scope.toggleSideBar = function(){
        $scope.togglebar = ! $scope.togglebar;
    };


    $scope.$on('ToggleMenuItemWithoutData', function(event, args) {
        //Determines which sections to be shown or hidden
        $scope.hideSection =  args.toggleMenu;
        $scope.toggleDemographics = args.demographics;
        $scope.toggleMedications = args.medications;
        $scope.toggleAlerts = args.alerts;
        $scope.toggleResults = args.results;
        $scope.toggleEncounters = args.encounters;
        $scope.toggleProblems = args.problems;
        $scope.toggleVitalSigns = args.vitalSigns;
        $scope.toggleProcedure = args.procedures;
        $scope.togglePlanOfCare = args.planofcare;
        $scope.toggleFamilyHistory = args.familyHistory;
        $scope.toggleHealthcareProviders = args.healthcareProviders;
        $scope.toggleSocialHistory = args.socialhistory;
        $scope.toggleAdvancedDirectives = args.advancedDirectives;
        $scope.toggleFunctionalStatus = args.functionalStatus;
        $scope.toggleSupport = args.support;
        $scope.togglePayers = args.payers;
        $scope.toggleImmunization = args.immunization;
        $scope.toggleMedicalEquipment = args.medicalEquipment;
        $scope.toggleHealthcareProviders = args.healthcareProviders;
    });
}]);
