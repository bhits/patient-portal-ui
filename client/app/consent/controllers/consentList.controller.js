'use strict';

(function () {


    angular
        .module('app.consent')
        .controller('ConsentListController', ConsentListController);

    /**
     * @memberof app.consent
     * @ngdoc controller
     * @name ConsentListController
     * @param consentList {Abject} Resolved list of consent
     *
     * @ngInject
     */
    function ConsentListController(loadedData){
        var Vm = this;
        Vm.consentList = loadedData;
    }
})();