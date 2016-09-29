(function () {

    'use strict';

    angular
        .module('app.consent')
        .controller("ConsentCreateEditController", ConsentCreateEditController);

    /* @ngInject */
    function ConsentCreateEditController(loadedData) {
        var vm = this;
        vm.providers = loadedData[0];
        vm.purposeOfUse = loadedData[1];
        vm.sensitivityPolicies = loadedData[2];
        vm.consent = loadedData.length === 4 ? loadedData[3] : null;
    }
})();