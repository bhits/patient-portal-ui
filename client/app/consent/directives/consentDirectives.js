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

    angular.module("app.consentDirectives", ['app.consentServices'])
        .directive('createConsent', CreateConsent)
        .directive('selectProvider', ['$modal', SelectProvider]);
})();
