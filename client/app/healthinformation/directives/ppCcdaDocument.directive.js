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
                    vm.patient = healthInformationService.getSectionByName(vm.document, 'targetPatient');
                    vm.authors = healthInformationService.getSectionByName(vm.document, 'authors');
                    vm.contactInfo = healthInformationService.getSectionByName(vm.patient, 'contactInfo');
                    vm.address = healthInformationService.getSectionByName(vm.contactInfo, 'address');
                    vm.sections = healthInformationService.getSectionByName(vm.document, 'sections');
                    vm.treatment = healthInformationService.getSectionByName(vm.document, 'treatment');
                }
            }
})();