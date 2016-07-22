/**
 * Created by tomson.ngassa on 1/5/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.healthInformation')
        .config(healthInforamationConfig);

    /* @ngInject */
    function healthInforamationConfig($stateProvider) {
        $stateProvider
            .state('fe.patient', {
                abstract: true,
                url: '/patient',
                templateUrl: 'app/layout/content.html'
            })
            .state('fe.patient.healthinformation', {
                url: '/healthinformation',
                params: {scrollTo: null, expand: null},
                data: {pageTitle: 'Health Information'},
                templateUrl: 'app/healthInformation/controllers/healthInformation.html',
                controller: 'HealthInformationController',
                controllerAs: 'healthInformationVm',
                resolve: {
                    /* @ngInject */
                    patientData: function ($q, healthInformationService, notificationService) {
                        var deferred = $q.defer();

                        var success = function (response) {
                            return response;
                        };

                        var error = function (data) {
                            notificationService.error('Failed to get the patient health information, please try again later...');
                            return data;
                        };

                        var healthInformationPromise = healthInformationService.getHealthInformation(success, error).$promise;
                        healthInformationPromise.then(function (response) {
                            deferred.resolve(response);
                        }, function (error) {
                            deferred.reject(error);
                        });

                        return deferred.promise;
                    }
                }
            });
    }
})();