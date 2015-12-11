'use strict';

(function () {
    /**
     * @memberOf app
     * @ngdoc module
     * @description The app.consent module
     *
     */
    angular
        .module('app.consent',
               ['ui.router',
                'ngResource',
                'app.config',
                'checklist-model',
                'app.providerService',
                'app.providerFiltersModule',
                'app.servicesModule'
               ]);
})();