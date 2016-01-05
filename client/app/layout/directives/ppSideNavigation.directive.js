(function () {
    'use strict';

    angular
        .module('app.layout')
            .directive('ppSideNavigation', ppSideNavigation);

            /* @ngInject */
            function ppSideNavigation($timeout) {

                var directive = {
                    restrict: 'A',
                    link: linkFunc
                };
                return directive;

                /* @ngInject */
                function linkFunc (scope, element) {
                    $timeout(function () {
                        element.metisMenu();

                    });
                }
            }


})();