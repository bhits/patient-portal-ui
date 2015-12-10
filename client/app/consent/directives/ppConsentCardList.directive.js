
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
                    controller: ['consentService', 'notificationService', 'utilityService', ConsentCardListController],
                    controllerAs: 'ConsentCardListVm'
                };
                return directive;

                function ConsentCardListController(consentService, notificationService, utilityService) {
                    var ConsentCardListVm = this;
                    var oldPage = ConsentCardListVm.consentList.currentPage;
                    ConsentCardListVm.pagination = {
                        totalItems: ConsentCardListVm.consentList.totalItems,
                        currentPage: oldPage,
                        itemsPerPage: ConsentCardListVm.consentList.itemsPerPage,
                        maxSize: 10
                    };
                    ConsentCardListVm.loadPage = loadPage;
                    ConsentCardListVm.hasConsents = hasConsents;

                    function hasConsents() {
                        return utilityService.isNotEmpty(ConsentCardListVm.consentList.consentList);
                    }

                    function updatePagination(response) {
                        ConsentCardListVm.pagination.totalItems = response.totalItems;
                        ConsentCardListVm.pagination.currentPage = response.currentPage;
                        ConsentCardListVm.pagination.itemsPerPage = response.itemsPerPage;
                    }

                    function success(response) {
                        oldPage = response.currentPage;
                        updatePagination(response);
                        ConsentCardListVm.consentList = response;
                        utilityService.scrollTo('content_wrapper');
                    }

                    function error(response) {
                        notificationService.error('Failed to get the consent list, please try again later...');
                    }

                    function loadPage() {
                        var newPage = ConsentCardListVm.pagination.currentPage;
                        ConsentCardListVm.pagination.currentPage = oldPage;
                        consentService.listConsent(newPage, success, error);
                    }
                }
            }
})();