(function () {
    'use strict';

    angular.module('app')
        .run(appRun);

    /* @ngInject */
    function appRun($rootScope, $state, $anchorScroll) {
        $rootScope.$state = $state;
        $anchorScroll.yOffset = 135;
    }
})();