(function () {
    'use strict';

    angular
        .module('app.layout')
            .directive('ppPageTitle', ppPageTitle);

            /**
             *  @ngInject
             */
            function ppPageTitle($rootScope, $timeout) {
                var directive =  {
                    link:linkFunc
                };

                return directive;

                /**
                 *  @ngInject
                 */
                function linkFunc(scope, element) {
                    var listener = function (event, toState, toParams, fromState, fromParams) {
                        // Default title - load on Dashboard 1
                        var title = 'TESTBED | Login';
                        // Create your own title pattern
                        if (toState.data && toState.data.pageTitle) {
                            title = 'TESTBED | ' + toState.data.pageTitle;
                        }
                        $timeout(function () {
                            element.text(title);
                        });
                    };
                    $rootScope.$on('$stateChangeStart', listener);
                }
            }
})();