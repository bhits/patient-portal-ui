(function () {
    'use strict';

        angular.module('app')
            .controller('AppController', AppController);

            /* @ngInject */
            function AppController($rootScope , utilityService, idleConfigParams, $state,  $modal, $modalStack, Idle, $scope, $translate, tmhDynamicLocale, paginationConfig) {

                var appVm = this;

                $rootScope.$on('$stateChangeSuccess',stateChangeSuccess);

                appVm.currentDate = utilityService.getYear();
                appVm.closeModals = closeModals;

                /**
                 * the user appears to have gone idle
                 */
                $rootScope.$on('IdleStart',idleStart);

                /**
                 * follows after the IdleStart event, but includes a countdown until the user is considered timed out
                 * the countdown arg is the number of seconds remaining until then.
                 *
                 * you can change the title or display a warning dialog from here.
                 * you can let them resume their session by calling Idle.watch()
                 */
                $rootScope.$on('IdleWarn', idleWarn );
                /**
                 * the user has timed out (meaning idleDuration + timeout has passed without any activity)
                 * this is where you'd log them
                 */
                $rootScope.$on('IdleTimeout', idleTimeout);
                /**
                 * the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
                 */
                $rootScope.$on('IdleEnd', idleEnd);
                /**
                 * do something to keep the user's session alive
                 */
                $rootScope.$on('Keepalive', keepalive);
                
                appVm.scrollToAndExpand = scrollToAndExpand;
                appVm.routeToHealthInformation = routeToHealthInformation;
                appVm.togglebar = true;
                appVm.toggleSideBar = toggleSideBar;


                function stateChangeSuccess (event, data) {
                    $modalStack.dismissAll('cancel');
                }

                //TODO: Completely implement the ngIdle module to log out user when idle.
                function handleLoggedOutAndExpiredSession(event) {
                    Idle.unwatch();
                    $state.go('fe.login');
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
                }

                function idleEnd() {
                    appVm.closeModals();
                }

                function keepalive() {

                    console.log("Keepalive...");
                    var today = new Date();
                    var now = today.getTime();

                    var offset = now - Idle.getlastActiveTime();

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

                // change language dynamically- add by Wentao
                var lang = window.localStorage.lang || 'en';
                setDynamicLanguage(lang);
                $scope.changeLanguage = function (language) {
                    $translate.use(language);
                    window.localStorage.lang = language;
                    setDynamicLanguage(language);
                    //window.location.reload();
                };

                function setDynamicLanguage (language) {
                    if (language === null || language.length < 2) {
                        tmhDynamicLocale.set("en");
                    } else {
                        tmhDynamicLocale.set (language.substring(0,2));
                        setTextofPagination (language.substring(0,2));
                    }
                }

                //translate the text of pagination of bootstrap
                function setTextofPagination(language) {
                    if (language === "zh") {
                        paginationConfig.firstText = "第一页";
                        paginationConfig.previousText = "上一页";
                        paginationConfig.lastText = "最后一页";
                        paginationConfig.nextText = "下一页";
                    } else if (language === "es"){
                        paginationConfig.firstText = "Inicio";
                        paginationConfig.previousText = "Anterior";
                        paginationConfig.lastText = "Fin";
                        paginationConfig.nextText = "Próximo";
                    } else if (language === "en"){
                        // note the different effects between REFRESH and choosing LANGUAGE
                        paginationConfig.firstText = "First";
                        paginationConfig.previousText = "Previous";
                        paginationConfig.lastText = "Last";
                        paginationConfig.nextText = "Next";
                    }
                }
            }

})();