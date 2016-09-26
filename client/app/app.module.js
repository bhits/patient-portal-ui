(function () {
    'use strict';

        angular.module('app',
            [
                /* Shared modules*/
                'app.core',
                'templates-app',
                'app.security',
                'app.config',
 
                /*
                 * Feature areas
                 */
                'app.home',
                'app.consent',
                'app.healthInformation',
                'app.provider',
                'app.layout',
                'app.medicalDocument',
                'app.account',
                'app.activity',
                'app.brand'
            ]);
})();