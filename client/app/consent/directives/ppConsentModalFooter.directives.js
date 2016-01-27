
(function () {

    'use strict';

    angular
        .module('app.consent')
            .directive('ppConsentModalFooter', consenModalFooter);

            function consenModalFooter() {

                var directive = {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/consent/directives/consentModalFooter.html',
                    scope: {},
                    bindToController: {
                        option: '=',
                        setoption:'&',
                        applytrymypolicy:'&',
                        deleteconsent:'&'
                    },
                    controllerAs: 'consentModalFooterVm',
                    controller: ConsentModalFooterController
                };

                return directive;

                function ConsentModalFooterController(){
                    var vm = this;

                }
            }
})();