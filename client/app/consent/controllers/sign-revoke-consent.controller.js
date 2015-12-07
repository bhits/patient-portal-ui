
'use strict';

(function () {

    angular
        .module('app.consent')
            .controller('SignRevokeConsentController', SignRevokeConsentController);

            /* @ngInject */
            function SignRevokeConsentController(loadedData, $state){
                var SignRevokeConsentVm = this;
                SignRevokeConsentVm.javascriptCode =loadedData;
                SignRevokeConsentVm.close = Close;

                function Close() {
                    $state.go('fe.consent.list');
                }
            }
})();