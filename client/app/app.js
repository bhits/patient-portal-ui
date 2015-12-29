(function () {

    'use strict';

        angular.module('app',
            [
                /* Shared modules*/
                'app.core',
                'templates-app',
                'app.security',

                /*
                 * Feature areas
                 */
                'app.home',
                'app.consent',
                'app.healthInformationModule',
                'app.provider',
                'app.layout',
                'app.medicalDocumentsModule'
            ])
            .constant("idleConfigParams", {"idle": 780, "timeout": 120, "keepalive": 240})
            .config(appConfig)
            .run(appRun)
            .controller('AppController', AppController);


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

                $rootScope.$on('$stateChangeSuccess',stateChangeSuccess);
                $rootScope.$on('oauth:login',oauthLogin);
                $rootScope.$on('oauth:loggedOut',oauthLoggedOut );
                $rootScope.$on('oauth:expired',oauthExpired);

                appVm.currentDate = utilityService.getYear();
                appVm.closeModals = closeModals;

                /**
                 * the user appears to have gone idle
                 */
                $scope.$on('IdleStart',idleStart);

                /**
                 * follows after the IdleStart event, but includes a countdown until the user is considered timed out
                 * the countdown arg is the number of seconds remaining until then.
                 * you can change the title or display a warning dialog from here.
                 * you can let them resume their session by calling Idle.watch()
                 */
                $scope.$on('IdleWarn', idleWarn );
                /**
                 * the user has timed out (meaning idleDuration + timeout has passed without any activity)
                 * this is where you'd log them
                 */
                $scope.$on('IdleTimeout', idleTimeout);
                /**
                 * the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
                 */
                $scope.$on('IdleEnd', idleEnd);
                /**
                 * do something to keep the user's session alive
                 */
                $scope.$on('Keepalive', keepalive);

                appVm.healthInformationMenu = false;
                appVm.showHealthInformationMenu = showHealthInformationMenu;
                appVm.scrollToAndExpand = scrollToAndExpand;
                appVm.routeToHealthInformation = routeToHealthInformation;
                appVm.togglebar = true;
                appVm.toggleSideBar = toggleSideBar;


                function stateChangeSuccess (event, data) {
                    $modalStack.dismissAll('cancel');
                }

                function oauthLogin(event, token) {
                    if (authenticationService.isValidState(token.state)) {
                        Idle.watch();
                        $state.go('fe.index.home');
                    } else {
                        notificationService.error('Invalid UAA token.');
                        $rootScope.$broadcast('oauth:expired');
                    }
                }

                function oauthLoggedOut(event) {
                    handleLoggedOutAndExpiredSession(event);
                }

                function oauthExpired (event) {
                    handleLoggedOutAndExpiredSession(event);
                }

                function handleLoggedOutAndExpiredSession(event) {
                    Idle.unwatch();
                    $state.go('fe.login');

                    var toggle = false; // hide the health information menu
                    utilityService.setShowHealthInformationMenu(toggle);
                    appVm.healthInformationMenu = toggle;
                }

                function closeModals() {
                    if (appVm.warning) {
                        appVm.warning.close();
                        appVm.warning = null;
                    }
                }

                function idleStart() {
                    appVm.closeModals();
                    appVm.warning = $modal.open({
                        templateUrl: 'app/warning-dialog.html'
                    });
                }

                function idleWarn (e, countdown) {
                    console.log("IdleWarn...");
                }

                function idleTimeout() {
                    console.log("IdleTimeout...");
                    console.log("-------> Session expired at: " + new Date());
                    appVm.closeModals();
                    $rootScope.$broadcast('oauth:expired');
                }

                function idleEnd() {
                    //console.log("IdleEnd...");
                    appVm.closeModals();
                }

                function keepalive() {

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
                }

                function showHealthInformationMenu() {
                    appVm.healthInformationMenu = true;
                    utilityService.setShowHealthInformationMenu(true);
                }

                function scrollToAndExpand(target, expand) {
                    $rootScope.$broadcast('ScrollTo', {to: target});
                    $rootScope.$broadcast('ExpandAccordion', {expand: expand});
                }

                function routeToHealthInformation () {
                    if ($state.current.name !== "fe.patient.healthinformation") {
                        $state.go('fe.patient.healthinformation', {scrollTo: 'none', expand: 'none'});
                    }
                }

                function toggleSideBar() {
                    appVm.togglebar = !appVm.togglebar;
                }
            }
})();