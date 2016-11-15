/**
 * Created by Jiahao.Li on 3/22/2016.
 */

(function () {
    'use strict';

    angular
        .module("app.account")
        .controller('CreatePasswordController', CreatePasswordController);

    /* @ngInject */
    function CreatePasswordController(allowActivation, configService) {
        var vm = this;
        vm.allowActivation = allowActivation;
        vm.title = configService.getBrandName() + " Create Password";
    }
})();