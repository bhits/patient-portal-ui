(function () {
    'use strict';

    angular
        .module('app.consent')
        .directive('c2sConsentTerm', c2sConsentTerm);

    function c2sConsentTerm() {

        var directive = {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/directives/consentTerm.html',
            scope: {},
            bindToController: {
                ngModel: '='
            },
            controllerAs: 'consentTermVm',
            controller: ConsentTermController
        };
        return directive;

        function ConsentTermController() {
            var vm = this;
            vm.daterange = vm.ngModel;
        }
    }
})();