/**
 * Created by jiahao.li on 3/22/2016.
 */

(function () {
    'use strict';

    angular
        .module("app.account")
        .controller('AccessActivationController', AccessActivationController);

    /* @ngInject */
    function AccessActivationController(allowVerification) {
        var vm = this;
        vm.allowVerification = allowVerification;
    }
})();