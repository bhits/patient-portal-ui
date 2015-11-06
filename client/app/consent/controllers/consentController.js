/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function () {
    'use strict';

    function ConsentConfig($stateProvider) {
        $stateProvider
            .state('consent', {
                abstract: true,
                url: '/consent',
                data: {pageTitle: 'Consent'},
                templateUrl: 'common/tmpl/content.tpl.html'
            })
            .state('consent.list', {
                url: '/list',
                data: {pageTitle: 'List Consents'},
                templateUrl: 'app/consent/tmpl/consent-list.tpl.html'
            })

            .state('consent.create', {
                url: '/create',
                data: {pageTitle: 'Create Consent'},
                templateUrl: 'app/consent/tmpl/consent-create.tpl.html',
                params: {
                    consentId: ''
                },
                controller: 'CreateEditConsentController',
                controllerAs: 'CreateEditConsentVm',
                resolve: CreateEditConsentController.resolve

            })
            .state('consent.revoke', {
                url: '/revoke',
                data: {pageTitle: 'Revoke Consent'},
                templateUrl: 'app/consent/tmpl/consent-revoke.tpl.html',
                params: {
                    consent: {}
                }
            });
    }

    function CreateEditConsentController($scope, ConsentService, ProviderService, loadedData ){
        var CreateEditConsentVm = this;
        CreateEditConsentVm.providers = loadedData[0] ;
        CreateEditConsentVm.purposeOfUse = loadedData[1] ;
        CreateEditConsentVm.medicalSections= loadedData[2] ;
        CreateEditConsentVm.sensitivityPolicies = loadedData[3] ;
        CreateEditConsentVm.consent = loadedData.length === 5? loadedData[4]: null ;
    }


    CreateEditConsentController.resolve = {
        loadedData: ['ConsentService', 'ProviderService', 'notificationService', '$q','$stateParams', function (ConsentService, ProviderService, notificationService, $q, $stateParams) {
            var deferred = $q.defer();
            var providerResource = ProviderService.getProvidersResource();
            var providersData = providerResource.query(
                function (response) {
                    return response;
                },
                function (response) {
                    notificationService.error("Error in getting the list of providers.");
                    return response;
                });

            var purposeOfUseResource = ConsentService.getPurposeOfUseResource();
            var purposeOfUseData = purposeOfUseResource.query(
                function (response) {
                    return response;
                },
                function (response) {
                    notificationService.error("Error in getting Purpose of Use data.");
                    return response;
                });

            var medicalSectionResource = ConsentService.getMedicationSectionResource();
            var medicalSectionData = medicalSectionResource.query(
                function (response) {
                    return response;
                },
                function (response) {
                    notificationService.error("Error in getting medical Section data.");
                    return response;
                });

            var sensitvityPolicyResource = ConsentService.getSensitvityPolicyResource();
            var sensitvityPolicyData = sensitvityPolicyResource.query(
                function (response) {
                    return response;
                },
                function (response) {
                    notificationService.error("Error in getting sensitivity policy data.");
                    return response;
                });
            var promises = [providersData.$promise, purposeOfUseData.$promise, medicalSectionData.$promise, sensitvityPolicyData.$promise];

            var consentData = null;
            if(angular.isDefined($stateParams.consentId) && $stateParams.consentId.length > 0){
                var consentResource = ConsentService.getConsentResource();
                consentData = consentResource.get(
                    {id: $stateParams.consentId},
                    function (response) {
                        return response;
                    }, function (response) {
                        notificationService.error("Error in getting consent for edit.");
                        return response;
                    });
                promises.push(consentData.$promise);
            }

            $q.all( promises ).then(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }]
    };


    angular.module("app.consentModule",
        [
            'app.consentServices',
            'app.consentDirectives'
        ])
        .config(ConsentConfig)
        .controller("CreateEditConsentController", CreateEditConsentController);

})();