(function () {
    'use strict';

    angular
        .module('app.account')
        .directive('ppOauthLogout', ppOauthLogout);

    function ppOauthLogout() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/account/directives/oauthLogout.html',
            scope: {},
            bindToController: {},
            controller: OauthLogoutController,
            controllerAs: 'oauthLogoutVm'
        };

        return directive;
    }

    /* @ngInject */
    function OauthLogoutController(authenticationService) {
        var vm = this;
        vm.logout = logout;

        function logout() {
            authenticationService.logout();
        }
    }
})();