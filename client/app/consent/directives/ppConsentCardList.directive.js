
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('ppConsentCardList', ppConsentCardList);

            function ppConsentCardList() {
                var directive = {
                    restrict: 'E',
                    scope: {
                        consentList: '='
                    },
                    bindToController: true,
                    templateUrl: 'app/consent/directives/consentCardList.tpl.html',
                    controller: ConsentCardListController,
                    controllerAs: 'consentCardListVm'
                };

                return directive;
            }

            /* @ngInject */
            function ConsentCardListController(consentService, notificationService, utilityService) {
                var Vm = this;
                var oldPage = Vm.consentList.currentPage;
                Vm.pagination = {
                    totalItems: Vm.consentList.totalItems,
                    currentPage: oldPage,
                    itemsPerPage: Vm.consentList.itemsPerPage,
                    maxSize: 10
                };
                Vm.loadPage = loadPage;
                Vm.hasConsents = hasConsents;

                function hasConsents() {
                    return utilityService.isNotEmpty(Vm.consentList.consentList);
                }

                function updatePagination(response) {
                    Vm.pagination.totalItems = response.totalItems;
                    Vm.pagination.currentPage = response.currentPage;
                    Vm.pagination.itemsPerPage = response.itemsPerPage;
                }

                function success(response) {
                    oldPage = response.currentPage;
                    updatePagination(response);
                    Vm.consentList = response;
                    utilityService.scrollTo('content_wrapper');
                }

                function error(response) {
                    notificationService.error('Failed to get the consent list, please try again later...');
                }

                function loadPage() {
                    var newPage = Vm.pagination.currentPage;
                    Vm.pagination.currentPage = oldPage;
                    consentService.listConsent(newPage, success, error);
                }
            }
})();