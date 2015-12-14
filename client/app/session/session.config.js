/**
 * Created by tomson.ngassa on 12/14/2015.
 */

'use strict';

(function () {

    /**
     * @name Security config
     */
    angular
        .module('app.session')
        .config(SecurityConfig);

    /* @ngInject */
    function SecurityConfig($stateProvider){

        $stateProvider
            .state('fe.login', {
                url: "/login",
                data: {pageTitle: 'Login'},
                templateUrl: "app/session/sessionLogin.html",
                controllerAs: "loginVm",
                controller: 'LoginController'
            });
    }

})();