(function () {

    'use strict';

        angular.module('app',
            [
                /* Shared modules*/
                'app.core',
                'templates-app',
                'templates-common',
                'app.security',

                /*
                 * Feature areas
                 */
                'app.home',
                'app.consent',
                'app.healthInformationModule',
                'app.providerModule',
                'app.layout'
            ])
            .constant("idleConfigParams", {"idle": 780, "timeout": 120, "keepalive": 240})
            .config(appConfig)
            .run(appRun)
            .controller('AppController', AppController);

            //var ngIdleParams = {"idle": 780, "timeout": 120, "keepalive": 240};

            /* @ngInject */
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

             /* @ngInject */
            function appRun($rootScope, $state, $anchorScroll) {
                $rootScope.$state = $state;
                $anchorScroll.yOffset = 135;
            }

            /* @ngInject */
            function AppController($scope , $rootScope , utilityService, notificationService, authenticationService, ENVService, idleConfigParams, $state,  $modal, $modalStack, Idle) {

                var appVm = this;
                appVm.oauth = ENVService.oauth;
                appVm.oauth.state = authenticationService.getState();

                $rootScope.$on('$stateChangeSuccess', function (event, data) {
                    $modalStack.dismissAll('cancel');
                });

                $rootScope.$on('oauth:login', function (event, token) {
                    if (authenticationService.isValidState(token.state)) {
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
                        templateUrl: 'app/warning-dialog.html',
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


})();