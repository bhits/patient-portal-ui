/**
 * Created by Jiahao.Li on 3/22/2016.
 */

(function () {
    'use strict';

    angular
        .module("app.account")
            .controller('CreatePasswordController', CreatePasswordController);

    /* @ngInject */
    function CreatePasswordController(allowActivation, brand) {
        var vm = this;
        vm.allowActivation = allowActivation;
        vm.title = brand.getBrandName() + " Create Password";
    }
})();