(function () {
    'use strict';

    angular.module("app.medicalDocumentsModule",
        [
            'app.medicalDocumentsServices',
            'app.medicalDocumentsDirectives'
        ])
        .config(MedicalDocumentsConfig)
        .controller("MedicalDocumentsListController",MedicalDocumentsListController);

    /**
     * Medical Documents config function
     * @param $stateProvider
     * @constructor
     */
    function MedicalDocumentsConfig($stateProvider) {
        $stateProvider
            .state('fe.medicaldocuments', {
                abstract: true,
                url: '/medicaldocuments',
                data: {pageTitle: 'Medical Documents'},
                templateUrl: 'common/tmpl/content.tpl.html'
            })
            .state('fe.medicaldocuments.info', {
                url: '/info',
                data: {pageTitle: 'Medical Documents Information'},
                templateUrl: 'app/medicalDocuments/tmpl/medicalDocumentsInfo.tpl.html'
            })
            .state('fe.medicaldocuments.upload', {
                url: '/upload',
                data: {pageTitle: 'Upload Medical Documents'},
                templateUrl: 'app/medicalDocuments/tmpl/medicalDocuments.tpl.html',
                controller: 'MedicalDocumentsListController',
                controllerAs: 'MedicalDocumentsListVm',
                resolve: MedicalDocumentsListController.resolve
            });
    }

    function MedicalDocumentsListController(medicalDocumentsList, $modal, MedicalDocumentsService, notificationService){
        var Vm = this;
        Vm.medicalDocumentsList = medicalDocumentsList;
        console.log(medicalDocumentsList);

        function MedicalDocumentsModalDeleteController ($scope, $modalInstance, medicalDocument, notificationService, $state) {
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

    }

    MedicalDocumentsListController.resolve = {
        medicalDocumentsList: ['$q', 'MedicalDocumentsService', 'notificationService', function($q, MedicalDocumentsService, notificationService){
            function success(response){
                return response;
            }
            function error(response){
                notificationService.error('Failed to get the consent list, please try again later...');
                return response;
            }
            var deferred = $q.defer();
            var listMedicalDocumentsPromise = MedicalDocumentsService.listMedicalDocuments().$promise;
            listMedicalDocumentsPromise.then(function(onFulfilled){
                deferred.resolve(onFulfilled);
            }, function (onRejected) {
                deferred.reject(onRejected);
            });

            return deferred.promise;
        }]
    };
})();
