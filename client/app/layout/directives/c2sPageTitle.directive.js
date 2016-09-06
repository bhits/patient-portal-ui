(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('c2sPageTitle', c2sPageTitle);

    /* @ngInject */
    function c2sPageTitle($rootScope, $timeout, brand) {
        var directive = {
            link: linkFunc
        };

        return directive;

        /* @ngInject */
        function linkFunc(scope, element) {
            var listener = function (event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'C2S | Login';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) {
                    title = brand.getBrandInitials() + ' | ' + toState.data.pageTitle;
                }
                $timeout(function () {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }

})();