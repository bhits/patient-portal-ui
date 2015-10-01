/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';

angular.module("app.providerService", ['ngResource', 'app.config'])

    .factory('ProviderService', ['$resource', 'ENVService', function ($resource, ENVService) {

        return {
            /**
             * Gets the Provider Lookup Service resource object
             * @returns {Object} providerResource - The provider resource object
             */
            getProviders: function (plsQueryParameters, pageNumber) {
                var queryParameters = "";

                queryParameters = plsQueryParameters.usstate ? queryParameters + "/usstate/" + plsQueryParameters.usstate : queryParameters;
                queryParameters = plsQueryParameters.city ? queryParameters + "/city/" + plsQueryParameters.city : queryParameters;
                queryParameters = plsQueryParameters.zipcode ? queryParameters + "/zipcode/" + plsQueryParameters.zipcode : queryParameters;
                queryParameters = plsQueryParameters.gender ? queryParameters + "/gender/" + plsQueryParameters.gender : queryParameters;
                queryParameters = plsQueryParameters.specialty ? queryParameters + "/specialty/" + plsQueryParameters.specialty : queryParameters;
                queryParameters = plsQueryParameters.phone ? queryParameters + "/phone/" + plsQueryParameters.phone : queryParameters;
                queryParameters = plsQueryParameters.firstname ? queryParameters + "/firstname/" + plsQueryParameters.firstname : queryParameters;
                queryParameters = plsQueryParameters.lastname ? queryParameters + "/lastname/" + plsQueryParameters.lastname : queryParameters;
                queryParameters = plsQueryParameters.facilityname ? queryParameters + "/facilityname/" + plsQueryParameters.facilityname : queryParameters;

                var providerResource = $resource(ENVService.plsApiBaseUrl + "/pageNumber/:pageNumber" + queryParameters, {pageNumber: '@pageNumber'});
                return providerResource;
            },

            lookupProviders: function () {
                return null;
            }
        };
    }]);



