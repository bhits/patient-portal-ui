/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function () {

    'use strict';

    function CreateConsent() {
        return {
            restrict: 'AE',
            templateUrl: 'app/consent/tmpl/consent-create-edit.tpl.html',
            controllerAs: 'CreateConsentVm',
            bindToController: true,
            controller: ['ConsentService', function (ConsentService) {
                var CreateConsentVm = this;
                CreateConsentVm.authorize = "Authorize";
                CreateConsentVm.disclosure = "Disclosure";
            }]
        };
    }

    function SelectProvider($modal) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/tmpl/consent-select-provider.tpl.html',
            require: '?ngModel',
            scope: {
                modaltitle:"="
            },
            bindToController: true,
            controllerAs: 'SelectProviderVm',
            controller: ['$scope', 'ConsentService','$modal', function ($scope, ConsentService, $modal) {
                var SelectProviderVm = this;

                SelectProviderVm.fieldplaceholder = SelectProviderVm.modaltitle === 'Authorize' ? "The following individual or organization" : "To disclose my information to";

                function SelectProviderModalController ($scope, $modalInstance, notificationService, modalTitle) {
                    $scope.title = modalTitle;
                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }

                SelectProviderVm.openSelectProviderModal = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/tmpl/consent-select-provider-modal.tpl.html',

                        resolve: {
                            modalTitle: function () {
                                return SelectProviderVm.modaltitle;
                            }
                        },
                        controller: SelectProviderModalController
                    });
                };
            }],
        };
    }

    function MedicalInformation($modal) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/tmpl/consent-medical-information.tpl.html',
            require: '?ngModel',
            scope: {
                data:"="
            },
            bindToController: true,
            controllerAs: 'MedicalInformationVm',
            controller: ['$scope', 'ConsentService','$modal', function ($scope, ConsentService, $modal) {
                var MedicalInformationVm = this;

                function MedicalInformationModalController ($scope, $modalInstance) {
                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }

                MedicalInformationVm.openPrivacySettingsModal = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/tmpl/consent-medical-information-modal.tpl.html',

                        resolve: {
                            data: function () {
                                return MedicalInformationVm.data;
                            }
                        },
                        controller: MedicalInformationModalController
                    });
                };
            }],
        };
    }

    function PurposeOfUse() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/tmpl/consent-purpose-of-use.tpl.html',
            require: '?ngModel',
            bindToController: true,
            controllerAs: 'PurposeOfUseVm',
            controller: ['$scope', 'ConsentService','$modal', function ($scope, ConsentService, $modal) {
                var PurposeOfUseVm = this;

                function PurposeOfUseModalController ($scope, $modalInstance) {
                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }

                PurposeOfUseVm.openSelectPurposeModal = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/tmpl/consent-purpose-of-use-modal.tpl.html',

                        resolve: {
                            data: function () {
                                return PurposeOfUseVm.data;
                            }
                        },
                        controller: PurposeOfUseModalController
                    });
                };
            }],
        };
    }

    function ConsentTerm() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/tmpl/consent-term.tpl.html',
            require: '?ngModel',
            bindToController: true,
            controllerAs: 'ConsentTermVm',
            controller: ['$scope', function ($scope) {
                var ConsentTermVm = this;
            }]
        };
    }

    angular.module("app.consentDirectives", ['app.consentServices'])
        .directive('createConsent', CreateConsent)
        .directive('selectProvider', ['$modal', SelectProvider])
        .directive('medicalInformation', ['$modal', MedicalInformation])
        .directive('purposeOfUse', ['$modal', PurposeOfUse])
        .directive('consentTerm', ConsentTerm);
})();
