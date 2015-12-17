(function () {

    'use strict';

    /**
     * The app config function
     *
     * @param $urlRouterProvider -
     * @param $httpProvider -
     * @param KeepaliveProvider -
     * @param IdleProvider -
     * @param idleConfigParams -
     */
    function appConfig($urlRouterProvider, $locationProvider, $httpProvider, KeepaliveProvider, IdleProvider, idleConfigParams) {

        // enable html5 mode
        $locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise("/fe/login");

        $httpProvider.interceptors.push('AuthInterceptorService');

        // Configure Idle settingss
        IdleProvider.idle(idleConfigParams.idle); // in seconds
        IdleProvider.timeout(idleConfigParams.timeout); // in seconds
        KeepaliveProvider.interval(idleConfigParams.keepalive); // in seconds
    }

    /**
     *  The app run function
     *
     * @param $rootScope - the root scope
     * @param AuthenticationService - the authentication service
     * @param $state - the state service
     * @param $anchorScroll - the anscroll service
     */
    function appRun($rootScope, AuthenticationService, $state, $anchorScroll) {
        $rootScope.$state = $state;
        $anchorScroll.yOffset = 135;
    }

    /**
     *  Paramters for the ngIdle service
     * @type {{idle: number, timeout: number, keepalive: number}}
     */
    var ngIdleParams = {"idle": 780, "timeout": 120, "keepalive": 240};

    /**
     * The root controller of the application
     *
     * @param $scope - the scope object
     * @param AuthenticationService - the authenticationservice
     * @param ENVService
     * @param $state - the state service
     * @param utilityService - the utility service
     * @param notificationService
     * @param $modal - the modal service for showing modal
     * @param $modalStack - the modal stack service to manage modal stack
     * @param Idle - ngOIdle service for auto logging out user if idle
     * @param idleConfigParams - the ngIdle configation parameters
     * @param $rootScope - the angularjs root scope
     *
     * @constructor
     */
    function AppController($scope, AuthenticationService, ENVService, $state, utilityService, notificationService, $modal, $modalStack, Idle, idleConfigParams, $rootScope) {

        var appVm = this;
        appVm.oauth = ENVService.oauth;
        appVm.oauth.state = AuthenticationService.getState();

        $rootScope.$on('$stateChangeSuccess', function (event, data) {
            $modalStack.dismissAll('cancel');
        });

        $rootScope.$on('oauth:login', function (event, token) {
            if (AuthenticationService.isValidState(token.state)) {
                Idle.watch();
                $state.go('fe.index.home');
            } else {
                notificationService.error('Invalid UAA token.');
                $rootScope.$broadcast('oauth:expired');
            }
        });

        $rootScope.$on('oauth:loggedOut', function (event) {
            handleLoggedOutAndExpiredSession(event);
        });

        $rootScope.$on('oauth:expired', function (event) {
            handleLoggedOutAndExpiredSession(event);
        });

        function handleLoggedOutAndExpiredSession(event) {
            Idle.unwatch();
            $state.go('fe.login');

            var toggle = false; // hide the health information menu
            utilityService.setShowHealthInformationMenu(toggle);
            appVm.healthInformationMenu = toggle;
        }

        appVm.currentDate = utilityService.getYear();

        appVm.closeModals = function closeModals() {
            if (appVm.warning) {
                appVm.warning.close();
                appVm.warning = null;
            }
        };

        function ModalInstanceCtrl($scope, $modalInstance) {
        }

        /**
         * the user appears to have gone idle
         */
        $scope.$on('IdleStart', function () {

            console.log("Idle Start...");

            appVm.closeModals();

            appVm.warning = $modal.open({
                templateUrl: 'common/tmpl/warning-dialog.tpl.html',
                controller: ModalInstanceCtrl
            });
        });

        /**
         * follows after the IdleStart event, but includes a countdown until the user is considered timed out
         * the countdown arg is the number of seconds remaining until then.
         * you can change the title or display a warning dialog from here.
         * you can let them resume their session by calling Idle.watch()
         */
        $scope.$on('IdleWarn', function (e, countdown) {
            //console.log("IdleWarn...");
        });
        /**
         * the user has timed out (meaning idleDuration + timeout has passed without any activity)
         * this is where you'd log them
         */
        $scope.$on('IdleTimeout', function () {

            console.log("IdleTimeout...");
            console.log("-------> Session expired at: " + new Date());
            appVm.closeModals();

            $rootScope.$broadcast('oauth:expired');
        });

        /**
         * the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
         */
        $scope.$on('IdleEnd', function () {
            //console.log("IdleEnd...");
            appVm.closeModals();
        });

        /**
         * do something to keep the user's session alive
         */
        $scope.$on('Keepalive', function () {

            console.log("Keepalive...");
            var today = new Date();
            var now = today.getTime();

            //console.log("Now: " + now + ", last activity: " + Idle.getlastActiveTime());
            var offset = now - Idle.getlastActiveTime();

            //console.log("Offset: " + offset + ", KeepAlive Time: " +(idleConfigParams.keepalive * 1000) );

            console.log("-------> Current Time:" + today.getHours() + " : " + today.getMinutes() + " : " + today.getSeconds());

            if (!Number.isNaN(offset) && (offset <= (idleConfigParams.keepalive * 1000))) {

                // Get Refresh token
                console.log("Refreshing token... ");

                ////Slide session
                Idle.slideSession();

                var dialogTime = (now + (idleConfigParams.idle * 1000));

                console.log("-------> Time dialog will show at: " + new Date(dialogTime));

                console.log("-------> Session will Expires at: " + new Date(now + (idleConfigParams.idle * 1000) + (idleConfigParams.timeout * 1000)));
            } else {
                console.log("The was no activity.");
            }
        });

        appVm.healthInformationMenu = false;

        appVm.showHealthInformationMenu = function () {
            appVm.healthInformationMenu = true;
            utilityService.setShowHealthInformationMenu(true);
        };

        appVm.scrollToAndExpand = function (target, expand) {
            $rootScope.$broadcast('ScrollTo', {to: target});
            $rootScope.$broadcast('ExpandAccordion', {expand: expand});
        };

        appVm.routeToHealthInformation = function () {
            if ($state.current.name !== "fe.patient.healthinformation") {
                $state.go('fe.patient.healthinformation', {scrollTo: 'none', expand: 'none'});
            }

        };

        appVm.togglebar = true;

        appVm.toggleSideBar = function () {
            appVm.togglebar = !appVm.togglebar;
        };

        $scope.$on('ToggleMenuItemWithoutData', function (event, args) {
            //Determines which sections to be shown or hidden
            appVm.hideSection = args.toggleMenu;
            appVm.toggleDemographics = args.demographics;
            appVm.toggleMedications = args.medications;
            appVm.toggleAlerts = args.alerts;
            appVm.toggleResults = args.results;
            appVm.toggleEncounters = args.encounters;
            appVm.toggleProblems = args.problems;
            appVm.toggleVitalSigns = args.vitalSigns;
            appVm.toggleProcedure = args.procedures;
            appVm.togglePlanOfCare = args.planofcare;
            appVm.toggleFamilyHistory = args.familyHistory;
            appVm.toggleHealthcareProviders = args.healthcareProviders;
            appVm.toggleSocialHistory = args.socialhistory;
            appVm.toggleAdvancedDirectives = args.advancedDirectives;
            appVm.toggleFunctionalStatus = args.functionalStatus;
            appVm.toggleSupport = args.support;
            appVm.togglePayers = args.payers;
            appVm.toggleImmunization = args.immunization;
            appVm.toggleMedicalEquipment = args.medicalEquipment;
            appVm.toggleHealthcareProviders = args.healthcareProviders;
        });
    }


    angular.module('app',
        [
            'app.homeModule',         // App modules start here
            'app.healthInformationModule',
            'app.accessModule',
            'app.providerModule',
            'app.consentModule',
            'app.medicalDocumentsModule',
            'app.directivesModule',    // Common modules start here
            'app.servicesModule',
            'app.authInterceptorModule',
            'app.authenticationModule',
            'app.filtersModule',
            'templates-app',          // Third party libraries start here
            'templates-common',
            'ui.router',
            'ngIdle',
            'ui.bootstrap',
            'ngAria',
            'angular-loading-bar',
            'ngSanitize',
            'oauth'
        ])
        .constant("idleConfigParams", ngIdleParams)
        .config(appConfig)
        .run(appRun)
        .controller('AppController', AppController)
        .filter('trustAsHTML', ['$sce', function($sce){
            return function(text) {
                return $sce.trustAsHtml(text);
            };
        }]);
})();