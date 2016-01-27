
(function () {

    'use strict';

    angular
        .module('app.consent')
            .controller('ConsentTryMyPolicyController', ConsentTryMyPolicyController);

             /* @ngInject */
            function ConsentTryMyPolicyController(loadedData, $state){
                var vm = this;
                vm.tryMyPolicyResponse =loadedData;
            }
})();