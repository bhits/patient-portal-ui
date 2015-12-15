'use strict';

(function () {


    angular
        .module('app.consent')
        .controller('ConsentListController', ConsentListController);

    /**
     * @ngInject
     */
    function ConsentListController(loadedData){
        var Vm = this;
        Vm.consentList = loadedData;
    }
})();