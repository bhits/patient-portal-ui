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
                            var language = window.localStorage.lang || 'en';
                            if (language.substring(0,2) === 'es') {
                                notificationService.error('El acceso a la información medica del paciente no funciono, por favor inténtelo de nuevo...');
                            } else {
                                notificationService.error('Failed to get the patient health information, please try again later...');
                            }

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