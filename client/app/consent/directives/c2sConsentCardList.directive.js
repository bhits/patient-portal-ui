(function () {
    'use strict';

    angular
        .module('app.consent')
        .directive('c2sConsentCardList', c2sConsentCardList);

    function c2sConsentCardList() {
        var directive = {
            restrict: 'E',
            scope: {},
            bindToController: {
                consentList: '='
            },
            templateUrl: 'app/consent/directives/consentCardList.html',
            controller: ConsentCardListController,
            controllerAs: 'consentCardListVm'
        };
        return directive;
    }

    /* @ngInject */
    function ConsentCardListController(consentService, notificationService, utilityService) {
        var vm = this;
        var oldPage = vm.consentList.currentPage;
        vm.pagination = {
            totalItems: vm.consentList.totalItems,
            currentPage: oldPage,
            itemsPerPage: vm.consentList.itemsPerPage,
            maxSize: 10
        };
        vm.loadPage = loadPage;
        vm.hasConsents = hasConsents;

        function hasConsents() {
            return utilityService.isNotEmpty(vm.consentList.consentList);
        }

        function updatePagination(response) {
            vm.pagination.totalItems = response.totalItems;
            vm.pagination.currentPage = response.currentPage;
            vm.pagination.itemsPerPage = response.itemsPerPage;
        }

        function success(response) {
            oldPage = response.currentPage;
            updatePagination(response);
            vm.consentList = response;
            utilityService.scrollTo('content_wrapper');
        }

        function error(response) {
            notificationService.error('Failed to get the consent list, please try again later...');
        }

        function loadPage() {
            var newPage = vm.pagination.currentPage;
            vm.pagination.currentPage = oldPage;
            consentService.listConsent(newPage, success, error);
        }
    }
})();