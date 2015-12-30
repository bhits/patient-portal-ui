
(function () {

    'use strict';

    angular
        .module('app.consent')
            .directive('ppConsentTerm', ppConsentTerm);

            function ppConsentTerm() {

                var directive = {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/consent/directives/consentTerm.html',
                    bindToController: {
                        ngModel: '='
                    },
                    controllerAs: 'consentTermVm',
                    controller: ConsentTermController
                };

                return directive;

                function ConsentTermController(){
                    var vm = this;
                    vm.daterange = vm.ngModel;
                }
            }
})();