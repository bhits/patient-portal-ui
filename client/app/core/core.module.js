


(function () {
   'use strict';

    angular
        .module('app.core', [
            /*Angular modules*/
            'ngSanitize',
            'ngResource',
            'ngMessages',

            /*Cross-app modules*/

            /*3rd-party modules*/
            'ui.router',
            'ngIdle',
            'ui.bootstrap',
            'ngAria',
            'angular-loading-bar',
            'oauth',
            'checklist-model',
            'ngStorage',    //oauth module dependency
            'cgNotify'
        ]);
})();