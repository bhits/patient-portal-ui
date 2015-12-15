'use strict';

(function () {
    /**
     * @name The app.consent module
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
                'app.core'
               ]);
})();