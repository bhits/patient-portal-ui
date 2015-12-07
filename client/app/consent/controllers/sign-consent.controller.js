
'use strict';

(function () {

    angular
        .module('app.consent')
            .controller('SignConsentController', SignConsentController);

            /* @ngInject */
            function SignConsentController(loadedData, $state){
                var SignConsentVm = this;
                SignConsentVm.javascriptCode =loadedData;
                SignConsentVm.close = Close;

                function Close() {
                    $state.go('fe.consent.list');
                }
            }
})();