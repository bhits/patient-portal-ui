/**
 * Created by jiahao.li on 12/11/2015.
 */
(function () {
    'use strict';

    angular.module('app.medicalDocumentsDirectives', [])
        .directive('ppMedicalDocumentsUpload', ppMedicalDocumentsUpload)
        .directive("fileModel", ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function () {
                        scope.$apply(function () {
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }]);

    function ppMedicalDocumentsUpload() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/medicalDocuments/tmpl/medicalDocumentsUpload.tpl.html',
            scope: {},
            controllerAs: 'MedicalDocumentsUploadVm',
            bindToController: true,
            controller: ['$scope', '$state', 'MedicalDocumentsService', 'notificationService',
                function ($scope, $state, MedicalDocumentsService, notificationService) {
                    var MedicalDocumentsUploadVm = this;

                    //MedicalDocumentsUploadVm.file = "";
                    MedicalDocumentsUploadVm.name = "";
                    MedicalDocumentsUploadVm.description = "";
                    MedicalDocumentsUploadVm.documentType = "";

                    var prepareMedicalDocument = function () {

                        var medicalDocument = {
                            file: $scope.myFile,
                            name: MedicalDocumentsUploadVm.name,
                            description: MedicalDocumentsUploadVm.description,
                            documentType: MedicalDocumentsUploadVm.documentType
                        };

                        return medicalDocument;
                    };

                    MedicalDocumentsUploadVm.uploadDocument = function () {
                        var medicalDocument = prepareMedicalDocument();

                        MedicalDocumentsService.uploadMedicalDocument(medicalDocument)
                            .then(function () {
                                $state.go($state.current, {}, {reload: true});
                                notificationService.success('Success in uploading medical document');
                            }, function () {
                                notificationService.error('Error in uploading medical document');
                            }
                        );
                        console.log(medicalDocument);
                    };
                }]
        };
    }

})();