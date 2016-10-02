(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('c2sSideNavigation', c2sSideNavigation);

    /* @ngInject */
    function c2sSideNavigation($timeout) {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };
        return directive;

        /* @ngInject */
        function linkFunc(scope, element) {
            $timeout(function () {
                element.metisMenu();
            });
        }
    }
})();