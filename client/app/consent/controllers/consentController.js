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
                templateUrl: 'app/consent/tmpl/consent-list.tpl.html',
                controller: 'ConsentListController',
                controllerAs: 'ConsentListVm',
                resolve: ConsentListController.resolve
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
            })
            .state('consent.sign', {
                url: '/signConsent',
                data: {pageTitle: 'Sign Consent'},
                templateUrl: 'app/consent/tmpl/consent-sign.tpl.html',
                params: {
                    consentId: ''
                },
                controller: 'SignConsentController',
                controllerAs: 'SignConsentVm',
                resolve: SignConsentController.resolve
            })
            .state('consent.revoke.sign', {
                url: '/signRevokeConsent',
                data: {pageTitle: 'Sign Revoke Consent'},
                templateUrl: 'app/consent/tmpl/consent-sign-revoke.tpl.html',
                params: {
                    consent: {}
                },
                controller: 'SignRevokeConsentController',
                controllerAs: 'SignRevokeConsentVm',
                resolve: SignRevokeConsentController.resolve
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
            // reset previous selections (if any)
            ConsentService.resetSelectedNpi();
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

    function ConsentListController(consentList){
        var ConsentListVm = this;
        ConsentListVm.consentList = consentList;
        console.log(consentList);
    }

    ConsentListController.resolve = {
        consentList: ['$q', 'ConsentService', 'notificationService', function($q, ConsentService, notificationService){
            function success(response){
                return response;
            }
            function error(response){
                notificationService.error('Failed to get the consent list, please try again later...');
                return response;
            }
            var deferred = $q.defer();
            var listConsentPromise = ConsentService.listConsent(1, success, error).$promise;
            listConsentPromise.then(function(onFulfilled){
                deferred.resolve(onFulfilled);
            }, function (onRejected) {
                deferred.reject(onRejected);
            });

            return deferred.promise;
        }]
    };

    function SignConsentController(loadedData){
        var SignConsentVm = this;
        SignConsentVm.javascriptCode =loadedData;

    }

    SignConsentController.resolve = {

        loadedData: ['ConsentService', 'notificationService', '$q','$stateParams', function (ConsentService, notificationService, $q, $stateParams) {
            var deferred = $q.defer();
            var consentId= $stateParams.consentId;
            console.log(consentId);
            var signConsentData = ConsentService.signConsent(consentId, onSignSuccess, onSignError);

            function onSignSuccess(response){
                deferred.resolve(response.javascriptCode);
            }

            function onSignError(){
                notificationService.error('Failed to sign the consent! Please try again later...');
                deferred.reject();
            }
            return deferred.promise;
        }]
    };

    function SignRevokeConsentController(loadedData){
        var SignRevokeConsentVm = this;
        SignRevokeConsentVm.javascriptCode =loadedData;
        console.log(loadedData);

    }

    SignRevokeConsentController.resolve = {

        loadedData: ['ConsentService', 'notificationService', '$q','$stateParams', function (ConsentService, notificationService, $q, $stateParams) {
            var deferred = $q.defer();
            var consentId= $stateParams.consent.id;
            console.log(consentId);
            var signConsentData = ConsentService.revokeConsent(consentId, onSignSuccess, onSignError);

            function onSignSuccess(response){
                console.log(response.javascriptCode);
                deferred.resolve(response.javascriptCode);
            }

            function onSignError(){
                notificationService.error('Failed to sign the consent! Please try again later...');
                deferred.reject();
            }
            return deferred.promise;
        }]
    };

    angular.module("app.consentModule",
        [
            'app.consentServices',
            'app.consentDirectives'
        ])
        .config(ConsentConfig)
        .controller("CreateEditConsentController", CreateEditConsentController)
        .controller("ConsentListController", ['consentList', ConsentListController])
        .controller("SignConsentController",['loadedData', SignConsentController])
        .controller("SignRevokeConsentController",['loadedData', SignRevokeConsentController])
    ;

})();