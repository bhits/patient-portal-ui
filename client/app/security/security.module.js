
'use strict';

(function () {

    angular
        .module('app.security',
               [
                 'ui.router',
                 'ngIdle',
                 'app.config',
                 'ngStorage',
                 'app.servicesModule']);
})();