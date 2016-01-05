/**
 * Created by tomson.ngassa on 1/5/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.healthInformation')
            .config(healthInforamationConfig);

            /* @ngInject */
            function healthInforamationConfig($stateProvider){
                $stateProvider
                    .state('fe.patient', {
                        abstract: true,
                        url: '/patient',
                        templateUrl: 'app/layout/content.html'
                    })
                    .state('fe.patient.healthinformation', {
                        url: '/healthinformation',
                        params: { scrollTo : null, expand: null},
                        data: { pageTitle: 'Health Information' },
                        templateUrl: 'app/healthInformation/controllers/healthInformation.html',
                        controller: 'HealthInformationController',
                        controllerAs: 'HealthInformationVm',
                        resolve: {
                            /* @ngInject */
                            patientData: ['healthInformationService', 'utilityService',  function(healthInformationService, $q){

                                var deferred = $q.defer();

                                var healthInformationResource = healthInformationService.getHealthInformationResource();
                                var healthInformationData = healthInformationResource.get(
                                    {mrn: '2323'},
                                    function(response){ return response;},
                                    function(response){ return response ;});

                                $q.all([healthInformationData.$promise]).then(function(response) {
                                    deferred.resolve(response);
                                });
                                return deferred.promise;
                            }]
                        }
                    });
            }
})();