/**
 * Created by jiahao.li on 12/11/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.medicalDocumentsDirectives', [])
            .directive('ppMedicalDocumentsUpload', ppMedicalDocumentsUpload)
            .directive("fileModel", fileModel)
            .directive("ppUploadedDocuments", ppUploadedDocuments);

            function ppMedicalDocumentsUpload() {
                return {
                    restrict: 'E',
                    replace: true,
                    templateUrl: 'app/medicalDocuments/tmpl/medicalDocumentsUpload.tpl.html',
                    scope: {},
                    controllerAs: 'MedicalDocumentsUploadVm',
                    bindToController: true,
                    controller: ['$state', 'MedicalDocumentsService', 'notificationService',
                        function ($state, MedicalDocumentsService, notificationService) {
                            var Vm = this;

                            var prepareMedicalDocument = function () {
                                var medicalDocument = {
                                    file: Vm.medicalFile,
                                    name: Vm.name,
                                    description: Vm.description,
                                    documentType: Vm.documentType
                                };
                                return medicalDocument;
                            };

                            Vm.uploadDocument = function () {
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

            function fileModel($parse) {
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
            }

            function ppUploadedDocuments() {
                return {
                    restrict: 'E',
                    replace: true,
                    templateUrl: 'app/medicalDocuments/tmpl/medicalDocumentsUploadedDocuments.tpl.html',
                    scope: {
                        medicaldocumentslist:'='
                    },
                    controllerAs: 'uploadedDocumentVm',
                    bindToController: true,
                    controller: ['$state', '$modal', 'MedicalDocumentsService', 'notificationService',
                        function ($state, $modal, MedicalDocumentsService, notificationService) {
                            var Vm = this;

                            function MedicalDocumentsModalDeleteController ($scope, $modalInstance, medicalDocument) {
                                $scope.id = medicalDocument.id;
                                $scope.medicalDocument = medicalDocument;

                                $scope.ok = function () {
                                    MedicalDocumentsService.deleteMedicalDocument($scope.id,
                                        function(data){
                                            $state.go($state.current, {}, {reload: true});
                                            notificationService.success('Success in deleting medical document');
                                        },
                                        function(data){
                                            notificationService.error('Error in deleting medical document');
                                        }
                                    );
                                    $modalInstance.close();
                                };
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            }

                            /**
                             * Opens the confirm delete modal
                             *
                             * @param size - The size of the modal
                             */
                            Vm.openDeleteMedicalDocumentModal = function (medicalDocument, size) {
                                var modalInstance = $modal.open({
                                    templateUrl: 'app/medicalDocuments/tmpl/medicalDocumentDeleteModal.tpl.html',
                                    size: size,
                                    resolve: {
                                        medicalDocument: function () {
                                            return medicalDocument;
                                        }
                                    },
                                    controller: MedicalDocumentsModalDeleteController
                                });
                            };

                            Vm.downloadFile = function (medicalDocument) {
                                MedicalDocumentsService.downloadMedicalDocument(medicalDocument.id)
                                    .then(function(){
                                        notificationService.success('Success in downloading medical document');
                                    }, function() {
                                        notificationService.error('Error in downloading medical document');
                                    });
                            };
                        }]
                };
            }
})();