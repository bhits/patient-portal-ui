(function () {
    'use strict';

    angular
        .module('app.core')
            .directive('ppContentWrapper', ppContentWrapper);

            function ppContentWrapper() {
                var directive  =  {
                    restrict: 'E',
                    transclude: true,
                    scope: {title: '@'},
                    templateUrl: 'app/core/directives/content-wrapper.html'
                };
                return directive;
            }
})();