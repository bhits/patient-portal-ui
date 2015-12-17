'use strict';

(function () {


    angular
        .module('app.consent')
        .controller('ConsentListController', ConsentListController);

    /**
     * @ngInject
     */
    function ConsentListController(loadedData){
        var vm = this;
        vm.consentList = loadedData;
    }
})();