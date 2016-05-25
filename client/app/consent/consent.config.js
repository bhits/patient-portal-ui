
(function () {

    'use strict';

    angular
        .module('app.consent')
            .config(consentConfig);

            /* @ngInject */
            function consentConfig($stateProvider) {
                $stateProvider
                    .state('fe.consent', {
                        abstract: true,
                        url: '/consent',
                        data: {pageTitle: 'Consent'},
                        templateUrl: 'app/layout/content.html'
                    })
                    .state('fe.consent.list', {
                        url: '/list',
                        data: {pageTitle: 'List Consents'},
                        templateUrl: 'app/consent/controllers/consentList.html',
                        controller: 'ConsentListController',
                        controllerAs: 'consentListVm',
                        resolve: {
                            /* @ngInject */
                            loadedData: function($q, consentService, notificationService){
                                function success(response){
                                    return response;
                                }
                                function error(response){
                                    notificationService.error('Failed to get the consent list, please try again later...');
                                    return response;
                                }
                                var deferred = $q.defer();
                                var listConsentPromise = consentService.listConsent(1, success, error).$promise;
                                listConsentPromise.then(function(onFulfilled){
                                    deferred.resolve(onFulfilled);
                                }, function (onRejected) {
                                    deferred.reject(onRejected);
                                });

                                return deferred.promise;
                            }
                        }
                    })
                    .state('fe.consent.create', {
                        url: '/create',
                        data: {pageTitle: 'Create Consent'},
                        templateUrl: 'app/consent/controllers/consentCreateEdit.html',
                        params: {
                            consentId: ''
                        },
                        controller: 'ConsentCreateEditController',
                        controllerAs: 'consentCreateEditVm',
                        resolve: {
                            /* @ngInject */
                            loadedData: function ($q, $stateParams,consentService, providerService, notificationService ) {
                                // reset previous selections (if any)
                                consentService.resetSelectedNpi();
                                var deferred = $q.defer();
                                var providerResource = providerService.getProvidersResource();
                                var providersData = providerResource.query(
                                    function (response) {
                                        return response;
                                    },
                                    function (response) {
                                        notificationService.error("Error in getting the list of providers.");
                                        return response;
                                    });

                                var purposeOfUseResource = consentService.getPurposeOfUseResource();
                                var purposeOfUseData = purposeOfUseResource.query(
                                    function (response) {
                                        return response;
                                    },
                                    function (response) {
                                        notificationService.error("Error in getting Purpose of Use data.");
                                        return response;
                                    });

                                var sensitvityPolicyResource = consentService.getSensitvityPolicyResource();
                                var sensitvityPolicyData = sensitvityPolicyResource.query(
                                    function (response) {
                                        return response;
                                    },
                                    function (response) {
                                        notificationService.error("Error in getting sensitivity policy data.");
                                        return response;
                                    });
                                var promises = [providersData.$promise, purposeOfUseData.$promise, sensitvityPolicyData.$promise];

                                var consentData = null;
                                if(angular.isDefined($stateParams.consentId) && $stateParams.consentId.length > 0){
                                    var consentResource = consentService.getConsentResource();
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
                            }
                        }

                    })
                    .state('fe.consent.revoke', {
                        url: '/revoke',
                        data: {pageTitle: 'Revoke Consent'},
                        templateUrl: 'app/consent/controllers/consentRevoke.html',
                        params: {
                            consent: {}
                        }
                    })
                    .state('fe.consent.esignature', {
                        url: '/esignature',
                        params: {
                            consentId: ''
                        },
                        data: {pageTitle: 'Provide eSignature'},
                        templateUrl: 'app/consent/controllers/consentESignature.html',
                        controller: 'ConsentESignatureController',
                        controllerAs: 'consentESignatureVm',
                        resolve: {
                            /* @ngInject */
                            consentAttestation: function ($q, $stateParams, utilityService, consentService, notificationService) {
                                var deferred = $q.defer();
                                var consentId= $stateParams.consentId;
                                if(utilityService.isDefinedAndLenghtNotZero($stateParams.consentId)){
                                    var success = function(response){
                                        deferred.resolve(response);
                                    };

                                    var error = function(){
                                        notificationService.error('Failed to get consent attestation...');
                                        deferred.reject();
                                    };

                                    var consentAttestationData = consentService.getConsentAttestation(consentId, success, error);
                                    
                                    return deferred.promise;
                                }else {
                                    notificationService.error('Consent id not provided. Redirecting to consent list.');
                                    utilityService.redirectTo("fe/consent/list");

                                }
                            }
                        }
                    })
                    .state('fe.consent.sign', {
                        url: '/signConsent',
                        data: {pageTitle: 'Sign Consent'},
                        templateUrl: 'app/consent/controllers/consentSign.html',
                        params: {
                            consentId: ''
                        },
                        controller: 'ConsentSignController',
                        controllerAs: 'consentSignVm',
                        resolve: {
                            /* @ngInject */
                            loadedData: function ($q, $stateParams, consentService, notificationService) {
                                var deferred = $q.defer();
                                var consentId= $stateParams.consentId;
                                var signConsentData = consentService.signConsent(consentId, onSignSuccess, onSignError);

                                function onSignSuccess(response){
                                    deferred.resolve(response.javascriptCode);
                                }

                                function onSignError(){
                                    notificationService.error('Failed to sign the consent! Please try again later...');
                                    deferred.reject();
                                }
                                return deferred.promise;
                            }
                        }
                    })
                    .state('fe.consent.revokesign', {
                        url: '/signRevokeConsent',
                        data: {pageTitle: 'Sign Revoke Consent'},
                        templateUrl: 'app/consent/controllers/consentSignRevoke.html',
                        params: {
                            consent: {}
                        },
                        controller: 'ConsentSignRevokeController',
                        controllerAs: 'consentSignRevokeVm',
                        resolve: {
                            /* @ngInject */
                            loadedData: function ( $q, $stateParams, consentService, notificationService) {
                                var deferred = $q.defer();
                                var consentId= $stateParams.consent.id;
                                var signConsentData = consentService.revokeConsent(consentId, onSignSuccess, onSignError);

                                function onSignSuccess(response){

                                    deferred.resolve(response.javascriptCode);
                                }

                                function onSignError(){
                                    notificationService.error('Failed to sign the consent! Please try again later...');
                                    deferred.reject();
                                }
                                return deferred.promise;
                            }
                        }
                    });

            }
})();