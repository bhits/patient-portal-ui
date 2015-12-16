(function () {
    'use strict';

    angular
        .module('app.layout')
            .directive('ppSideNavigation', ppSideNavigation);

            /* @ngInject */
            function ppSideNavigation($timeout) {
                return {
                    restrict: 'A',
                    link: function (scope, element) {
                        // Call the metsiMenu plugin and plug it to sidebar navigation
                        $timeout(function () {
                            element.metisMenu();

                        });
                    }
                };
            }
})();