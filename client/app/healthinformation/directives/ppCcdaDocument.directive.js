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
                    var Vm = this;
                    Vm.patient = healthInformationService.getSectionByName(Vm.document, 'patient');
                    Vm.author = healthInformationService.getSectionByName(Vm.document, 'author');
                    Vm.sections = healthInformationService.getSectionByName(Vm.document, 'section');
                    Vm.treatment = healthInformationService.getSectionByName(Vm.document, 'treatment');
                }
            }
})();