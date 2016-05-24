
(function () {

    'use strict';

    angular
        .module('app.consent')
            .controller('ConsentESignatureController', ConsentESignatureController);

             /* @ngInject */
            function ConsentESignatureController(consentAttestation){
                var vm = this;
                vm.attestation = consentAttestation;
            }
})();