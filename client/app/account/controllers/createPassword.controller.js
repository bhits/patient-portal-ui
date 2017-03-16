(function () {
    'use strict';

    angular
        .module("app.account")
        .controller('CreatePasswordController', CreatePasswordController);

    /* @ngInject */
    function CreatePasswordController(allowActivation, configService) {
        var vm = this;
        vm.allowActivation = allowActivation;
        vm.title = configService.getBrandName() + "_CREATE_PASSWORD";
    }
})();