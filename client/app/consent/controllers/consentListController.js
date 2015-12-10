
'use strict';

(function () {

    angular
        .module('app.consent')
        .controller('ConsentListController', ConsentListController);

    /* @ngInject */
    function ConsentListController(consentList){
        var ConsentListVm = this;
        ConsentListVm.consentList = consentList;
    }
})();