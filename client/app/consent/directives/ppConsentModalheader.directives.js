
(function () {

    'use strict';

    angular
        .module('app.consent')
            .directive('ppConsentModalHeader', consenModalHeader);

            function consenModalHeader() {

                var directive = {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/consent/directives/consentModalHeader.html',
                    scope: {},
                    bindToController: {
                        option: '=',
                        cancel:'&'
                    },
                    controllerAs: 'consentModalHeaderVm',
                    controller: ConsentModalHeaderController
                };

                return directive;

                function ConsentModalHeaderController(){
                    var vm = this;
                }
            }
})();