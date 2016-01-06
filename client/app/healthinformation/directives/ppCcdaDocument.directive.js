(function () {
    'use strict';

    angular
        .module('app.healthInformation')
            .directive('ppCcdaDocument', ppCcdaDocument);

            function ppCcdaDocument() {

                var directive = {
                    restrict: 'E',
                    scope: {
                        document: '='
                    },
                    bindToController: true,
                    templateUrl: "app/healthInformation/directives/ccdaDocument.html",
                    controllerAs: 'ccdaDocumentVm',
                    controller: CCDADocumentController
                };

                return directive;

                function CCDADocumentController(healthInformationService){
                    var vm = this;
                    vm.patient = healthInformationService.getSectionByName(vm.document, 'patient');
                    vm.author = healthInformationService.getSectionByName(vm.document, 'author');
                    vm.sections = healthInformationService.getSectionByName(vm.document, 'section');
                    vm.treatment = healthInformationService.getSectionByName(vm.document, 'treatment');
                }
            }
})();