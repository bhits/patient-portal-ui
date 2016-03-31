'use strict';

(function () {

    angular
        .module("app.account")
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController(envService) {
        var vm = this;
        vm.version = envService.version;
    }
})();