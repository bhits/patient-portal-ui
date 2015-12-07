
'use strict';

(function () {

    angular
        .module('app.consent')
            .config(ConsentConfig);

            /* @ngInject */
            function ConsentConfig($stateProvider) {
                $stateProvider
                    .state('fe.consent', {
                        abstract: true,
                        url: '/consent',
                        data: {pageTitle: 'Consent'},
                        templateUrl: 'common/tmpl/content.tpl.html'
                    })
                    .state('fe.consent.list', {
                        url: '/list',
                        data: {pageTitle: 'List Consents'},
                        templateUrl: 'app/consent/config/consent-list.tpl.html',
                        controller: 'ConsentListController',
                        controllerAs: 'ConsentListVm',
                        resolve: {
                            /* @ngInject */
                            consentList: function($q, ConsentService, notificationService){
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
                            }
                        }
                    })
                    .state('fe.consent.create', {
                        url: '/create',
                        data: {pageTitle: 'Create Consent'},
                        templateUrl: 'app/consent/config/consent-create.tpl.html',
                        params: {
                            consentId: ''
                        },
                        controller: 'CreateEditConsentController',
                        controllerAs: 'CreateEditConsentVm',
                        resolve: {
                            /* @ngInject */
                            loadedData: function (ConsentService, ProviderService, notificationService, $q, $stateParams) {
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
                            }
                        }

                    })
                    .state('fe.consent.revoke', {
                        url: '/revoke',
                        data: {pageTitle: 'Revoke Consent'},
                        templateUrl: 'app/consent/config/consent-revoke.tpl.html',
                        params: {
                            consent: {}
                        }
                    })
                    .state('fe.consent.sign', {
                        url: '/signConsent',
                        data: {pageTitle: 'Sign Consent'},
                        templateUrl: 'app/consent/config/consent-sign.tpl.html',
                        params: {
                            consentId: ''
                        },
                        controller: 'SignConsentController',
                        controllerAs: 'SignConsentVm',
                        resolve: {
                            /* @ngInject */
                            loadedData: function (ConsentService, notificationService, $q, $stateParams) {
                                var deferred = $q.defer();
                                var consentId= $stateParams.consentId;
                                var signConsentData = ConsentService.signConsent(consentId, onSignSuccess, onSignError);

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
                        templateUrl: 'app/consent/config/consent-sign-revoke.tpl.html',
                        params: {
                            consent: {}
                        },
                        controller: 'SignRevokeConsentController',
                        controllerAs: 'SignRevokeConsentVm',
                        resolve: {
                            /* @ngInject */
                            loadedData: function (ConsentService, notificationService, $q, $stateParams) {
                                var deferred = $q.defer();
                                var consentId= $stateParams.consent.id;
                                var signConsentData = ConsentService.revokeConsent(consentId, onSignSuccess, onSignError);

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
                    .state('fe.consent.trymypolicy', {
                        url: '/trymypolicy',
                        data: {pageTitle: 'Try My Policy'},
                        templateUrl: 'app/consent/tmpl/trymypolicy.tpl.html',
                        params: {
                            consentId: ''
                        },
                        controller: 'TryMyPolicyChooseDocController',
                        controllerAs: 'TryMyPolicyChooseDocVm'
                    });
            }
})();